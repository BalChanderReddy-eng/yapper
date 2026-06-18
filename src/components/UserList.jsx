import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import styles from "./UserList.module.css";

export default function UserList({ roomId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const presenceRef = ref(db, `presence/${roomId}`);
    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setUsers([]);
      setUsers(Object.values(data).map((u) => u.username));
    });
    return () => unsubscribe();
  }, [roomId]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Online — {users.length}</p>
      {users.map((u, i) => (
        <div key={i} className={styles.user}>
          <span className={styles.dot} />
          {u}
        </div>
      ))}
    </div>
  );
}