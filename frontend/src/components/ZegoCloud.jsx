import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ZegoCloud = () => {
  const location = useLocation();
  const { roomID } = useParams();
  const username = location.state?.username || "Guest";
  const userId = uuidv4();
  const containerRef = useRef(null);

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 1168524820;
      const serverSecret = "d18b10ace5d0b54f8ad64b28fb5f8e2e";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userId,
        username
      );

      const customConfig = {
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: false,
        showTextChat: true,
        showUserList: true,
        maxUsers: 2,
        layout: "Auto",
        showLayoutButton: false,
        scenario: {
          mode: "VideoConference",
          config: {
            role: "Host",
        },
      },
    }

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start the call
      zp.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        sharedLinks: [
          {
            name: "Share link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID,
          },
        ],
        ...customConfig,
      });
    };

    if (containerRef.current) {
      myMeeting();
    }
  }, [roomID, userId, username]);

  return <div ref={containerRef} id="zegocloud" className="h-100" />;
};

export default ZegoCloud;
