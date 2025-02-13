import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Notepad({ socket, roomId }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!socket) return;

    const receiveText = (data) => {
      setValue((prev) => (prev !== data ? data : prev));
    };

    socket.on("receive-text", receiveText);

    return () => {
      socket.off("receive-text", receiveText);
    };
  }, [socket, roomId]);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (socket) {
      socket.emit("text-change", { room: roomId, data: newValue });
    }
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      className="w-10/12 h-5/6 px-4 text-white"
    />
  );
}

export default Notepad;
