# Embeddings calcuration for the chunks
# Date: 2024/10/06, 2024/11/25, 2024/11/30
# Author: https://github.com/araobp

import sys
sys.path.append("./search")

import sqlite3
import embeddings_openai
import vector_db

CHUNKS_DB_PATH = "../database/chunks.db"
EMBEDDINGS_DB_PATH = "../database/embeddings_openai.db"

# Read all the chunks
with sqlite3.connect(CHUNKS_DB_PATH) as conn:
    cur = conn.cursor()
    records = cur.execute("SELECT id, collection, chunk FROM chunks").fetchall()

data = {}

for r in records:
    collection = r[1]
    if collection not in data:
        data[collection] = []
    data[collection].append([r[0], r[2]])

N = 10  # Batch size for embeddings calculation

records = {} 

# Calculate embeddings
for collection in data.keys():
    print(f"Collection: {collection}")
    items = data[collection]
    for i in range(0, len(items), N):
        ids, chunks = zip(*items[i:i+N])
        vectors = embeddings_openai.get_embedding(chunks)
        if collection not in vectors:
            records[collection] = []
        records[collection].extend(zip(ids, chunks, vectors))

# Save the embeddings in a vector database
print("Saving the data in the database...")
for collection, items in records.items():
    col_db = vector_db.VectorDB(EMBEDDINGS_DB_PATH, collection, embeddings_openai.DIMENSION)
    col_db.delete_all()
    col_db.save(items)
