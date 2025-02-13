import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { DataContext } from "../../context/DataProvider";
import Notepad from "./Notepad";
import CodeEditor from "./CodeEditor";
import { useNavigate } from "react-router-dom";

function AudioVideoScreen() {
  const { roomId, peerInstance, status, socket } = useContext(DataContext);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const currentStream = useRef(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const navigate = useNavigate();

  const leaveRoom = () => {
    if (peerInstance.current) {
      peerInstance.current.destroy();
      peerInstance.current = null;
    }
    if (currentStream.current) {
      currentStream.current.getTracks().forEach(track => track.stop());
    }
    socket.emit("leaveRoom", roomId);
    navigate("/interview-home");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.emit("joinRoom", roomId);

    if (!peerInstance.current) {
      peerInstance.current = new Peer();
    }

    peerInstance.current.on("open", (id) => {
      console.log("Peer connected with ID:", id);
    });

    peerInstance.current.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentStream.current = mediaStream;
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = mediaStream;
          }
          call.answer(mediaStream);
          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        })
        .catch((err) => {
          console.error("Failed to get local stream", err);
        });
    });

    peerInstance.current.on("error", (err) => {
      console.error("Peer error:", err);
    });

    if (status === "interviewee") {
      setTimeout(() => {
        call(roomId);
      }, 2000);
    }

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
        peerInstance.current = null;
      }
      if (currentStream.current) {
        currentStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomId, status]);

  const call = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentStream.current = mediaStream;
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
        }
        const call = peerInstance.current.call(remotePeerId, mediaStream);
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      })
      .catch((err) => {
        console.error("Failed to get local stream", err);
      });
  };

  const toggleAudio = () => {
    if (currentStream.current) {
      currentStream.current.getAudioTracks().forEach(track => track.enabled = !isAudioEnabled);
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (currentStream.current) {
      currentStream.current.getVideoTracks().forEach(track => track.enabled = !isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  return (
    <>
      <div className="flex w-full justify-between h-2/6 items-center px-12">
        <div className="w-4/12">
          <video ref={currentUserVideoRef} autoPlay playsInline className="rounded-xl shadow-xl" />
          <div className="flex justify-center mt-2">
            <button onClick={toggleAudio} className="px-4 py-2 bg-blue-500 text-white rounded mx-2">
              {isAudioEnabled ? "Mute" : "Unmute"}
            </button>
            <button onClick={toggleVideo} className="px-4 py-2 bg-blue-500 text-white rounded mx-2">
              {isVideoEnabled ? "Turn Video Off" : "Turn Video On"}
            </button>
          </div>
        </div>
        <Notepad socket={socket} roomId={roomId} />
        <div className="w-4/12">
          <video ref={remoteVideoRef} autoPlay playsInline className="rounded-xl shadow-xl" />
        </div>
      </div>
      <div>
        <CodeEditor socket={socket} roomId={roomId} />
      </div>
      <button 
        onClick={leaveRoom}
        className="fixed bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded">
        Leave Room
      </button>
    </>
  );
}

export default AudioVideoScreen;
