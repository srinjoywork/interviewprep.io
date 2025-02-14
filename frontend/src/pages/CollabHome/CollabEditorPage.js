// import React, { useState, useRef, useEffect } from "react";
// import toast from "react-hot-toast";
// import ACTIONS from "../../Actions";
// import Client from "../../components/CodeCollab/Client";
// import Editor from "../../components/CodeCollab/Editor";
// import Chat from "../../components/CodeCollab/Chat";
// import ChatAI from "../../components/CodeCollab/ChatWithAI";
// import FileUpload from "../../components/CodeCollab/FileUpload";
// import { initSocket } from "../../socket";
// import BottomNavigation from "../../components/CodeCollab/BottomNavigation";
// import "../../App.css";
// import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";

// const CollabEditorPage = () => {
//   const socketRef = useRef(null);
//   const codeRef = useRef(null);
//   const location = useLocation();
//   const { roomId } = useParams();
//   const reactNavigator = useNavigate();
//   const [clients, setClients] = useState([]);
//   const [selectedTab, setSelectedTab] = useState("chat");
//   const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         socketRef.current = await initSocket();
//         socketRef.current.on("connect_error", handleErrors);
//         socketRef.current.on("connect_failed", handleErrors);

//         function handleErrors(e) {
//           console.log("Socket error:", e);
//           toast.error("Socket connection failed, try again later.");
//           reactNavigator("/codecollab");
//         }

//         socketRef.current.emit(ACTIONS.JOIN, {
//           roomId,
//           username: location.state?.username,
//         });

//         // Listening for joined event
//         socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
//           if (username !== location.state?.username) {
//             toast.success(`${username} joined the room.`);
//           }
//           setClients(clients);
//           socketRef.current.emit(ACTIONS.SYNC_CODE, {
//             code: codeRef.current,
//             socketId,
//           });
//         });

//         // Listening for disconnected event
//         socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
//           toast.success(`${username} left the room.`);
//           setClients((prev) => prev.filter((client) => client.socketId !== socketId));
//         });
//       } catch (error) {
//         console.error("Error initializing socket:", error);
//       }
//     };

//     init();

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current.off(ACTIONS.JOINED);
//         socketRef.current.off(ACTIONS.DISCONNECTED);
//       }
//     };
//   }, [roomId, location.state, reactNavigator]);

//   async function copyRoomId() {
//     try {
//       await navigator.clipboard.writeText(roomId);
//       toast.success("Room ID has been copied to your clipboard");
//     } catch (err) {
//       toast.error("Could not copy the Room ID");
//       console.error(err);
//     }
//   }

//   function leaveRoom() {
//     reactNavigator("/codecollab");
//   }

//   if (!location.state) {
//     return <Navigate to="/codecollab" />;
//   }

//   return (
//     <div className={`mainWrap ${isEditorFullScreen ? "fullscreen" : ""}`}>
//       <div className="aside" style={{ display: isEditorFullScreen ? "none" : "block" }}>
//         <div className="asideInner">
//           <h3>Connected</h3>
//           <div className="clientsList">
//             {clients.map((client) => (
//               <Client key={client.socketId} username={client.username} />
//             ))}
//           </div>
//         </div>
//         <button className="btn copyBtn" onClick={copyRoomId}>
//           Copy Editor ID
//         </button>
//         <button className="btn leaveBtn" onClick={leaveRoom}>
//           Leave
//         </button>
//       </div>
//       <div className={`editorWrap scrollable-content middle-column ${isEditorFullScreen ? "fullscreen" : ""}`}>
//         <Editor
//           socketRef={socketRef}
//           roomId={roomId}
//           onCodeChange={(code) => {
//             codeRef.current = code;
//           }}
//         />
//         <button className="fullscreen-btn" onClick={() => setIsEditorFullScreen(!isEditorFullScreen)}>
//           {isEditorFullScreen ? "Exit Fullscreen" : "Fullscreen"}
//         </button>
//       </div>
//       <div style={{ display: isEditorFullScreen ? "none" : "block" }}>
//         <div style={{ height: "40vh", width: "60vh", right: "20px" }}>
//           {selectedTab === "chat" && <Chat socketRef={socketRef} username={location.state?.username} />}
//           {selectedTab === "fileUpload" && <FileUpload socket={socketRef} />}
//           {selectedTab === "chatwithai" && <ChatAI socketRef={socketRef} username={location.state?.username} />}
//           <BottomNavigation onSelectTab={setSelectedTab} selectedTab={selectedTab} />
//         </div>
//       </div>
//     </div>
//   );
// };



// export default CollabEditorPage;
// import React, { useState, useRef, useEffect } from "react";
// import toast from "react-hot-toast";
// import ACTIONS from "../../Actions";
// import Client from "../../components/CodeCollab/Client";
// import Editor from "../../components/CodeCollab/Editor";
// import Chat from "../../components/CodeCollab/Chat";
// import ChatAI from "../../components/CodeCollab/ChatWithAI";
// import FileUpload from "../../components/CodeCollab/FileUpload";
// import { initSocket } from "../../socket";
// import BottomNavigation from "../../components/CodeCollab/BottomNavigation";
// import "../../App.css";
// import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";

// const CollabEditorPage = () => {
//     const socketRef = useRef(null);
//     const codeRef = useRef(""); // Store initial code
//     const location = useLocation();
//     const { roomId } = useParams();
//     const reactNavigator = useNavigate();
//     const [clients, setClients] = useState([]);
//     const [selectedTab, setSelectedTab] = useState("chat");
//     const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);

//     useEffect(() => {
//         const init = async () => {
//             if (!socketRef.current) {
//                 try {
//                     socketRef.current = await initSocket();

//                     socketRef.current.on("connect_error", handleErrors);
//                     socketRef.current.on("connect_failed", handleErrors);

//                     function handleErrors(e) {
//                         console.log("Socket error:", e);
//                         toast.error("Socket connection failed, try again later.");
//                         reactNavigator("/codecollab");
//                     }

//                     // Emit JOIN event with unique user
//                     socketRef.current.emit(ACTIONS.JOIN, {
//                         roomId,
//                         username: location.state?.username,
//                     });

//                     // Listen for JOINED event
//                     socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
//                         if (username !== location.state?.username) {
//                             toast.success(`${username} joined the room.`);
//                         }

//                         // Prevent duplicate users in state
//                         setClients([...clients]);

//                         // Send current code only to the newly joined user
//                         if (socketId !== socketRef.current.id) {
//                             socketRef.current.emit(ACTIONS.SYNC_CODE, {
//                                 code: codeRef.current,
//                                 socketId,
//                             });
//                         }
//                     });

//                     // Listen for CODE_CHANGE and update the code
//                     socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
//                         codeRef.current = code;
//                     });

//                     // Listen for DISCONNECTED event
//                     socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
//                         toast.success(`${username} left the room.`);
//                         setClients((prev) => prev.filter((client) => client.socketId !== socketId));
//                     });

//                 } catch (error) {
//                     console.error("Error initializing socket:", error);
//                 }
//             }
//         };

//         init();

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//                 socketRef.current.off(ACTIONS.JOINED);
//                 socketRef.current.off(ACTIONS.DISCONNECTED);
//                 socketRef.current.off(ACTIONS.CODE_CHANGE);
//                 socketRef.current = null;
//             }
//         };
//     }, [roomId, location.state, reactNavigator]);

//     async function copyRoomId() {
//         try {
//             await navigator.clipboard.writeText(roomId);
//             toast.success("Room ID has been copied to your clipboard");
//         } catch (err) {
//             toast.error("Could not copy the Room ID");
//             console.error(err);
//         }
//     }

//     function leaveRoom() {
//         reactNavigator("/codecollab");
//     }

//     if (!location.state) {
//         return <Navigate to="/codecollab" />;
//     }

//     return (
//         <div className={`mainWrap ${isEditorFullScreen ? "fullscreen" : ""}`}>
//             <div className="aside" style={{ display: isEditorFullScreen ? "none" : "block" }}>
//                 <div className="asideInner">
//                     <h3>Connected Users</h3>
//                     <div className="clientsList">
//                         {clients.map((client) => (
//                             <Client key={client.socketId} username={client.username} />
//                         ))}
//                     </div>
//                 </div>
//                 <button className="btn copyBtn" onClick={copyRoomId}>
//                     Copy Editor ID
//                 </button>
//                 <button className="btn leaveBtn" onClick={leaveRoom}>
//                     Leave
//                 </button>
//             </div>
//             <div className={`editorWrap scrollable-content middle-column ${isEditorFullScreen ? "fullscreen" : ""}`}>
//                 <Editor
//                     socketRef={socketRef}
//                     roomId={roomId}
//                     onCodeChange={(code) => {
//                         codeRef.current = code;
//                         if (socketRef.current) {
//                             socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
//                         }
//                     }}
//                 />
//                 <button className="fullscreen-btn" onClick={() => setIsEditorFullScreen(!isEditorFullScreen)}>
//                     {isEditorFullScreen ? "Exit Fullscreen" : "Fullscreen"}
//                 </button>
//             </div>
//             <div style={{ display: isEditorFullScreen ? "none" : "block" }}>
//                 <div style={{ height: "40vh", width: "60vh", right: "20px" }}>
//                     {selectedTab === "chat" && <Chat socketRef={socketRef} username={location.state?.username} />}
//                     {selectedTab === "fileUpload" && <FileUpload socket={socketRef} />}
//                     {selectedTab === "chatwithai" && <ChatAI socketRef={socketRef} username={location.state?.username} />}
//                     <BottomNavigation onSelectTab={setSelectedTab} selectedTab={selectedTab} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CollabEditorPage;






import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ACTIONS from "../../Actions";
import Client from "../../components/CodeCollab/Client";
import Editor from "../../components/CodeCollab/Editor";
import Chat from "../../components/CodeCollab/Chat";
import ChatAI from "../../components/CodeCollab/ChatWithAI";
import FileUpload from "../../components/CodeCollab/FileUpload";
import { initSocket } from "../../socket";
import BottomNavigation from "../../components/CodeCollab/BottomNavigation";
import "../../App.css";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";

const CollabEditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(""); // Store latest code
    const location = useLocation();
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [selectedTab, setSelectedTab] = useState("chat");
    const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (!location.state?.username) {
                navigate("/codecollab");
                return;
            }

            if (socketRef.current) return; // Prevent multiple initializations

            try {
                socketRef.current = await initSocket();

                socketRef.current.on("connect", () => {
                    console.log("Connected to server:", socketRef.current.id);
                });

                socketRef.current.on("disconnect", (reason) => {
                    console.warn("Disconnected from server:", reason);
                    toast.error("Disconnected. Reconnecting...");
                });

                socketRef.current.on("connect_error", handleErrors);
                socketRef.current.on("connect_failed", handleErrors);

                function handleErrors(err) {
                    console.error("Socket error:", err);
                    toast.error("Connection failed. Retrying...");

                    setTimeout(() => {
                        if (socketRef.current) socketRef.current.connect();
                    }, 5000);
                }

                socketRef.current.emit(ACTIONS.JOIN, {
                    roomId,
                    username: location.state.username,
                });

                socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                    if (username !== location.state.username) {
                        toast.success(`${username} joined the room.`);
                    }

                    setClients(clients);

                    if (socketId !== socketRef.current.id) {
                        console.log("Syncing code to new user...");
                        socketRef.current.emit(ACTIONS.SYNC_CODE, {
                            code: codeRef.current,
                            socketId,
                        });
                    }
                });

                socketRef.current.on(ACTIONS.SYNC_CODE, ({ code }) => {
                    console.log("Received synced code:", code);
                    codeRef.current = code;
                });

                socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                    if (codeRef.current !== code) {
                        console.log("Code updated by another user:", code);
                        codeRef.current = code;
                    }
                });

                socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => prev.filter((client) => client.socketId !== socketId));
                });

            } catch (error) {
                console.error("Error initializing socket:", error);
            }
        };

        init();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
                socketRef.current.off(ACTIONS.CODE_CHANGE);
                socketRef.current.off(ACTIONS.SYNC_CODE);
                socketRef.current = null;
            }
        };
    }, [roomId, location.state, navigate]);

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success("Room ID copied to clipboard");
        } catch (err) {
            toast.error("Could not copy Room ID");
            console.error(err);
        }
    };

    const leaveRoom = () => {
        navigate("/codecollab");
    };

    if (!location.state) {
        return <Navigate to="/codecollab" />;
    }

    return (
        <div className={`mainWrap ${isEditorFullScreen ? "fullscreen" : ""}`}>
            <div className="aside" style={{ display: isEditorFullScreen ? "none" : "block" }}>
                <div className="asideInner">
                    <h3>Connected Users</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client key={client.socketId} username={client.username} />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn" onClick={copyRoomId}>
                    Copy Editor ID
                </button>
                <button className="btn leaveBtn" onClick={leaveRoom}>
                    Leave
                </button>
            </div>

            <div className={`editorWrap scrollable-content middle-column ${isEditorFullScreen ? "fullscreen" : ""}`}>
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        if (codeRef.current !== code) {
                            codeRef.current = code;
                            socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
                        }
                    }}
                />
                <button className="fullscreen-btn" onClick={() => setIsEditorFullScreen(!isEditorFullScreen)}>
                    {isEditorFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
            </div>

            <div style={{ display: isEditorFullScreen ? "none" : "block" }}>
                <div style={{ height: "40vh", width: "60vh", right: "20px" }}>
                    {selectedTab === "chat" && <Chat socketRef={socketRef} username={location.state?.username} />}
                    {selectedTab === "fileUpload" && <FileUpload socket={socketRef} />}
                    {selectedTab === "chatwithai" && <ChatAI socketRef={socketRef} username={location.state?.username} />}
                    <BottomNavigation onSelectTab={setSelectedTab} selectedTab={selectedTab} />
                </div>
            </div>
        </div>
    );
};

export default CollabEditorPage;






