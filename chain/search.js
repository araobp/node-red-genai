const sqliteVec = require('sqlite-vec');
const Database = require('better-sqlite3');

const EMBEDDINGS_MODEL = "text-embedding-3-small";
const API_KEY = process.env['OPENAI_API_KEY'];

const HEADERS = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
}

const EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings";

const embeddings = async (text="", model=EMBEDDINGS_MODEL) => {
    
    const body = {
        input: text,
        model: model 
    }

    const request = {
        headers: HEADERS,
        body: JSON.stringify(body),
        method: 'POST',        
    }
    
    const response = await fetch(EMBEDDINGS_URL, request);
    const r = await response.json();

    return r.data[0]?.embedding;
}

class Search {
    
    constructor(
        db_path,
        embeddings_model=EMBEDDINGS_MODEL
        ) {
        this.db = new Database(db_path);
        sqliteVec.load(this.db);
        
        this.embeddings_model = embeddings_model;
    }
    
    info() {
        const { sqlite_version, vec_version } = this.db
        .prepare(
            "select sqlite_version() as sqlite_version, vec_version() as vec_version;",
        )
        .get();
        
        return `sqlite_version=${sqlite_version}, vec_version=${vec_version}`;
    }
    
    async get_vector(text) {
        return await embeddings(text, this.embeddings_model);
    }

    async search(collection, text, k, output_as_list=false) {
        
        var records;
        
        if (this.embeddings_model !== "sql-select") {
            const vector = await this.get_vector(text);

            const sql =
            `
            SELECT chunk FROM ${collection}
            WHERE embedding MATCH ?
            ORDER BY distance
            LIMIT ${k}
            `;
            
            records = this.db.prepare(sql).all(new Float32Array(vector)); 
        } else {
            const sql =
            `
            SELECT chunk FROM ${collection}
            WHERE chunk LIKE '%${text}%'
            LIMIT ${k}
            `;
            
            records = this.db.prepare(sql).all();
        }
                
        const data = records.map(v => v.chunk);
        return output_as_list ? data : data.join('\n\n');
    }

}


module.exports = function(RED) {
    function SearchNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.search = new Search(
            config.db_path,
            config.embeddings_model
        )
        this.collection = config.collection;
        this.k = config.k;
        
        node.on('input', async msg => {
            var query;
            var collection;
            if (typeof msg.payload === Object) {
                query = msg.palyload.user_message;
                collection = msg.payload.collection ?? this.collection;
            } else {
                query = msg.payload;
            }
            this.status({fill: "blue", shape: "dot", text: "in progress..."});
            const ref = await this.search.search(this.collection, query, this.k);
            this.status({});
            msg.payload = {};
            msg.payload.query = query;
            msg.payload.ref = ref;
            node.send(msg);
        });
    }
    RED.nodes.registerType("search", SearchNode);
}


if (require.main === module) {
    
    const VECTOR_DB_PATH = '../database/embeddings.db';
    
    const search = new Search(VECTOR_DB_PATH);
    console.log(search.info());
    
    search.search('hansaplatz', 'rich maritime history', 3, true)
    .then(ref => console.log(ref));
}
