import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import RoomSelector from "./components/RoomSelector";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (name) => {
    await signInAnonymously(auth);
    setUsername(name);
  };

  const handleRoomSelect = (room) => {
    setCurrentRoom(room);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
  };

  if (!user || !username) {
    return <Login onLogin={handleLogin} />;
  }

  if (!currentRoom) {
    return <RoomSelector onSelectRoom={handleRoomSelect} username={username} />;
  }

  return (
    <ChatWindow
      room={currentRoom}
      username={username}
      onLeave={handleLeaveRoom}
    />
  );
}