import styles from "./RoomSelector.module.css";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

const ROOMS = [
  { id: "general", label: "#general", emoji: "🌐", desc: "Talk about anything" },
  { id: "tech", label: "#tech", emoji: "💻", desc: "Code, tools, and tech talk" },
  { id: "random", label: "#random", emoji: "🎲", desc: "Memes, fun, off-topic" },
];

export default function RoomSelector({ onSelectRoom, username }) {
  const [onlineCounts, setOnlineCounts] = useState({});

  useEffect(() => {
    const unsubscribes = ROOMS.map((room) => {
      const roomRef = ref(db, `presence/${room.id}`);
      return onValue(roomRef, (snapshot) => {
        const data = snapshot.val();
        const count = data ? Object.keys(data).length : 0;
        setOnlineCounts((prev) => ({ ...prev, [room.id]: count }));
      });
    });
    return () => unsubscribes.forEach((u) => u());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.logo}>💬 Yapper</h1>
        <p className={styles.welcome}>Welcome, <b>{username}</b> — pick a room</p>
      </div>
      <div className={styles.rooms}>
        {ROOMS.map((room) => (
          <div
            key={room.id}
            className={styles.card}
            onClick={() => onSelectRoom(room)}
          >
            <span className={styles.emoji}>{room.emoji}</span>
            <div className={styles.info}>
              <h2 className={styles.roomName}>{room.label}</h2>
              <p className={styles.desc}>{room.desc}</p>
            </div>
            <span className={styles.online}>
              {onlineCounts[room.id] || 0} online
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}