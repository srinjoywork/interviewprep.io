import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";

const SERVER_URL = "https://collab-server-3.onrender.com"; // Your Socket.IO server
const ROOM_ID = "default-room"; // Room for collaboration

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
    const [value, setValue] = useState(code || "");
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = io(SERVER_URL);
        socketRef.current = socket;

        // Join room
        socket.emit("joinRoom", ROOM_ID);

        // Listen for code changes
        socket.on("codeChange", ({ code }) => {
            setValue(code);
            if (onChange) onChange("code", code);
        });

        return () => {
            socket.disconnect();
        };
    }, [onChange]);

    const handleEditorChange = (newValue) => {
        setValue(newValue);
        if (onChange) onChange("code", newValue);
        
        // Emit changes to all users in the room
        if (socketRef.current) {
            socketRef.current.emit("codeChange", { roomId: ROOM_ID, code: newValue });
        }
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="85vh"
                width="100%"
                language={language || "cpp"}
                value={value}
                theme={theme}
                defaultValue="// Start coding..."
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditorWindow;








