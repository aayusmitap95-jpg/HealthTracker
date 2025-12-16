import sqlite3
import os
from datetime import datetime

# Absolute path to DB file to avoid duplicates
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "health_tracker.db")

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row  # return rows as dict-like objects
    return conn

def init_database():
    conn = get_connection()

    # Users table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER,
            gender TEXT,
            height REAL,
            weight REAL,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    conn.commit()
    conn.close()
    print("✓ Health Tracker Database initialized")


   