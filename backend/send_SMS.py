from twilio.rest import Client

from config import TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE, DEST_PHONE

def send_sms(message):
    try:
        client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(body=message, from_=TWILIO_PHONE, to=DEST_PHONE)
        print("SMS envoyé")
    except Exception as e:
        print("Error: ", e)