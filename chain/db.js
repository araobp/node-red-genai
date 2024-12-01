const sqliteVec = require('sqlite-vec');
const Database = require('better-sqlite3');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env['GEMINI_API_KEY'];
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

function textToRequest(text) {
  return { content: { role: "user", parts: [{ text }] } };
}

const embeddings = async (text="") => {
    const result = await model.embedContent(text);
    return result.embedding.values;
}
    
class Search {
    
    constructor(
        db_path,
        sql_select
        ) {
        this.db = new Database(db_path);
        sqliteVec.load(this.db);

        this.sql_select = sql_select;
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
        return await embeddings(text);
    }

    async search(collection, text, k, output_as_list=false) {
        
        var records;

        if (this.sql_select === false) {
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
    function DbNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.search = new Search(
            config.db_path,
            config.sql_select
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
    RED.nodes.registerType("db", DbNode);
}


if (require.main === module) {
    
    const VECTOR_DB_PATH = '../database/embeddings_gemini.db';
    
    const search = new Search(VECTOR_DB_PATH);
    console.log(search.info());
    
    search.search('hansaplatz', 'rich maritime history', 3, false)
    .then(ref => console.log(ref));
}
