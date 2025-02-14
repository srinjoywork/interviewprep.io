// import { notification } from 'antd'
// const helper = {
//     candidates: [],
//     pc: null,
//     videoSocket: null,
//     peerConnectionInit: (videoSocket) => {
//         let pc = new window.RTCPeerConnection({
//             iceServers: [
//                 {
//                     urls: 'stun:stun.l.google.com:19302'
//                 },
//                 {
//                     urls: 'turn:numb.viagenie.ca',
//                     username: 'webrtc@live.com',
//                     credential: 'muazkh'
//                 },
//             ]
//         });
//         helper.videoSocket = videoSocket;
//         helper.pc = pc;
//         helper.pc.onicecandidate = helper.onIceCandidate;
//         helper.pc.oniceconnectionstatechange = helper.onIceConnectionStateChange;
//         return pc;
//     },
//     onIceCandidate: e => {
//         console.log('gathering state: ' + e.target.iceGatheringState);
//         if (e.candidate) {
//             helper.candidates.push(e.candidate);
//         }
//         else {
//             console.log(helper.candidates)
//             helper.videoSocket.send(JSON.stringify({ candidate: helper.candidates }));
//         }
//     },
//     addIceCandidate: candidate => {
//         helper.pc.addIceCandidate(new RTCIceCandidate(candidate));
//     },
//     onIceConnectionStateChange: e => {
//         console.log('connection state: ' + helper.pc.iceConnectionState);
//         if (helper.pc.iceConnectionState === 'disconnected') {
//             if (helper.pc.restartIce) {
//                 console.log('restart')
//                 helper.pc.restartIce();
//             }
//             else {
//                 console.log('offer restart')
//                 helper.createOffer();
//             }
//         }
//     },
//     createOffer: () => {
//         console.log('offer')
//         helper.pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true }).then(sdp => {
//             helper.pc.setLocalDescription(new RTCSessionDescription(sdp)).then(() => {
//                 helper.videoSocket.send(JSON.stringify({ makeOffer: { offer: sdp } }));
//             }).catch(helper.error);
//         }).catch(helper.error);
//     },
//     error: (err) => {
//         console.log('Error', err);
//     },
//     handleLocalMediaStreamError: (error) => {
//         console.log('navigator.getUserMedia error: ', error);
//         notification.error({
//             message: error.toString(),
//             description: 'Please allow access to camera and microphone',
//         })
//     }
// }

// export default helper;

import { notification } from "antd";

const helper = {
    candidates: [],
    pc: null,
    videoSocket: null,

    peerConnectionInit: (videoSocket) => {
        const pc = new window.RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                {
                    urls: "turn:numb.viagenie.ca",
                    username: "webrtc@live.com",
                    credential: "muazkh",
                },
            ],
        });

        helper.videoSocket = videoSocket;
        helper.pc = pc;

        // Event listeners
        helper.pc.onicecandidate = helper.onIceCandidate;
        helper.pc.oniceconnectionstatechange = helper.onIceConnectionStateChange;

        return pc;
    },

    onIceCandidate: (event) => {
        if (event.candidate) {
            console.log("Sending ICE Candidate:", event.candidate);
            helper.videoSocket?.send(JSON.stringify({ candidate: event.candidate }));
        }
    },
    

    addIceCandidate: (candidate) => {
        if (helper.pc) {
            helper.pc.addIceCandidate(new RTCIceCandidate(candidate))
                .catch(error => console.error("Failed to add ICE candidate:", error));
        } else {
            console.warn("PeerConnection is not initialized");
        }
    },

    onIceConnectionStateChange: () => {
        console.log("ICE Connection State:", helper.pc?.iceConnectionState);
        if (helper.pc?.iceConnectionState === "disconnected") {
            console.log("Restarting ICE...");
            helper.pc.createOffer()
                .then((sdp) => helper.pc.setLocalDescription(sdp))
                .then(() => helper.videoSocket.send(JSON.stringify({ makeOffer: { offer: helper.pc.localDescription } })))
                .catch((err) => console.error("ICE Restart Error:", err));
        }
    },
    

    createOffer: () => {
        console.log("Creating Offer...");
        if (!helper.pc || !helper.videoSocket) return;

        helper.pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true })
            .then(sdp => helper.pc.setLocalDescription(new RTCSessionDescription(sdp)))
            .then(() => {
                helper.videoSocket.send(JSON.stringify({ makeOffer: { offer: helper.pc.localDescription } }));
            })
            .catch(helper.error);
    },

    error: (err) => {
        console.error("Error:", err);
    },

    handleLocalMediaStreamError: (error) => {
        console.error("Media Stream Error:", error);
        notification.error({
            message: "Media Access Error",
            description: "Please allow access to your camera and microphone.",
        });
    },
};

export default helper;
