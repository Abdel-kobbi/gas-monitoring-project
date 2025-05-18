from flask import Flask, jsonify
from flask_cors import CORS
import paho.mqtt.publish as publish

from DB import get_connection

app = Flask(__name__)
CORS(app)



# Fonction pour récupérer les données
def get_data():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, timestamp, gas_level FROM gas_data ORDER BY timestamp DESC")
    rows = cursor.fetchall()
    conn.close()
    return [{"id": row[0],"timestamp": row[1].strftime("%Y-%m-%d %H:%M:%S"), "ppm": row[2]} for row in rows]

@app.route('/api/gaz')
def api_gaz():
    return jsonify(get_data())


@app.route('/api/buzzer/off', methods=['POST'])
def buzzer_off():
    try:
        publish.single("/indobot/gas/buzzer", "OFF", hostname="broker.emqx.io") 
        return jsonify({"message": "Buzzer désactiver"}), 200
    except Exception as e:
        print("Error ", e)
        return jsonify({"message": "Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
