from DB import save_to_db

from send_SMS import send_sms
from send_EMAIL import send_email
import paho.mqtt.client as mqtt


# === CONFIGURATION ===
MQTT_BROKER = "broker.emqx.io"
MQTT_TOPIC = "/indobot/gas"


# === MQTT CALLBACK ===
def on_message(client, userdata, msg):
    gas_level = float(msg.payload.decode())
    alert = gas_level >= 500  
    print(f"Gas level: {gas_level}, Alert: {alert}")
    
    save_to_db(gas_level, alert)
    
    if alert:
        send_sms(f"Alerte Gaz détectée ! Niveau: {gas_level} ppm.")
        send_email(gas_level)

# === MQTT SETUP ===
client = mqtt.Client()
client.on_message = on_message
client.connect(MQTT_BROKER, 1883, 60)
client.subscribe(MQTT_TOPIC)
client.loop_forever()
