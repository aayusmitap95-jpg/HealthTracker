# Better version with proper field mapping
from datetime import datetime
from database.connection import get_connection

def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM user_inputs").fetchall()
    conn.close()
    
    # Map 'id' to 'user_id' for frontend
    users = []
    for row in rows:
        user_dict = dict(row)
        user_dict['user_id'] = user_dict['id']  # Add user_id field
        users.append(user_dict)
    return users

def db_get_one(user_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM user_inputs WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    
    if row:
        user_dict = dict(row)
        user_dict['user_id'] = user_dict['id']  # Add user_id field
        return user_dict
    return None

def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        """
        INSERT INTO user_inputs (name, age, height, weight, gender, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
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
        SET name=?, age=?, height=?, weight=?, gender=?, updated_at=?
        WHERE id=?
        """,
        (
            data["name"],
            data["age"],
            data["height"],
            data["weight"],
            data["gender"],
            now,
            user_id
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