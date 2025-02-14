// import React, { Component } from "react";
// import { withRouter } from "../../utils/withRouter"; // Helper to access params in class component
// import EditorComponent from "../../components/EditorInterview/EditorComponent";
// import axios from "axios";
// import ReconnectingWebSocket from "reconnecting-websocket";
// import shareDB from "sharedb/lib/client";
// import StringBinding from "../../EditorBinding/StringBinding";
// import Loader from "../../components/InterviewLoader/Loading";
// import { notification } from "antd";

// const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
// const websocketURL = process.env.REACT_APP_WEB_SOCKET_URL || "ws://localhost:8080";

// class InterviewEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       code: "",
//       input: "",
//       output: "",
//       lang: "cpp",
//       editor: null,
//       monaco: null,
//       binding: null,
//       videoChat: false,
//       runCodeDisabled: false,
//       isLoading: true,
//     };
//   }

//   componentDidMount() {
//     const { id } = this.props.params; // Corrected to use `params` from withRouter helper

//     if (!id) {
//       notification.error({ message: "Invalid interview session ID" });
//       return;
//     }

//     axios
//       .post(`${serverURL}/api/interview`, { id })
//       .then((res) => {
//         const rws = new ReconnectingWebSocket(`${websocketURL}/bar`);
//         const connection = new shareDB.Connection(rws);
//         const doc = connection.get("examples", id);

//         doc.subscribe((err) => {
//           if (err) {
//             console.error("Subscription error:", err);
//             notification.error({ message: "Failed to connect to collaboration server" });
//             return;
//           }

//           const presence = connection.getPresence("examples");
//           presence.subscribe((err) => {
//             if (err) console.error("Presence error:", err);
//           });

//           let localPresence = presence.create();
//           let binding = new StringBinding(this, doc, ["content"], localPresence);

//           this.setState({ binding, isLoading: false }, () => console.log("Binding set"));
//           binding.setup(this);
//         });
//       })
//       .catch((err) => {
//         console.error("Axios Error:", err);
//         notification.error({ message: err.response?.data?.error || "Server connection failed" });
//       });
//   }

//   editorDidMount = (editor, monaco) => {
//     console.log("Editor Mounted");
//     editor.focus();
//     editor.getModel().pushEOL(0);

//     let setup = true;
//     editor.onDidChangeCursorSelection((e) => {
//       if (setup) {
//         let pos = editor.getPosition();
//         editor.setSelection(new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column));
//         setup = false;
//         return;
//       }

//       if (this.state.binding?.localPresence) {
//         this.state.binding.localPresence.submit(e.selection, (err) => {
//           if (err) console.error("Presence submission error:", err);
//         });
//       }
//     });

//     this.setState({ editor, monaco });
//   };

//   editorOnChange = (newValue, e) => {
//     if (this.state.binding) {
//       this.state.binding.onInput(newValue, e); // Ensure event 'e' is passed
//       this.setState({ code: newValue });
//     }
//   };
  

//   handleRun = async () => {
//     this.setState({ runCodeDisabled: true });

//     try {
//       const response = await axios.post(`${serverURL}/code/run`, {
//         code: this.state.editor?.getValue(),
//         input: this.state.input,
//         id: this.props.params.id, // Corrected ID reference
//         lang: this.state.editor?.getModel()?.getLanguageId(),
//       });

//       this.setState({ output: response.data.output, runCodeDisabled: false });
//     } catch (err) {
//       console.error("Execution error:", err);
//       notification.error({ message: "Code execution failed!" });
//       this.setState({ runCodeDisabled: false });
//     }
//   };

//   handleInput = (e) => {
//     if (this.state.binding) {
//       this.state.binding._inoutListener(this.state.input, e.target.value, "input");
//       this.setState({ input: e.target.value });
//     }
//   };

//   handleLang = (value) => {
//     if (this.state.binding) {
//       this.state.binding._inoutListener(this.state.lang, value, "lang");
//       this.setState({ lang: value });
//     }
//   };

//   handleVideoChat = () => {
//     this.setState((prevState) => ({ videoChat: !prevState.videoChat }));
//   };

//   render() {
//     const { videoChat, lang, code, input, output, runCodeDisabled, isLoading } = this.state;

//     return (
//       <>
//         {isLoading && <Loader />}
//         <EditorComponent
//           videoChat={videoChat}
//           lang={lang}
//           code={code}
//           input={input}
//           output={output}
//           runCodeDisabled={runCodeDisabled}
//           readOnly={isLoading}
//           handleVideoChat={this.handleVideoChat}
//           editorDidMount={this.editorDidMount}
//           editorOnChange={this.editorOnChange}
//           handleLang={this.handleLang}
//           handleRun={this.handleRun}
//           handleInput={this.handleInput}
//         />
//       </>
//     );
//   }
// }

// export default withRouter(InterviewEditor);
import React, { Component } from "react";
import { withRouter } from "../../utils/withRouter"; // Helper to access params in class component
import EditorComponent from "../../components/EditorInterview/EditorComponent";
import VideoChatComponent from "../../components/VideoChat/videoChatComponent"; // Importing VideoChatComponent
import axios from "axios";
import ReconnectingWebSocket from "reconnecting-websocket";
import shareDB from "sharedb/lib/client";
import StringBinding from "../../EditorBinding/StringBinding";
import Loader from "../../components/InterviewLoader/Loading";
import { notification } from "antd";


const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
const websocketURL = process.env.REACT_APP_WEB_SOCKET_URL || "ws://localhost:8080";

class InterviewEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      input: "",
      output: "",
      lang: "cpp",
      editor: null,
      monaco: null,
      binding: null,
      videoChat: false,
      runCodeDisabled: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.params; // Corrected to use `params` from withRouter helper

    if (!id) {
      notification.error({ message: "Invalid interview session ID" });
      return;
    }

    axios
      .post(`${serverURL}/api/interview`, { id })
      .then((res) => {
        const rws = new ReconnectingWebSocket(`${websocketURL}/bar`);
        const connection = new shareDB.Connection(rws);
        const doc = connection.get("examples", id);

        doc.subscribe((err) => {
          if (err) {
            console.error("Subscription error:", err);
            notification.error({ message: "Failed to connect to collaboration server" });
            return;
          }

          const presence = connection.getPresence("examples");
          presence.subscribe((err) => {
            if (err) console.error("Presence error:", err);
          });

          let localPresence = presence.create();
          let binding = new StringBinding(this, doc, ["content"], localPresence);

          this.setState({ binding, isLoading: false }, () => console.log("Binding set"));
          binding.setup(this);
        });
      })
      .catch((err) => {
        console.error("Axios Error:", err);
        notification.error({ message: err.response?.data?.error || "Server connection failed" });
      });
  }

  editorDidMount = (editor, monaco) => {
    console.log("Editor Mounted");
    editor.focus();
    editor.getModel().pushEOL(0);

    let setup = true;
    editor.onDidChangeCursorSelection((e) => {
      if (setup) {
        let pos = editor.getPosition();
        editor.setSelection(new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column));
        setup = false;
        return;
      }

      if (this.state.binding?.localPresence) {
        this.state.binding.localPresence.submit(e.selection, (err) => {
          if (err) console.error("Presence submission error:", err);
        });
      }
    });

    this.setState({ editor, monaco });
  };

  editorOnChange = (newValue, e) => {
    if (this.state.binding) {
      this.state.binding.onInput(newValue, e); // Ensure event 'e' is passed
      this.setState({ code: newValue });
    }
  };

  handleRun = async () => {
    this.setState({ runCodeDisabled: true });

    try {
      const response = await axios.post(`${serverURL}/code/run`, {
        code: this.state.editor?.getValue(),
        input: this.state.input,
        id: this.props.params.id, // Corrected ID reference
        lang: this.state.editor?.getModel()?.getLanguageId(),
      });

      this.setState({ output: response.data.output, runCodeDisabled: false });
    } catch (err) {
      console.error("Execution error:", err);
      notification.error({ message: "Code execution failed!" });
      this.setState({ runCodeDisabled: false });
    }
  };

  handleInput = (e) => {
    if (this.state.binding) {
      this.state.binding._inoutListener(this.state.input, e.target.value, "input");
      this.setState({ input: e.target.value });
    }
  };

  handleLang = (value) => {
    if (this.state.binding) {
      this.state.binding._inoutListener(this.state.lang, value, "lang");
      this.setState({ lang: value });
    }
  };

  handleVideoChat = () => {
    this.setState((prevState) => ({ videoChat: !prevState.videoChat }));
  };

  render() {
    const { videoChat, lang, code, input, output, runCodeDisabled, isLoading } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        <EditorComponent
          videoChat={videoChat}
          lang={lang}
          code={code}
          input={input}
          output={output}
          runCodeDisabled={runCodeDisabled}
          readOnly={isLoading}
          handleVideoChat={this.handleVideoChat}
          editorDidMount={this.editorDidMount}
          editorOnChange={this.editorOnChange}
          handleLang={this.handleLang}
          handleRun={this.handleRun}
          handleInput={this.handleInput}
        />
        

      </>
    );
  }
}

export default withRouter(InterviewEditor);
