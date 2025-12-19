from datetime import datetime
from database.connection import get_connection

def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM medical_info").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one(medical_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM medical_info WHERE id = ?", (medical_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        """
        INSERT INTO medical_info
        (user_id, disease, genetic_disease, allergies, created_at)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            data["user_id"],
            data["disease"],
            data.get("genetic_disease"),
            data.get("allergies"),
            now
        )
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)

def db_update(medical_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        """
        UPDATE medical_info
        SET disease=?, genetic_disease=?, allergies=?, updated_at=?
        WHERE id=?
        """,
        (
            data["disease"],
            data.get("genetic_disease"),
            data.get("allergies"),
            now,
            medical_id
        )
    )
    conn.commit()
    conn.close()
    return db_get_one(medical_id)

def db_delete(medical_id):
    medical = db_get_one(medical_id)
    if not medical:
        return None
    conn = get_connection()
    conn.execute("DELETE FROM medical_info WHERE id=?", (medical_id,))
    conn.commit()
    conn.close()
    return medical
