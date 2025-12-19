from datetime import datetime
from database.connection import get_connection

def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM user_activity").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one(activity_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM user_activity WHERE id = ?", (activity_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute("""
        INSERT INTO user_activity (user_id, steps, water_intake, calories_burned, created_at)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data["user_id"],
        data["steps"],
        data["water_intake"],
        data["calories_burned"],
        now
    ))
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)

def db_update(activity_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE user_activity
        SET steps=?, water_intake=?, calories_burned=?, updated_at=?
        WHERE id=?
    """, (
        data["steps"],
        data["water_intake"],
        data["calories_burned"],
        now,
        activity_id
    ))
    conn.commit()
    conn.close()
    return db_get_one(activity_id)

# def db_delete(activity_id):
#     conn = get_connection()
#     conn.execute("DELETE FROM user_activity WHERE id=?", (activity_id,))
#     conn.commit()
#     conn.close()
