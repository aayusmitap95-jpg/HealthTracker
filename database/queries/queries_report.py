# database/queries/queries_report.py
from database.connection import get_connection

def user_health_report():
    conn = get_connection()
    rows = conn.execute("""
        SELECT
            u.id AS user_id,
            u.name,
            u.height,
            u.weight,                        
            u.age,
            u.gender,

            a.steps,
            a.water_intake,
            a.calories_burned,

            m.disease,
            m.genetic_disease,
            m.allergies

        FROM user_inputs u
        LEFT JOIN user_activity a ON a.user_id = u.id
        LEFT JOIN medical_info m ON m.user_id = u.id
        ORDER BY u.id DESC;
    """).fetchall()

    conn.close()
    return [dict(r) for r in rows]
