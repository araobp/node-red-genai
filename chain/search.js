import * as sqliteVec from "sqlite-vec";
import Database from "better-sqlite3";
import embeddings from "./embeddings.js";

class VectorDB {
    
    constructor(embeddings_db_path, chunks_db_path) {
        this.embeddings_db = new Database(embeddings_db_path);
        sqliteVec.load(this.embeddings_db);
        
        this.chunks_db = new Database(chunks_db_path);
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
        return await embeddings(text);
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

        // console.log(rows);
        const ids = rows.map(v => v.rowid);

        const chunks = this.chunks_db
        .prepare(
            `
            SELECT id, chunk FROM chunks 
            WHERE collection = '${collection}'
            AND id in (${ids.map(() => '?').join(',')})
            `
        ).all(ids);

        //console.log(`${ids.map(() => '?').join(',')}`);
        //console.log(ids);

        // console.log(chunks);

        const chunks_ = {};
        chunks.forEach(v => {
            chunks_[v.id] = v.chunk;
        });
        
        const data = ids.map(id => chunks_[id]);

        return output_as_list ? data : data.join('\n\n');
    }

}


import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
    
    const EMBEDDINGS_DB_PATH = '../database/embeddings.db';
    const CHUNKS_DB_PATH = '../database/documents.db';
    
    const vectorDB = new VectorDB(EMBEDDINGS_DB_PATH, CHUNKS_DB_PATH);
    console.log(vectorDB.info());
    
    const ref = await vectorDB.search('hansaplatz', 'rich maritime history', 3);
    console.log(ref);
}
