import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import heroGif from "../../assets/job-interview.gif";
import textEditorImg from "../../assets/Text Editor.png";
import codeEditorImg from "../../assets/code editor.png";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import InputModal from "../../components/interview/InputModal";
import PopupModal from "../../components/interview/PopupModal";

function InterviewHome() {
  const { user } = useContext(DataContext);

  const navigate = useNavigate();
  return (
    <>
      {/* <div className="flex p-4 bg-blue-400 justify-between items-center shadow-xl">
        <div className="text-4xl font-bold text-white">MockInt</div>
        <div className="flex w-3/12 justify-around items-center">
          <p className="text-2xl font-semibold text-white">Home</p>
          <p className="text-2xl font-semibold text-white">Features</p>
        </div>
      </div> */}
      <div className="flex h-full w-full p-24 justify-around shadow-xl">
        <div className="w-1/2 flex flex-col justify-center gap-4">
          <p className="text-7xl font-bold">
            Ace Your Interviews with Confidence
          </p>
          <p className="text-3xl font-semibold my-4">
            Practice with real-time feedback and collaboration tools
          </p>
          <div className="flex gap-8">
              <PopupModal />
              <InputModal />
            </div>
        </div>
        
        <div className="w-2/12">
          <img src={heroGif} alt="Interview GIF" />
        </div>
      </div>

      <div className="p-24 flex flex-col items-center">
        <div className="w-fit mx-auto border-b-4 border-blue-400 p-2 text-5xl font-semibold">
          Our Features
        </div>
        <div className="flex flex-row-reverse items-center justify-between p-12">
          <p className="text-3xl w-1/2">
            <strong>Audio and Video Calls: </strong>Communicate seamlessly with
            crystal-clear audio and video.
          </p>
          <img
            src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*NLSe2SyjfxdbEqFsOWHhlg.png"
            className="w-4/12 rounded-md shadow-xl"
            alt=""
          />
        </div>

        <div className="flex items-center justify-between p-12">
          <p className="text-3xl w-1/2">
            <strong>Collaborative Code Editor: </strong>Code together in
            real-time with syntax highlighting and autocompletion.
          </p>
          <img
            src={codeEditorImg}
            className="w-4/12 rounded-md shadow-xl"
            alt=""
          />
        </div>

        <div className="flex flex-row-reverse items-center justify-between p-12">
          <p className="text-3xl w-1/2 text-end">
            <strong>Text Editor: </strong>Take notes and plan your solutions
            with our integrated text editor.
          </p>
          <img
            src={textEditorImg}
            className="w-4/12 rounded-md shadow-xl"
            alt=""
          />
        </div>
      </div>

      

      
    </>
  );
}

export default InterviewHome;
