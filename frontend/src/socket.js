import { io } from "socket.io-client";

let socket = null; // Store socket instance globally

export const initSocket = async () => {
  if (!socket) {
    const options = {
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };

    socket = io("https://collab-server-3.onrender.com/", options); // Change to production URL when needed

    // Handle reconnection
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected.");
    });
  }
  return socket;
};
