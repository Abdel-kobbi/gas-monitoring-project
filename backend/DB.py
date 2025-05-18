import mysql.connector
from config import DB_CONFIG

# Connexion à ta base de données MySQL
def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


# === DB SAVE FUNCTION ===
def save_to_db(gas_level, alert):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO gas_data (gas_level, alert) VALUES (%s, %s)", (gas_level, alert))
    conn.commit()
    conn.close()