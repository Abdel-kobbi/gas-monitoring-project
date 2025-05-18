# 🛡️ Système de Surveillance de Gaz avec ESP32, MQTT, Flask et React

## 📌 Description

Ce projet vise à développer un **système intelligent de surveillance des gaz** basé sur le capteur **MQ135** connecté à un microcontrôleur **ESP32**. Il permet de :

- **Mesurer** la concentration de gaz (en PPM) dans l’air.
- **Transmettre** les données via **MQTT**.
- **Visualiser** les données dans une interface **React** moderne.
- **Gérer** les alertes critiques via **e-mails et SMS** en utilisant **Twilio**.
- **Activer/désactiver** un buzzer à distance depuis l’interface web.

---

## 🧪 Technologies utilisées

| Composant        | Technologie |
|------------------|-------------|
| Microcontrôleur  | ESP32       |
| Capteur          | MQ135       |
| Communication    | MQTT (Mosquitto) |
| Backend          | Python Flask |
| Frontend         | React + Bootstrap |
| Base de données  | MySQL       |
| Notifications    | Twilio (SMS/Email) |
| Simulation       | [Wokwi](https://wokwi.com/) |

---

## 📸 Aperçu du projet
 
![Dashboard](https://github.com/user-attachments/assets/9e29b714-6be9-4701-9b31-3542834f1f2f)
![chart](https://github.com/user-attachments/assets/11a504ee-ede8-49ee-9c1a-d2395ad487c9)
![login](https://github.com/user-attachments/assets/5b9cc2e0-cbad-4c4f-a3b5-826f2da2e3a4)


---

## 🔧 Fonctionnalités principales

- Relevé automatique des niveaux de gaz.
- Historique des mesures avec export PDF.
- Alerte visuelle selon le niveau de PPM.
- Désactivation manuelle du buzzer.
- Envoi automatique d’alertes :
  - 📩 Par e-mail
  - 📱 Par SMS (via Twilio)

---

## 🚀 Installation

### 🔌 Partie embarquée (ESP32)

1. Connecter le capteur MQ135 à l’ESP32.
2. Flasher le code C++ qui publie les données sur le topic MQTT `/indobot/gas`.
3. Exemple de simulation : [Voir sur Wokwi](https://wokwi.com/projects/430968035165729793)

### 🖥️ Backend (Flask)

```bash
cd backend/
pip install -r requirements.txt
python app.py
```
### 🌐 Frontend (React)
```bash
cd frontend/
npm install
npm run dev
```

