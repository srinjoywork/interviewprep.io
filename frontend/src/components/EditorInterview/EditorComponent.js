import React ,{useCallback , useEffect} from "react";
import MonacoEditor from "react-monaco-editor";
import { Row, Col } from "antd";
import styles from "./main.module.css";
import SideDrawer from "../SideDrawer/SideDrawer";
import VideoChat from "../../pages/MainInterview/VideoChat";

const EditorComponent = ({
  videoChat,
  lang,
  code,
  input,
  output,
  runCodeDisabled,
  videoSocket,
  readOnly,
  handleVideoChat,
  editorOnChange,
  handleLang,
  handleRun,
  handleInput,
  handleVideoSocket,
}) => {
  const options = {
    selectOnLineNumbers: true,
    minimap: { enabled: false },
    readOnly,
  };

  const handleEditorMount = useCallback((editor, monaco) => {
    console.log("Monaco Editor Mounted");
  }, []);

  useEffect(() => {
    console.log("EditorComponent Mounted");
  }, []);

  return (
    <Row gutter={0}>
      <Col lg={20} sm={16}>
        {videoChat && (
          <VideoChat
            videoChat={videoChat}
            videoSocket={videoSocket}
            handleVideoChat={handleVideoChat}
            handleVideoSocket={handleVideoSocket}
          />
        )}
        <div className={styles.editor}>
          <MonacoEditor
            language={lang}
            theme="vs-dark"
            value={code}
            options={options}
            onMount={handleEditorMount}
            onChange={editorOnChange}
          />
        </div>
      </Col>
      <Col lg={4} sm={8}>
        <SideDrawer
          input={input}
          output={output}
          videoChat={videoChat}
          runCodeDisabled={runCodeDisabled}
          lang={lang}
          videoSocket={videoSocket}
          handleLang={handleLang}
          handleRun={handleRun}
          handleInput={handleInput}
          handleVideoChat={handleVideoChat}
        />
      </Col>
    </Row>
  );
};

export default EditorComponent;
