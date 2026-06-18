# 💬 Yapper — Real-Time Chat App

A production-quality real-time chat application built with React and Firebase.
No signup needed — join as a guest and start chatting instantly.

🔗 **Live Demo: [yapper-flax.vercel.app](https://yapper-flax.vercel.app)**

> Open in two browser tabs to see real-time messaging in action.

---

## ✨ Features

- 🚀 Guest login — no signup, no password
- 💬 3 chat rooms — #general, #tech, #random
- ⚡ Real-time messages via Firebase Realtime Database
- 👀 Live typing indicators
- 🟢 Online users list per room (updates in real time)
- 🔐 Firebase Anonymous Auth — every user gets a secure session
- 📱 Clean dark UI built with CSS Modules

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS Modules |
| Real-time | Firebase Realtime Database |
| Auth | Firebase Anonymous Authentication |
| Deployment | Vercel |

---

## 🔐 Security

- All traffic encrypted via HTTPS
- Firebase encrypts data at rest
- Database rules restrict read/write to authenticated users only
- API keys stored in environment variables — never exposed in code

---

## 🚀 Run Locally

```bash
git clone https://github.com/BalChanderReddy-eng/yapper.git
cd yapper
npm install
```

Create a `.env` file in the root:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_URL=your_database_url
```

```bash
npm run dev
```

---

## 📸 Screenshots

<img width="1915" height="988" alt="image" src="https://github.com/user-attachments/assets/5f800023-af90-459c-8ca4-1d889c911a52" />

<img width="1915" height="951" alt="image" src="https://github.com/user-attachments/assets/0469bbcc-a854-41b7-9f04-ad0006bc7774" />



---

Built by [Balchander Reddy Yedla](https://linkedin.com/in/balchander-reddy-yedla)
