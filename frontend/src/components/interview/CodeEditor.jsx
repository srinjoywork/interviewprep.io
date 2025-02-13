import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropdown from "./LanguageDropdown";
import Output from "./Output";

function CodeEditor({ socket, roomId }) {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("c");
  const [version, setVersion] = useState("10.2.0");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleEditorChange(newValue) {
    if (newValue !== undefined && newValue !== null) {
      setValue(newValue);
      socket.emit("message", { room: roomId, data: newValue });
    }
  }

  useEffect(() => {
    const handleReceiveMessage = (data) => setValue(data);
    const handleReceiveLanguage = ({ language, version }) => {
      setLanguage(language);
      setVersion(version);
    };

    socket.on("recieve-message", handleReceiveMessage);
    socket.on("recieve-language", handleReceiveLanguage);
    socket.on("welcome", (message) => console.log(message));

    return () => {
      socket.off("recieve-message", handleReceiveMessage);
      socket.off("recieve-language", handleReceiveLanguage);
      socket.off("welcome");
    };
  }, [socket, roomId]);

  return (
    <div className="flex mt-10 gap-4 px-10">
      <div>
        <div className="flex items-center gap-4 px-4 mt-3">
          <p className="text-xl font-semibold text-white">Language:</p>
          <LanguageDropdown
            langSetter={setLanguage}
            verSetter={setVersion}
            socket={socket}
            lang={language}
            ver={version}
            roomId={roomId}
          />
        </div>
        <Editor
          height="50vh"
          theme="light"
          width="50vw"
          language={language}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          className="my-4"
        />
      </div>
      <Output
        version={version}
        language={language}
        value={value}
        socket={socket}
        roomId={roomId}
      />
    </div>
  );
}

export default CodeEditor;
