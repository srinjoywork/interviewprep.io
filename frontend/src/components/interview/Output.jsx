import React, { useEffect, useState } from "react";

function Output({ language, version, value, socket, roomId }) {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  // Handle Run Code
  const handleRun = async () => {
    try {
      const reqBody = {
        language,
        version,
        files: [{ content: value }],
        stdin: input,
      };

      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      const data = await res.json();
      const result = (data.run?.stdout || "") + (data.run?.stderr || "");

      setOutput(result);
      if (socket) {
        socket.emit("output-change", { room: roomId, data: result });
      }
    } catch (error) {
      console.error("Execution error:", error);
    }
  };

  // Handle Input Change
  function handleChange(event) {
    const newValue = event.target.value;
    setInput(newValue);
    if (socket) {
      socket.emit("input-change", { room: roomId, data: newValue });
    }
  }

  // Handle Socket Events
  useEffect(() => {
    if (!socket) return;

    const receiveInput = (data) => setInput(data);
    const receiveOutput = (data) => setOutput(data);

    socket.on("receive-input", receiveInput);
    socket.on("receive-output", receiveOutput);

    return () => {
      socket.off("receive-input", receiveInput);
      socket.off("receive-output", receiveOutput);
    };
  }, [socket]);

  return (
    <div className="flex flex-col w-full py-4">
      <div>
        <button
          className="text-lg font-semibold text-white bg-blue-500 rounded-xl shadow-xl px-4 py-1"
          onClick={handleRun}
        >
          Run
        </button>
      </div>

      {/* Input Field */}
      <p className="text-lg font-semibold mt-3 text-white">Input</p>
      <textarea
        className="h-full w-full outline-none border-2 border-gray-500 rounded-lg shadow-xl text-semibold p-2"
        value={input}
        onChange={handleChange}
      />

      {/* Output Display */}
      <p className="text-lg font-semibold mt-3 text-white">Output</p>
      <div className="h-full w-full border-2 border-gray-500 rounded-lg shadow-xl text-semibold bg-white p-2">
        {output || "Waiting for output..."}
      </div>
    </div>
  );
}

export default Output;
