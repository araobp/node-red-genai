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
        embeddings_db_path,
        chunks_db_path,
        embeddings_model=EMBEDDINGS_MODEL
        ) {
            
        this.embeddings_db = new Database(embeddings_db_path);
        sqliteVec.load(this.embeddings_db);
        
        this.chunks_db = new Database(chunks_db_path);
        
        this.embeddings_model = embeddings_model;
    }
    
    info() {
        const { sqlite_version, vec_version } = this.embeddings_db
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
        
        const vector = await this.get_vector(text);
        
        const rows = this.embeddings_db
        .prepare(
        `
        SELECT
        rowid,
        distance
        FROM ${collection}
        WHERE embedding MATCH ?
        ORDER BY distance
        LIMIT ${k}
        `,
        )
        .all(new Float32Array(vector));

        const ids = rows.map(v => v.rowid);

        const chunks = this.chunks_db
        .prepare(
            `
            SELECT id, chunk FROM chunks 
            WHERE collection = '${collection}'
            AND id in (${ids.map(() => '?').join(',')})
            `
        ).all(ids);

        const chunks_ = {};
        chunks.forEach(v => {
            chunks_[v.id] = v.chunk;
        });
        
        const data = ids.map(id => chunks_[id]);

        return output_as_list ? data : data.join('\n\n');
    }

}


module.exports = function(RED) {
    function SearchNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.search = new Search(
            config.embeddings_db_path,
            config.chunks_db_path,
            config.embeddings_model
        )
        this.collection = config.collection;
        this.k = config.k;
        
        node.on('input', async msg => {
            const query = msg.payload;
            this.status({fill: "orange", shape: "dot", text: "in progress..."});
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
    
    const EMBEDDINGS_DB_PATH = '../database/embeddings.db';
    const CHUNKS_DB_PATH = '../database/chunks.db';
    
    const search = new Search(EMBEDDINGS_DB_PATH, CHUNKS_DB_PATH);
    console.log(search.info());
    
    search.search('hansaplatz', 'rich maritime history', 3)
    .then(ref => console.log(ref));
}
