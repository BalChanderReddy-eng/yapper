import { useState } from "react";
import styles from "./Login.module.css";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim().length < 2) return;
    onLogin(name.trim());
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>💬 Yapper</h1>
        <p className={styles.subtitle}>Real-time chat. No signup needed.</p>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          maxLength={20}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Join as Guest →
        </button>
      </div>
    </div>
  );
}