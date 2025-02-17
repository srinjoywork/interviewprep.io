// import { Card } from "../../components/ui/card";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "../../components/ui/resizable";
// import React, { useEffect, useRef, useState } from "react";
// import Avatar from "react-avatar";
// import toast from "react-hot-toast";
// import {
//   Navigate,
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import ACTIONS from "../../Actions";
// import Editor from "../../components/MonacoEditor.jsx";
// import { initSocket } from "../../Interviewsocket";

// import { Button } from "../../components/ui/button.jsx";
// import { Textarea } from "../../components/ui/textarea.jsx";
// import ZegoCloud from "../../components/ZegoCloud.jsx";
// import ClientAvatar from "../../components/ClientAvatar.jsx";
// import { io } from "socket.io-client";

// const EditorPage = () => {
//   const socketRef = useRef(null);
//   const codeRef = useRef(null);
//   const location = useLocation();
//   const reactNavigator = useNavigate();
//   const { roomID } = useParams();
//   const [clients, setClients] = useState([]);
//   const limit = 10
  

//   const [customInput, setCustomInput] = useState("");
//   const [outputValue, setOutputValue] = useState("");

//   const [showZegoCloud, setShowZegoCloud] = useState(false);

//   const handleButtonClick = () => {
//     setShowZegoCloud(true);
//   };

//   const handleOutputValueUpdate = (newOutputValue) => {
//     setOutputValue(newOutputValue);
//   };
//   // useEffect(() => {
//   //   const init = async () => {
//   //     socketRef.current = await initSocket();
//   //     socketRef.current.on("connect_error", (err) => handleErrors(err));
//   //     socketRef.current.on("connect_failed", (err) => handleErrors(err));

//   //     function handleErrors(e) {
//   //       console.log("socket error:", e);
//   //       toast.error("Socket connection failed,try again later.");
//   //       reactNavigator("/");
//   //     }

//   //     socketRef.current.emit(ACTIONS.JOIN, {
//   //       roomID,
//   //       username: location.state?.username,
//   //     });

//   //     // Listening to JOINED Event
//   //     socketRef.current.on(
//   //       ACTIONS.JOINED,
//   //       ({ clients, username, socketId }) => {
//   //         console.log("Action Joined");
//   //         console.log({ clients, username, socketId });
//   //         if (
//   //           username !== location.state?.username &&
//   //           username !== "undefined"
//   //         ) {
//   //           toast.success(`${username} has joined the room.`);
//   //         }
//   //         setClients(clients);
//   //         socketRef.current.emit(ACTIONS.SYNC_CODE, {
//   //           code: codeRef.current,
//   //           socketId,
//   //         });
//   //       }
//   //     );

//   //     // Listening for DISCONNECTED Event
//   //     socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
//   //       console.log("Action Disconnected");
//   //       console.log({ socketId, username });
//   //       toast.error(`${username} left the room.`);
//   //       setClients((prev) => {
//   //         return prev.filter((client) => client.socketId !== socketId);
//   //       });
//   //     });
//   //   };

//   //   init();
//   //   return () => {
//   //     socketRef.current.off(ACTIONS.JOINED);
//   //     socketRef.current.off(ACTIONS.DISCONNECTED);
//   //     socketRef.current.disconnect();
//   //   };
//   // }, []);
//   useEffect(() => {
//     const initSocket = async () => {
//       try {
//         socketRef.current = io("https://interviewroombackend.onrender.com");
  
//         socketRef.current.on("connect", () => {
//           console.log("Connected to socket server");
//         });
  
//         socketRef.current.on("connect_error", (err) => {
//           console.error("Connection error:", err.message);
//           toast.error("Socket connection failed, try again later.");
//           reactNavigator("/interviewhome");
//         });
  
//         socketRef.current.on("disconnect", (reason) => {
//           console.warn(`Disconnected: ${reason}`);
//           if (reason === "io server disconnect") {
//             // The server disconnected us, attempt to reconnect
//             socketRef.current.connect();
//           }
//         });
  
//         // Join the room
//         socketRef.current.emit(ACTIONS.JOIN, {
//           roomID,
//           username: location.state?.username,
//         });
  
//         // Handle joined event
//         socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
//           if (username !== location.state?.username) {
//             toast.success(`${username} has joined the room.`);
//           }
//           setClients(clients);
//           socketRef.current.emit(ACTIONS.SYNC_CODE, {
//             code: codeRef.current,
//             socketId,
//           });
//         });
  
//         // Handle disconnected event
//         socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
//           toast.error(`${username} left the room.`);
//           setClients((prev) => prev.filter((client) => client.socketId !== socketId));
//         });
//       } catch (error) {
//         console.error("Socket initialization failed:", error);
//         toast.error("Failed to initialize socket.");
//         reactNavigator("/interviewhome");
//       }
//     };
  
//     initSocket();
  
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.off(ACTIONS.JOINED);
//         socketRef.current.off(ACTIONS.DISCONNECTED);
//         socketRef.current.disconnect();
//       }
//     };
//   }, [roomID, location.state?.username, reactNavigator]);
  



//   async function copyRoomId() {
//     try {
//       await navigator.clipboard.writeText(roomID);
//       toast.success("Room ID has been copied to your clipboard");
//     } catch (err) {
//       toast.error("Could not copy the Room ID");
//       console.error(err);
//     }
//   }

//   function leaveRoom() {
//     reactNavigator("/interviewhome");
//   }

//   // if (!location.state) {
//   //   return <Navigate to="/interviewhome" />;
//   // }

//   return (
//     <>
//       <nav className="flex items-center justify-between">
//         <div className="pl-3 pt-1 flex">
          
//           <div className="flex flex-row ml-3">
//             {clients.slice(0, limit).map((client, index) => (
//               <ClientAvatar
//                 key={client.socketId}
//                 username={client.username}
//                 style={{ zIndex: 10 - index }}
//               />
//             ))}
//             {clients.length > limit && (
//               <div>
//                 <span className="text-lg font-bold">and</span>
//                 <Avatar
//                   name={`${clients.length - limit}`}
//                   size={45}
//                   round="50px"
//                 />
//                 <span className="text-lg font-bold">others</span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex p-2">
//           <Button
//             size="sm"
//             color="warning"
//             onClick={copyRoomId}
//             className="mr-5"
//           >
//             Copy Room ID
//           </Button>
//           <Button size="sm" variant="destructive" ml={2} onClick={leaveRoom}>
//             Leave Room
//           </Button>
//         </div>
//       </nav>
//       {/* Main Page */}
//       <div className="min-h-screen">
//         <ResizablePanelGroup
//           direction="horizontal"
//           className="max-w-full rounded-lg border"
//         >
//           <ResizablePanel defaultSize={50}>
//             <div className="flex w-full items-center justify-center p-1">
//               <Card className="w-full">
//                 <Editor
//                   socketRef={socketRef}
//                   roomID={roomID}
//                   onCodeChange={(code) => {
//                     codeRef.current = code;
//                   }}
//                   customInput={customInput}
//                   setCustomInput={setCustomInput}
//                   outputValue={outputValue}
//                   setOutputValue={handleOutputValueUpdate}
//                 />
//               </Card>
//             </div>
//           </ResizablePanel>
//           <ResizableHandle withHandle />
//           <ResizablePanel defaultSize={50}>
//             <ResizablePanelGroup direction="vertical">
//               <ResizablePanel defaultSize={20}>
//                 <ResizablePanelGroup direction="horizontal">
//                   <ResizablePanel defaultSize={50}>
//                     <div className="flex h-700">
//                       <Textarea
//                         value={customInput}
//                         onChange={(e) => setCustomInput(e.target.value)}
//                         placeholder="Input goes here"
//                         rows="13"
//                       />
//                     </div>
//                   </ResizablePanel>
//                   <ResizablePanel defaultSize={50}>
//                     <div className="flex h-700">
//                       <Textarea
//                         value={outputValue}
//                         readOnly
//                         placeholder="Output goes here"
//                         rows="13"
//                       />
//                     </div>
//                   </ResizablePanel>
//                 </ResizablePanelGroup>
//               </ResizablePanel>
//               <ResizableHandle withHandle />
//               <ResizablePanel defaultSize={80}>
//                 <div className="flex items-center justify-center ">
//                   {showZegoCloud ? (
//                     <div className="w-400 h-400">
//                       <ZegoCloud />
//                     </div>
//                   ) : (
//                     <Button
//                       onClick={handleButtonClick}
//                       className="flex items-center justify-center "
//                     >
//                       Enable Video Call
//                     </Button>
//                   )}
//                 </div>
//               </ResizablePanel>
//             </ResizablePanelGroup>
//           </ResizablePanel>
//         </ResizablePanelGroup>
//       </div>
//     </>
//   );
// };

// export default EditorPage;
import { Card } from "../../components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ACTIONS from "../../Actions";
import Editor from "../../components/MonacoEditor.jsx";
import { io } from "socket.io-client";
import { Button } from "../../components/ui/button.jsx";
import { Textarea } from "../../components/ui/textarea.jsx";
import ZegoCloud from "../../components/ZegoCloud.jsx";
import ClientAvatar from "../../components/ClientAvatar.jsx";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomID } = useParams();
  const [clients, setClients] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [showZegoCloud, setShowZegoCloud] = useState(false);
  const limit = 10;

  useEffect(() => {
    const enterFullScreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch (err) {
        console.error("Error enabling full-screen mode:", err);
      }
    };
  
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        leaveRoom(); // Automatically leave the room when exiting full screen
      }
    };
  
    enterFullScreen();
  
    // Listen for full-screen exit event
    document.addEventListener("fullscreenchange", handleFullScreenChange);
  
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);
  

  useEffect(() => {
    const initSocket = async () => {
      try {
        socketRef.current = io("https://interviewroombackend.onrender.com");

        socketRef.current.on("connect", () => {
          console.log("Connected to socket server");
        });

        socketRef.current.on("connect_error", (err) => {
          console.error("Connection error:", err.message);
          toast.error("Socket connection failed, try again later.");
          reactNavigator("/interviewhome");
        });

        socketRef.current.on("disconnect", (reason) => {
          console.warn(`Disconnected: ${reason}`);
          if (reason === "io server disconnect") {
            socketRef.current.connect();
          }
        });

        socketRef.current.emit(ACTIONS.JOIN, {
          roomID,
          username: location.state?.username,
        });

        socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} has joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        });

        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.error(`${username} left the room.`);
          setClients((prev) => prev.filter((client) => client.socketId !== socketId));
        });
      } catch (error) {
        console.error("Socket initialization failed:", error);
        toast.error("Failed to initialize socket.");
        reactNavigator("/interviewhome");
      }
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.disconnect();
      }
    };
  }, [roomID, location.state?.username, reactNavigator]);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomID);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/interviewhome");
  }

  return (
    <>
      <nav className="flex items-center justify-between">
        <div className="pl-3 pt-1 flex">
          <div className="flex flex-row ml-3">
            {clients.slice(0, limit).map((client, index) => (
              <ClientAvatar key={client.socketId} username={client.username} />
            ))}
            {clients.length > limit && (
              <div>
                <span className="text-lg font-bold">and</span>
                <Avatar name={`${clients.length - limit}`} size={45} round="50px" />
                <span className="text-lg font-bold">others</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex p-2">
          <Button size="sm" color="warning" onClick={copyRoomId} className="mr-5">
            Copy Room ID
          </Button>
          <Button size="sm" variant="destructive" ml={2} onClick={leaveRoom}>
            Leave Room
          </Button>
        </div>
      </nav>

      {/* Main Page */}
      <div className="min-h-screen">
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border">
          <ResizablePanel defaultSize={50}>
            <div className="flex w-full items-center justify-center p-1">
              <Card className="w-full">
                <Editor
                  socketRef={socketRef}
                  roomID={roomID}
                  onCodeChange={(code) => {
                    codeRef.current = code;
                  }}
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                  outputValue={outputValue}
                  setOutputValue={setOutputValue}
                />
              </Card>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={20}>
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-700">
                      <Textarea
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Input goes here"
                        rows="13"
                      />
                    </div>
                  </ResizablePanel>
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-700">
                      <Textarea value={outputValue} readOnly placeholder="Output goes here" rows="13" />
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={80}>
                <div className="flex items-center justify-center ">
                  {showZegoCloud ? (
                    <div className="w-400 h-400">
                      <ZegoCloud />
                    </div>
                  ) : (
                    <Button onClick={() => setShowZegoCloud(true)} className="flex items-center justify-center ">
                      Enable Video Call
                    </Button>
                  )}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default EditorPage;
