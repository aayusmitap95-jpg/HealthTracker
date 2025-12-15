# # database/queries_auth.py
# from datetime import datetime
# from database.connection import get_connection

# def db_auth_register(data):
#     conn = get_connection()
#     now = datetime.now().isoformat()

#     cur = conn.execute("""
#         INSERT INTO users (name, email, password, created_at)
#         VALUES (?, ?, ?, ?)
#     """, (data["name"], data["email"], data["password"], now))

#     conn.commit()
#     new_id = cur.lastrowid
#     conn.close()
#     return db_auth_get_one(new_id)


# def db_auth_get_one(user_id):
#     conn = get_connection()
#     row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
#     conn.close()
#     return dict(row) if row else None


# def db_auth_login(email, password):
#     conn = get_connection()
#     row = conn.execute(
#         "SELECT * FROM users WHERE email=? AND password=?",
#         (email, password)
#     ).fetchone()

#     conn.close()
#     return dict(row) if row else None


