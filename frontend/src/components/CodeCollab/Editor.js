import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/dracula.css";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/selection/active-line";
import "codemirror/mode/meta";
import "codemirror/theme/material.css";
import ACTIONS from "../../Actions";
import "codemirror/theme/material.css";
import "codemirror/mode/clike/clike";
import CodeEditorWindow from "./CodeEditorWindow";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(45);
  const [input, setInput] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);
  // useEffect(() => {
  //   async function fetchLanguages() {
  //     try {
  //       const response = await axios.get("http://localhost:8000/judge/getlang");
  //       setLanguages(response.data);
  //     } catch (error) {
  //       console.error("Error fetching languages:", error);
  //     }
  //   }
  //   fetchLanguages();
  // }, []);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: "python",
          theme: "material",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true,
          matchTags: true,
          lineWrapping: true,
          indentUnit: 4,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
            if (code !== null) {
                editorRef.current.setValue(code);
            }
        });
    }

    return () => {
        if (socketRef.current) { // ✅ Check if socketRef.current exists before calling .off()
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        }
    };
}, [socketRef]); // ✅ Updated dependency to `socketRef`


  function saveFile() {
    // your CodeMirror textarea ID

    var textToWrite = editorRef.current.getValue();

    // preserving line breaks
    var textToWrite = textToWrite.replace(/\n/g, "\r\n");

    var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
    var fileName = document.getElementById("filename").value;
    // filename to save as
    var fileNameToSaveAs = fileName;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;

    // hidden link title name
    downloadLink.innerHTML = "LINKTITLE";

    window.URL = window.URL || window.webkitURL;

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  function destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }

  const handleFileUpload = (event) => {
    const fileInput = event.target;
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        editorRef.current.setValue(fileContent); // Set the file content in CodeMirror
      };

      reader.readAsText(selectedFile);
    }
    insertText(" ");
    triggerButtonClick("Enter");
  };

  const insertText = (text) => {
    if (editorRef.current) {
      editorRef.current.replaceSelection(text);
    }
  };
  function triggerButtonClick(buttonId) {
    const button = document.getElementById(buttonId);

    if (button) {
      button.click(); // Simulate a button click
    } else {
      console.error(`Button with ID "${buttonId}" not found.`);
    }
  }
  // const executeCode = async () => {
  //   try {
  //     const code = editorRef.current.getValue();
  //     const languageId = selectedLanguage; // Assuming selectedLanguage is the ID of the selected language
  //     const input = document.getElementById("inputArea").value;
  //     const response = await fetch("http://localhost:8000/judge/execute", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ code, languageId, input }),
  //     });
  //     const resData = await response.json();
  //     // console.log(atob(resData.output.stdout));
  //     console.log(resData);
  //     let output = "";
  //     if (resData.output.stderr) {
  //       // If stderr is present, display the error message
  //       output = atob(resData.output.stderr);
  //     } else if (resData.output.stdout) {
  //       // Otherwise, display the standard output
  //       output = atob(resData.output.stdout);
  //     } else {
  //       output = resData.output.status.description;
  //     }
  //     document.getElementById("outputArea").value = output;
  //   } catch (error) {
  //     console.error("Error executing code:", error);
  //   }
  // };
  return (
    <div
      style={{
        height: "calc(100vh - 60px)", // Adjusted height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <input
          style={{ marginTop: "10px", marginBottom: "10px" }}
          type="file"
          id="fileInput"
          className="inputBox"
          onChange={handleFileUpload}
          accept=".js, .txt, .html, .java, .cpp, .c, .py" // Specify the allowed file types
        />
      </div>
      {/* <div className="CodeMirror ">
        <textarea id="realtimeEditor"></textarea>
      </div> */}
      <div className="CodeMirror" style={{width: '95%'}}>
        <textarea id="realtimeEditor"></textarea>
      </div>
     
      <div style={{ marginBottom: "10px" }}>
        <input
          id="filename"
          type="text"
          className="inputBox"
          placeholder="Specify a filename"
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            marginBottom: "10px",
          }}
        >
          <button className="btn" onClick={saveFile}>
            Save File
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;