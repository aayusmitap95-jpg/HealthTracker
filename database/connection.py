# Opens a connection to SQLite and returns it for DB operations

import sqlite3

DB_FILE = "health_tracker.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS user_inputs (
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
    conn.execute("""
CREATE TABLE IF NOT EXISTS user_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    steps INTEGER,
    water_intake REAL,
    calories_burned REAL,
    created_at TEXT,
    updated_at TEXT
)
""")
    conn.execute("""
    CREATE TABLE IF NOT EXISTS medical_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        disease TEXT,
        genetic_disease TEXT,
        allergies TEXT,
        created_at TEXT,
        updated_at TEXT
    )
""")

    conn.commit()
    conn.close()
    print("✓ Database initialized")



   