# vector_db
#
# This script is based on
# https://github.com/asg017/sqlite-vec/blob/main/examples/simple-python/demo.py
#
# Author: araobp@github.com
# Date: 2024/11/30

import struct
from typing import List
import sqlite3
import sqlite_vec


def serialize_f32(vector: List[float]) -> bytes:
    """serializes a list of floats into a compact "raw bytes" format"""
    return struct.pack("%sf" % len(vector), *vector)


class VectorDB:

    def __init__(self, db_path, collection, dimensions):
        self.db_path = db_path
        self.db = sqlite3.connect(db_path)
        self.db.enable_load_extension(True)
        sqlite_vec.load(self.db)
        self.db.enable_load_extension(False)

        sql = f"""CREATE VIRTUAL TABLE IF NOT EXISTS {collection} USING vec0(
              id integer primary key,
              embedding float[{dimensions}],
              chunk text 
              )
            """

        self.db.execute(sql)
        self.collection = collection

    def delete_all(self):
        with self.db:
            self.db.execute(f"DELETE FROM {self.collection}")

    def __len__(self):
        return self.db.execute(f"SELECT COUNT(rowid) from {self.collection}").fetchone()[0]

    def save(self, items):
        with self.db:
            self.db.executemany(
                f"INSERT INTO {self.collection}(id, chunk, embedding) VALUES (?, ?, ?)",
                [[item[0], item[1], serialize_f32(item[2])] for item in items],
            )

    def search(self, query, k=10):
        rows = self.db.execute(
            f"SELECT id, chunk, distance FROM {self.collection} WHERE embedding MATCH ? AND k = {k} ORDER BY distance",
            [serialize_f32(query)],
        ).fetchall()
        return rows

