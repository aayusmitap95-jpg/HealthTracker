from datetime import datetime
from database.connection import get_connection


def db_user_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM user_inputs ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


# def db_user_get_one(id):
#     conn = get_connection()
#     row = conn.execute("SELECT * FROM user_inputs WHERE id = ?", (id,)).fetchone()
#     conn.close()
#     return dict(row) if row else None


# def db_user_create(data):
#     conn = get_connection()
#     now = datetime.now().isoformat()

#     cur = conn.execute("""
#         INSERT INTO user_inputs (user_id, age, height, weight, gender, created_at)
#         VALUES (?, ?, ?, ?, ?, ?)
#     """, (data["user_id"], data["age"], data["height"], data["weight"], data["gender"], now))

#     conn.commit()
#     new_id = cur.lastrowid
#     conn.close()
#     return db_user_get_one(new_id)


# def db_user_update(id, data):
#     conn = get_connection()
#     now = datetime.now().isoformat()

#     conn.execute("""
#         UPDATE user_inputs
#         SET age=?, height=?, weight=?, gender=?, updated_at=?
#         WHERE id=?
#     """, (data["age"], data["height"], data["weight"], data["gender"], now, id))

#     conn.commit()
#     conn.close()
#     return db_user_get_one(id)


# def db_user_delete(id):
#     old = db_user_get_one(id)
#     if not old:
#         return None

#     conn = get_connection()
#     conn.execute("DELETE FROM user_inputs WHERE id=?", (id,))
#     conn.commit()
#     conn.close()

#     return old



