from datetime import datetime
from database.connection import get_connection

def db_user_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM users ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_user_get_one(id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM users WHERE id = ?", (id,)).fetchone()
    conn.close()
    return dict(row) if row else None

# def db_user_create(data):
#     conn = get_connection()
#     now = datetime.now().isoformat()

#     cur = conn.execute("""
#         INSERT INTO users (name, age, gender, height, weight, created_at, updated_at)
#         VALUES (?, ?, ?, ?, ?, ?, ?)
#     """, (
#         data.get("name"),
#         data.get("age"),
#         data.get("gender"),
#         data.get("height"),
#         data.get("weight"),
#         now,
#         now
#     ))

#     conn.commit()
#     new_id = cur.lastrowid
#     conn.close()
#     return db_user_get_one(new_id)



