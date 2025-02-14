import React, { useRef, useState, useEffect } from "react";
import styles from "./main.module.css";
import { Row, Col } from "antd";

const VideoChatComponent = ({ peerConnection, peerConnected, toggleVideo, toggleAudio, createOffer, connecting }) => {
  const remoteRef = useRef(null);
  const localRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [position, setPosition] = useState({ x: 20, y: 20 });

  // 🚀 Request Camera & Microphone Permission
  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        if (localRef.current) {
          localRef.current.srcObject = stream;
        }
        setMediaStream(stream);

        // ✅ Add local stream to peer connection if available
        if (peerConnection) {
          stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        alert("Please allow camera and microphone access!");
      }
    }
    getMedia();
  }, [peerConnection]);

  // 🚀 Handle Incoming Remote Stream
  useEffect(() => {
    if (!peerConnection) return;

    peerConnection.ontrack = (event) => {
      console.log("Received remote stream:", event.streams[0]);

      if (remoteRef.current && event.streams.length > 0) {
        remoteRef.current.srcObject = event.streams[0]; // ✅ Correctly assign the remote stream
      }
    };
  }, [peerConnection]);

  // 🚀 Dragging functionality
  useEffect(() => {
    const videoContainer = videoContainerRef.current;
    if (!videoContainer) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX - 50, y: e.clientY - 50 });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = () => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    videoContainer.addEventListener("mousedown", handleMouseDown);

    return () => {
      videoContainer.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={videoContainerRef}
      className={styles.outer}
      style={{ top: `${position.y}px`, left: `${position.x}px`, position: "absolute", cursor: "grab" }}
    >
      <div className={styles.remote}>
        {/* Remote Video */}
        <video className={styles.remoteVideo} ref={remoteRef} autoPlay playsInline></video>

        {/* Connecting Overlay */}
        {connecting && (
          <div className={styles.overlay}>
            <h2>Connecting...</h2>
          </div>
        )}

        {/* Local Video (Floating) */}
        <div className={styles.local}>
          <video className={styles.localVideo} ref={localRef} autoPlay muted playsInline></video>
        </div>

        {/* Controls (Only when connected) */}
        {peerConnected && (
          <div className={styles.controls}>
            <Row>
              <Col span={12}>
                <button onClick={toggleVideo}>
                  <img src="https://img.icons8.com/metro/26/000000/video-call.png" alt="Toggle Video" />
                </button>
              </Col>
              <Col span={12}>
                <button onClick={toggleAudio}>
                  <img src="https://img.icons8.com/ios-glyphs/26/000000/microphone.png" alt="Toggle Audio" />
                </button>
              </Col>
            </Row>
          </div>
        )}

        {/* Start Button (Only if no peer is connected) */}
        {!peerConnected && (
          <div className={styles.connect}>
            <button className="btn_primary" onClick={createOffer}>
              Start Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChatComponent;
