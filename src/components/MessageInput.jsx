import { useState, useRef } from "react";
import { db } from "../firebase";
import { ref, set, remove } from "firebase/database";
import styles from "./MessageInput.module.css";

export default function MessageInput({ onSend, roomId, uid, username }) {
  const [text, setText] = useState("");
  const typingTimeout = useRef(null);

  const handleTyping = (val) => {
    setText(val);
    const typingRef = ref(db, `typing/${roomId}/${uid}`);
    set(typingRef, { username });
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => remove(typingRef), 1500);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
    remove(ref(db, `typing/${roomId}/${uid}`));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder={`Message...`}
        value={text}
        onChange={(e) => handleTyping(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className={styles.btn} onClick={handleSend}>Send</button>
    </div>
  );
}