import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from config import EMAIL_USER, EMAIL_PASS, DEST_EMAIL 



def send_email(gas_level):
    message = MIMEMultipart()
    message["From"] = EMAIL_USER
    message["To"] = DEST_EMAIL
    message["Subject"] = "🚨 Alerte Gaz Détectée - Niveau Dangereux"

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    body = f"""\
    Bonjour,

    Une concentration élevée de gaz a été détectée par le capteur de votre système IoT.

    🔴 Niveau de gaz détecté : {gas_level} ppm
    🕒 Date et heure : {timestamp}

    Veuillez vérifier immédiatement votre installation pour éviter tout danger potentiel.

    Ceci est une alerte automatique générée par votre système de surveillance.

    Cordialement,
    Système IoT - Détection de Gaz
    """

    message.attach(MIMEText(body, "plain", "utf-8"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, DEST_EMAIL, message.as_string())
        server.quit()
        print("Email envoyé")
    except Exception as e:
        print("Erreur:", e)