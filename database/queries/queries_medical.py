# # database/queries_medical.py
# from datetime import datetime
# from database.connection import get_connection


# def db_get_all_medical():
#     conn = get_connection()
#     rows = conn.execute("SELECT * FROM medical_records ORDER BY id DESC").fetchall()
#     conn.close()
#     return [dict(r) for r in rows]


# def db_get_medical(id):
#     conn = get_connection()
#     row = conn.execute("SELECT * FROM medical_records WHERE id = ?", (id,)).fetchone()
#     conn.close()
#     return dict(row) if row else None


# def db_create_medical(data):
#     conn = get_connection()
#     now = datetime.now().isoformat()

#     cur = conn.execute("""
#         INSERT INTO medical_records (user_id, disease, medication, doctor, created_at)
#         VALUES (?, ?, ?, ?, ?)
#     """, (data["user_id"], data["disease"], data["medication"], data["doctor"], now))

#     conn.commit()
#     new_id = cur.lastrowid
#     conn.close()
#     return db_get_medical(new_id)


# def db_update_medical(id, data):
#     conn = get_connection()
#     now = datetime.now().isoformat()

#     conn.execute("""
#         UPDATE medical_records
#         SET disease=?, medication=?, doctor=?, updated_at=?
#         WHERE id=?
#     """, (data["disease"], data["medication"], data["doctor"], now, id))

#     conn.commit()
#     conn.close()
#     return db_get_medical(id)


# def db_delete_medical(id):
#     old = db_get_medical(id)
#     if not old:
#         return None

#     conn = get_connection()
#     conn.execute("DELETE FROM medical_records WHERE id=?", (id,))
#     conn.commit()
#     conn.close()

#     return old


