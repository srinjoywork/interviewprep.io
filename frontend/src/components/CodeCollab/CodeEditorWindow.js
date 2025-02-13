// import React, { useState } from "react";
// import Editor from "@monaco-editor/react";

// const CodeEditorWindow = ({ onChange, language, code, theme }) => {
//     const [value, setValue] = useState(code || "");

//     const handleEditorChange = (value) => {
//         setValue(value);
//         onChange("code", value);
//     };

//     return (
//         <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
//             <Editor
//                 height="85vh"
//                 width={`100%`}
//                 language={language || "cpp"}
//                 value={value}
//                 theme={theme}
//                 defaultValue="// some comment"
//                 onChange={handleEditorChange}
//             />
//         </div>
//     );
// };
// export default CodeEditorWindow;


import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";

const SERVER_URL = "https://collab-server-3.onrender.com"; // Your Socket.IO server
const ROOM_ID = "default-room"; // Change this dynamically for different rooms

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
    const [value, setValue] = useState(code || "");
    const [socket, setSocket] = useState(null);

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io(SERVER_URL);
        setSocket(newSocket);

        // Join a room
        newSocket.emit("joinRoom", ROOM_ID);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Listen for code changes from the server
    useEffect(() => {
        if (!socket) return;

        const handleCodeChange = (newValue) => {
            setValue(newValue);
            if (onChange) {
                onChange("code", newValue);
            }
        };

        socket.on("codeChange", handleCodeChange);

        return () => {
            socket.off("codeChange", handleCodeChange);
        };
    }, [socket, onChange]);

    // Handle local code changes and emit to server
    const handleEditorChange = (newValue) => {
        setValue(newValue);
        if (onChange) {
            onChange("code", newValue);
        }
        if (socket) {
            socket.emit("codeChange", { roomId: ROOM_ID, code: newValue });
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
                onChange={handleEditorChange} // ✅ Fixed: Use custom handler
            />
        </div>
    );
};

export default CodeEditorWindow;
