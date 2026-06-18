import { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import {
  ref, push, onValue, serverTimestamp, set, remove, onDisconnect
} from "firebase/database";
import MessageInput from "./MessageInput";
import UserList from "./UserList";
import styles from "./ChatWindow.module.css";

export default function ChatWindow({ room, username, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const bottomRef = useRef(null);
  const uid = auth.currentUser?.uid;

  // Messages
  useEffect(() => {
    const msgsRef = ref(db, `messages/${room.id}`);
    const unsubscribe = onValue(msgsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setMessages([]);
      const list = Object.entries(data).map(([id, val]) => ({ id, ...val }));
      list.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(list);
    });
    return () => unsubscribe();
  }, [room]);

  // Presence
  useEffect(() => {
    if (!uid) return;
    const presenceRef = ref(db, `presence/${room.id}/${uid}`);
    set(presenceRef, { username });
    onDisconnect(presenceRef).remove();
    return () => remove(presenceRef);
  }, [room, uid, username]);

  // Typing listeners
  useEffect(() => {
    const typingRef = ref(db, `typing/${room.id}`);
    const unsubscribe = onValue(typingRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setTypingUsers([]);
      const others = Object.entries(data)
        .filter(([id]) => id !== uid)
        .map(([, val]) => val.username);
      setTypingUsers(others);
    });
    return () => unsubscribe();
  }, [room, uid]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    push(ref(db, `messages/${room.id}`), {
      text,
      username,
      uid,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.roomInfo}>
          <span className={styles.roomEmoji}>{room.emoji}</span>
          <span className={styles.roomName}>{room.label}</span>
        </div>
        <UserList roomId={room.id} />
        <button className={styles.leaveBtn} onClick={onLeave}>
          ← Leave Room
        </button>
      </div>

      <div className={styles.main}>
        <div className={styles.messages}>
          <div className={styles.welcome}>
            <p>Welcome to <b>{room.label}</b> — {room.desc}</p>
          </div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${msg.uid === uid ? styles.own : ""}`}
            >
              <span className={styles.msgUser}>{msg.uid === uid ? "You" : msg.username}</span>
              <div className={styles.bubble}>{msg.text}</div>
            </div>
          ))}
          {typingUsers.length > 0 && (
            <p className={styles.typing}>
              {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
            </p>
          )}
          <div ref={bottomRef} />
        </div>
        <MessageInput onSend={sendMessage} roomId={room.id} uid={uid} username={username} />
      </div>
    </div>
  );
}