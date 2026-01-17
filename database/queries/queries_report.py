# database/queries/queries_report.py
from database.connection import get_connection

def user_health_report():
    """
    Fetch combined health data using INNER JOIN
    Joins user_inputs, activities, and medical tables
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # FIXED: Changed 'users' to 'user_inputs' and joined on correct columns
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
            FROM user_inputs u
            INNER JOIN activities a ON u.user_id = a.user_id
            INNER JOIN medical m ON u.user_id = m.user_id
            ORDER BY u.user_id
        """
        
        cursor.execute(query)
        rows = cursor.fetchall()
        
        result = [
            {
                "user_id": row[0],
                "name": row[1],
                "age": row[2],
                "height": row[3],
                "weight": row[4],
                "gender": row[5],
                "steps": row[6],
                "water_intake": row[7],
                "calories_burned": row[8],
                "disease": row[9] or "None",
                "genetic_disease": row[10] or "None",
                "allergies": row[11] or "None"
            }
            for row in rows
        ]
        
        conn.close()
        print(f"✅ Report query successful: {len(result)} records found")
        return result
        
    except Exception as e:
        print(f"❌ Database error in user_health_report: {e}")
        import traceback
        traceback.print_exc()
        return []