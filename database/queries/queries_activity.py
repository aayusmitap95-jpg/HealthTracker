# # database/queries_activity.py
# from datetime import datetime
# from database.connection import get_connection

# def db_get_all_activity():
#     conn = get_connection()
#     rows = conn.execute("SELECT * FROM daily_activity ORDER BY id DESC").fetchall()
#     conn.close()
#     return [dict(r) for r in rows]


# def db_get_activity(id):
#     conn = get_connection()
#     row = conn.execute("SELECT * FROM daily_activity WHERE id = ?", (id,)).fetchone()
#     conn.close()
#     return dict(row) if row else None


# def db_create_activity(data):
#     conn = get_connection()
#     now = datetime.now().isoformat()

#     cur = conn.execute("""
#         INSERT INTO daily_activity (user_id, steps, calories, water, created_at)
#         VALUES (?, ?, ?, ?, ?)
#     """, (data["user_id"], data["steps"], data["calories"], data["water"], now))

#     conn.commit()
#     new_id = cur.lastrowid
#     conn.close()
#     return db_get_activity(new_id)


# def db_update_activity(id, data):
#     conn = get_connection()
#     now = datetime.now().isoformat()

#     conn.execute("""
#         UPDATE daily_activity
#         SET steps=?, calories=?, water=?, updated_at=?
#         WHERE id=?
#     """, (data["steps"], data["calories"], data["water"], now, id))

#     conn.commit()
#     conn.close()
#     return db_get_activity(id)


# def db_delete_activity(id):
#     old = db_get_activity(id)
#     if not old:
#         return None

#     conn = get_connection()
#     conn.execute("DELETE FROM daily_activity WHERE id=?", (id,))
#     conn.commit()
#     conn.close()

#     return old

