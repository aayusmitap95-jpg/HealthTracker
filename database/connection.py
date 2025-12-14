import sqlite3
DB_FILE = "health_tracker.db"
def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row #returns row as python dict like objects
    return conn
def init_database():
    conn = get_connection()

    #user table
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
    # AUTH TABLe
    conn.execute("""
        CREATE TABLE IF NOT EXISTS auth (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            email TEXT UNIQUE,
            password TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        
    """)
    # DAILY ACTIVITY TABLE
    
    conn.execute("""
        CREATE TABLE IF NOT EXISTS daily_activity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            water_intake INTEGER,     -- in ml
            steps INTEGER,
            calories_burned INTEGER,
            date TEXT,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    # MEDICAL RECORDS TABLE

    conn.execute("""
        CREATE TABLE IF NOT EXISTS medical_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            previous_diseases TEXT,
            current_diseases TEXT,
            genetic_diseases TEXT,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    conn.commit()
    conn.close()

    print("✓ Health Tracker Database initialized")
                 