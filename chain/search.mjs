import * as sqliteVec from "sqlite-vec";
import Database from "better-sqlite3";

import { embeddings } from "./embeddings.mjs";

const EMBEDDINGS_DB_PATH = '../database/embeddings.db';
const CHUNKS_DB_PATH = '../database/documents.db';

const embeddings_db = new Database(EMBEDDINGS_DB_PATH);
sqliteVec.load(embeddings_db);

const chunks_db = new Database(CHUNKS_DB_PATH);

const { sqlite_version, vec_version } = embeddings_db
  .prepare(
    "select sqlite_version() as sqlite_version, vec_version() as vec_version;",
  )
  .get();

// console.log(`sqlite_version=${sqlite_version}, vec_version=${vec_version}`);

const search = (collection, vector, k) => {
    const rows = embeddings_db
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

    const chunks = chunks_db
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

    return data;
}

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
    const vector = embeddings('rich maritime history');
    vector.then( v => {
        const rows = search('hansaplatz', v, 3);
        console.log(rows);
    });
}
