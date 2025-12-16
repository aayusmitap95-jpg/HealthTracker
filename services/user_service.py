from database.queries.queries_user import (
    db_user_get_all,
    db_user_get_one,
    db_user_create,
    # db_user_update,
    # db_user_delete
)
from database.connection import get_connection
from datetime import datetime

def service_user_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return [dict(row) for row in rows]

def service_user_get_one(user_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM users WHERE id = ?", (user_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None

def service_user_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()

    cursor = conn.execute("""
        INSERT INTO users (name, age, gender, height, weight, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("name"),
        data.get("age"),
        data.get("gender"),
        data.get("height"),
        data.get("weight"),
        now,
        now
    ))

    conn.commit()
    user_id = cursor.lastrowid
    conn.close()

    return {"id": user_id, **data}

# def service_user_update(user_id, data):
#     return db_user_update(user_id, data)

# def service_user_delete(user_id):
#     return db_user_delete(user_id)

