from datetime import datetime
from .connection import get_connection

#user(auth)
def db_register_user(data):
    conn = get_connection()
    now = datetime.now().isoformat

    cur = conn.execute("""
                       INSERT INTO users (name, email, password, created_at)
                       VALUES (?, ?, ?, ?)
                """,(data["name"], data["email"], data["password"], now))
    
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_user(new_id)

def db_login_user(email, password):
    conn = get_connection()
    row = conn.execute("""
        SELECT * FROM users WHERE email=? AND password=?
    """, (email, password)).fetchone()
    conn.close()
    return dict(row) if row else None 
def db_get_user(user_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
    conn.close()
    return dict(row) if row else None
def db_update_user(user_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE users SET name=?, email=?, password=?, updated_at=?
        WHERE id=?
    """, (data["name"], data["email"], data["password"], now, user_id))

    conn.commit()
    conn.close()
    return db_get_user(user_id)
def db_delete_user(user_id):
    user = db_get_user(user_id):
    if not user:
        return None
    conn = get_connection()
    conn.execute("DELETE FROM users WHERE id=?", (user_id,))
    conn.commit()
    conn.close()
    return user
#user input

def db_create_user_input(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute("""
        INSERT INTO user_input (user_id, age, height, weight, gender, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (data["user_id"], data["height"], data["weight"], data["gender"], now, input_id)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_user_input(new_id)

def db_get_user_input(input_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM user_input WHERE id=?", (input_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_get_all_user_input(input_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM user_input WHERE id=? ORDER BY id DESC", (user_id,)).fetchall()
    conn.close()
    return dict(row) if row else None

  