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
    pc: null,
    videoSocket: null,

    peerConnectionInit: (videoSocket) => {
        let pc = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
                {
                    urls: "turn:relay1.expressturn.com:3478",
                    username: "ef482e8b-3f5e-4a5a-b70a-dc5cde88f5b2",
                    credential: "nEhJv8zunA",
                },
            ],
        });

        helper.videoSocket = videoSocket;
        helper.pc = pc;

        // Handle ICE Candidates
        helper.pc.onicecandidate = (event) => {
            if (event.candidate) {
                videoSocket.send(JSON.stringify({ candidate: event.candidate }));
            }
        };

        // Handle Remote Video Stream
        helper.pc.ontrack = (event) => {
            console.log("Receiving remote stream...");
            const remoteVideo = document.getElementById("remoteVideo");
            if (event.streams.length > 0 && remoteVideo) {
                remoteVideo.srcObject = event.streams[0];
            }
        };

        // Handle Connection States
        helper.pc.oniceconnectionstatechange = () => {
            console.log("ICE Connection State:", helper.pc.iceConnectionState);
            if (helper.pc.iceConnectionState === "disconnected") {
                console.log("Restarting ICE...");
                helper.createOffer(true);
            }
        };

        return pc;
    },

    addIceCandidate: (candidate) => {
        if (!helper.pc) return;
        helper.pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
    },

    createOffer: (restart = false) => {
        console.log("Creating WebRTC Offer...");
        helper.pc.createOffer({ iceRestart: restart })
            .then((sdp) => helper.pc.setLocalDescription(sdp))
            .then(() => {
                helper.videoSocket.send(JSON.stringify({ makeOffer: { offer: helper.pc.localDescription } }));
            })
            .catch(console.error);
    },

    createAnswer: () => {
        console.log("Creating WebRTC Answer...");
        helper.pc.createAnswer()
            .then((sdp) => helper.pc.setLocalDescription(sdp))
            .then(() => {
                helper.videoSocket.send(JSON.stringify({ makeAnswer: { answer: helper.pc.localDescription } }));
            })
            .catch(console.error);
    },
};

export default helper;
