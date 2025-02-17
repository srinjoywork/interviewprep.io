// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import toast, { Toaster } from "react-hot-toast";
// import Logo from "../../components/Logo";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { useNavigate } from "react-router-dom";

// const InterviewHome = () => {
//   const navigate = useNavigate();
//   const [roomid, setRoomId] = useState("");
//   const [username, setUsername] = useState("");

//   const createNewRoom = (e) => {
//     e.preventDefault();
//     const id = uuidv4();
//     setRoomId(id);
//     toast.success("Room Created Successfully");
//   };

//   const joinRoom = (e) => {
//     if (!roomid || !username) {
//       toast.error("RoomID and username are required.");
//       return;
//     }
//     console.log("Username",username)
//     // On success: Redirect to Editor
//     navigate(`/editor-room/${roomid}`, {
//       state: {
//         username,
//       },
//     });
//   };

//   const handleInputEnter = (e) => {
//     if (e.keyCode === 13) {
//       joinRoom();
//     }
//   };

//   return (
//     <>
//       <div className="bg-zinc-300 w-full h-screen flex items-center justify-center text-white">
//         <div className="bg-zinc-900 rounded-lg p-5 w-full max-w-xl">
//           {" "}
//           <Logo />
//           <Label className="text-xl flex items-center justify-center">
//             Join the Room
//           </Label>
//           <h4 className="mb-3 mt-0 font-semibold">Paste Invitation RoomID</h4>
//           <div className="flex flex-col mb-3.5 font-semibold text-xl">
//             <Input
//               placeholder="ROOM ID"
//               value={roomid}
//               onChange={(e) => {
//                 setRoomId(e.target.value);
//               }}
//               onKeyUp={handleInputEnter}
//               className="mb-2 text-black" // Remove width here to allow input to stretch
//             />

//             <Input
//               placeholder="USERNAME"
//               onChange={(e) => {
//                 setUsername(e.target.value);
//               }}
//               value={username}
//               onKeyUp={handleInputEnter}
//               className="mb-2 text-black" // Remove width here to allow input to stretch
//             />
//             <div className="flex justify-between">
//               <Button onClick={joinRoom} variant="secondary">
//                 JOIN
//               </Button>
//               <Button
//                 onClick={createNewRoom}
//                 className="bg-green-700 hover:bg-green-800 ml-10"
//               >
//                 Create New Room
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//       </div>
//       <footer>
//         <h4 className="m-5">Building with 💗</h4>
//       </footer>
//     </>
//   );
// };

// export default InterviewHome;

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import Logo from "../../components/Logo";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router-dom";
import isAuth from "libs/isAuth";
import { userType } from "libs/isAuth";

const InterviewHome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomid: "",
    username: "",
    recipientEmail: "",
    interviewerEmail: "",
    socketId: "",
    emailSubject: "",
    emailText: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setFormData((prev) => ({ ...prev, roomid: id }));
    toast.success("Room Created Successfully");
  };

  const joinRoom = () => {
    if (!formData.roomid || !formData.username) {
      toast.error("RoomID and username are required.");
      return;
    }
    navigate(`/editor-room/${formData.roomid}`, {
      state: { username: formData.username },
    });
  };

  const handleInputEnter = (e) => {
    if (e.keyCode === 13) {
      joinRoom();
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const { recipientEmail, interviewerEmail, emailSubject, emailText, roomid, socketId } = formData;
    if (!recipientEmail || !emailSubject || !emailText) {
      toast.error("All fields are required to send an email.");
      return;
    }

    const emailParams = {
      recipient_email: recipientEmail,
      interviewer_email: interviewerEmail || "codehirex@example.com",
      subject: emailSubject,
      message: emailText,
      roomid:`${roomid}`,
      room_link: `${window.location.origin}/join-interview`,
      socket_id: socketId,
    };

    emailjs.send("service_0gvdb1p", "template_s0b0lfg", emailParams, "vqirMPC_gbxjPA2q5")
      .then((response) => {
        toast.success("Email Sent Successfully!");
        console.log("Email sent:", response);
      })
      .catch((error) => {
        toast.error("Failed to send email.");
        console.error("Email send error:", error);
      });
  };

  return (
    <>
  <div className="bg-gradient-to-br from-[#191714] to-[#2234AE] w-full h-screen flex items-center justify-center text-white pt-16 pb-16">
    <div className="bg-gradient-to-r from-[#b0e0e6] to-[#4682b4] rounded-lg p-3 w-full max-w-[350px] max-h-[600px] mx-auto overflow-hidden">
      {/* <Logo /> */}
      <Label className="text-lg flex items-center justify-center">Join the Room</Label>
      <h4 className="mb-3 mt-0 font-semibold flex items-center justify-center text-sm">Paste Invitation Room ID</h4>

      <div className="flex flex-col mb-3 font-semibold text-lg">
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              {[
                { name: "roomid", placeholder: "ROOM ID" },
                { name: "username", placeholder: "USERNAME" },
                { name: "recipientEmail", placeholder: "Recipient Email (Student)" },
                { name: "socketId", placeholder: "Socket.io ID" },
                { name: "emailSubject", placeholder: "Email Subject" }
              ].map((input) => (
                <Input
                  key={input.name}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={formData[input.name]}
                  onChange={handleChange}
                  onKeyUp={handleInputEnter}
                  className="mb-2 text-black text-sm"
                />
              ))}
              <textarea
                name="emailText"
                placeholder="Email Text"
                value={formData.emailText}
                onChange={handleChange}
                className="mb-2 text-black p-2 rounded-md h-20 text-sm"
              />
              <div className="flex justify-between mt-3">
                <Button onClick={joinRoom} variant="secondary" className="text-sm bg-yellow-300 text-black hover:bg-pink-800 hover:text-white ">JOIN</Button>
                <Button onClick={createNewRoom} className="bg-yellow-300 text-black hover:bg-pink-800 hover:text-white ml-2 text-sm">Create New Room</Button>
              </div>

              <Button onClick={sendEmail} className="bg-green-600 hover:bg-pink-700 mt-4 w-full text-sm">Send Email Invitation</Button>
            </>
          ) : (
            <>
              {[
                { name: "roomid", placeholder: "ROOM ID" },
                { name: "username", placeholder: "USERNAME" }
              ].map((input) => (
                <Input
                  key={input.name}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={formData[input.name]}
                  onChange={handleChange}
                  onKeyUp={handleInputEnter}
                  className="mb-2 text-black text-sm"
                />
              ))}
              <div className="flex justify-between mt-3">
                <Button onClick={joinRoom} variant="secondary" className="text-sm bg-yellow-300 text-black hover:bg-pink-800 hover:text-white ">JOIN</Button>
                <Button onClick={createNewRoom} className="bg-yellow-300 text-black hover:bg-pink-800 hover:text-white ml-2 text-sm">Create New Room</Button>
              </div>
            </>
          )
        ) : null}
      </div>
    </div>
  </div>

  {/* <footer>
    <h4 className="m-5">Building with 💗</h4>
  </footer> */}
  <Toaster />
</>


  );
};

export default InterviewHome;