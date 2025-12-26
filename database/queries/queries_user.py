# Actual SQL queries — Create, Read, Update, Delete (CRUD)

from datetime import datetime
from database.connection import get_connection

def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM user_inputs").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one(user_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM user_inputs WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        """
        INSERT INTO user_inputs (user_id, name, age, height, weight, gender, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data["user_id"],
            data["name"],
            data["age"],
            data["height"],
            data["weight"],
            data["gender"],
            now
        )
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)

def db_update(user_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        """
        UPDATE user_inputs
        SET user_id=?, name=?, age=?, height=?, weight=?, gender=?, updated_at=?
        WHERE id=?
        """,
        (
            data["user_id"],
            data["name"],
            data["age"],
            data["height"],
            data["weight"],
            data["gender"],
            now,
            user_id   # ✅ added missing binding for WHERE id=?
        )
    )
    conn.commit()
    conn.close()
    return db_get_one(user_id)

def db_delete(user_id):
    user = db_get_one(user_id)
    if not user:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM user_inputs WHERE id=?", (user_id,))
    conn.commit()
    conn.close()
    return user
