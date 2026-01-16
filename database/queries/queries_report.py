# # database/queries/queries_report.py
# from database.connection import get_connection

# def user_health_report():
#     conn = get_connection()
#     rows = conn.execute("""
#         SELECT
#             u.id AS user_id,
#             u.name,
#             u.height,
#             u.weight,                        
#             u.age,
#             u.gender,

#             a.steps,
#             a.water_intake,
#             a.calories_burned,

#             m.disease,
#             m.genetic_disease,
#             m.allergies

#         FROM user_inputs u
#         LEFT JOIN user_activity a ON a.user_id = u.id
#         LEFT JOIN medical_info m ON m.user_id = u.id
#         ORDER BY u.id DESC;
#     """).fetchall()

#     conn.close()
#     return [dict(r) for r in rows]


# database/queries/queries_report.py
from database.connection import get_connection

def user_health_report():
    """
    Fetch combined health data using INNER JOIN
    Joins users, activities, and medical tables
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    query = """
        SELECT 
            u.user_id,
            u.name,
            u.age,
            u.height,
            u.weight,
            u.gender,
            a.steps,
            a.water_intake,
            a.calories_burned,
            m.disease,
            m.genetic_disease,
            m.allergies
        FROM users u
        INNER JOIN activities a ON u.user_id = a.user_id
        INNER JOIN medical m ON u.user_id = m.user_id
        ORDER BY u.user_id
    """
    
    try:
        cursor.execute(query)
        rows = cursor.fetchall()
        
        result = [
            {
                "name": row[0],
                "age": row[1],
                "height": row[2],
                "weight": row[3],
                "gender": row[4],
                "steps": row[5],
                "water_intake": row[6],
                "calories_burned": row[7],
                "disease": row[8] or "None",
                "genetic_disease": row[9] or "None",
                "allergies": row[10] or "None"
            }
            for row in rows
        ]
        
        return result
        
    except Exception as e:
        print(f"Database error in user_health_report: {e}")
        return []
    finally:
        conn.close()