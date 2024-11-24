const MODEL = "text-embedding-3-small";
const API_KEY = process.env['OPENAI_API_KEY'];

const HEADERS = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
}

const URL = "https://api.openai.com/v1/embeddings";

export default async function (text = "") {
    
    const body = {
        input: text,
        model: MODEL
    }

    const request = {
        headers: HEADERS,
        body: JSON.stringify(body),
        method: 'POST',        
    }
    
    const response = await fetch(URL, request);
    const r = await response.json();

    return r.data[0]?.embedding;
}

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
    const vector = embeddings('Hey OpenAI!');
    vector.then( v => { console.log(v);});
}
