import Peer from "peerjs";
import React, { useState, createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("");
  const [roomId, setRoomId] = useState("");
  const [peerId, setPeerId] = useState("");
  const peerInstance = useRef(null);

  useEffect(() => {
    // Initialize Socket
    const socket = io("http://localhost:3000", { withCredentials: true });
    setSocket(socket);

    // Load User from Local Storage
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Parse string to object
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }

    // Initialize Peer
    const peer = new Peer();
    peer.on("open", (id) => setPeerId(id));
    peerInstance.current = peer;

    // Cleanup on unmount
    return () => {
      peer.destroy();
      socket.disconnect();
    };
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        status,
        setStatus,
        roomId,
        setRoomId,
        peerInstance,
        peerId,
        socket,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
