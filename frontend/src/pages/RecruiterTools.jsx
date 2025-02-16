import React from "react";
import { useNavigate } from "react-router-dom";
// import robot from "assets/robot.jpg";
// import resumeImage from "assets/resume.jpg";
import RecruiterToolLeft from "../components/RecruiterTools/RecruiterToolLeft/RecruiterToolLeft"
import RecruiterToolRight from "../components/RecruiterTools/RecruiterToolRight/RecruiterToolRight"
import Resume_Summarizer from "../assets/resumesummary.png"
import notedigitizer from "../assets/notedigitizer.png"
import questiongenai from "../assets/questiongenai.png"



const RecruiterTools = () => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="conatiner" style={{ width: "100%",
      height: "110%",
    //  marginBottom: "20px", // Added margin bottom
      paddingBottom:"40px",
      background: "linear-gradient(135deg, #0A192F, #004D40)", // Deep blue to green gradient
      backgroundImage: "radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0)",
      backgroundPosition: "-5px -5px"}}>

    
      {/* Resume Summarizer */}
      <RecruiterToolLeft redirectLink={"/ai"}  title={"Resume Summarizer"} desc={"An AI-powered tool that extracts key details from resumes, providing concise summaries of candidates' skills, experience, and qualifications to streamline the recruitment process"} img={Resume_Summarizer}/>

      {/* Note Digitalizer */}
      <RecruiterToolRight redirectLink={"/ai"} title={"Note Digitalizer"} desc={"a smart tool that converts handwritten or typed notes into digital format, making them easily searchable, editable, and shareable. It enhances productivity by organizing notes efficiently"} img={notedigitizer}/>

      {/* AI Question Generator */}
      <RecruiterToolLeft redirectLink={"/ai"} title={"Question Generator"} desc={"an AI-powered tool that creates relevant and diverse questions based on given topics or content. It helps in exam preparation, interviews, and quizzes by generating insightful and structured questions efficiently."} img={questiongenai}/>

      {/* AI Voice Section */}
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(255, 165, 0, 0.5)",
            transition: "box-shadow 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0px 0px 20px rgba(255, 165, 0, 0.8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              "0px 0px 10px rgba(255, 165, 0, 0.5)")
          }
        >
          <h1 style={{ color: "#FF8C00" }}>AI Voice Technology</h1>
          <p style={{ color: "#333" }}>
            AI Voice technology is revolutionizing the way we interact with
            devices. From virtual assistants to voice-controlled applications,
            AI-driven speech processing is enhancing user experience like never
            before.
          </p>
          <button
            onClick={() => handleRedirect("/ai")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#FF8C00",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Explore AI Voice
          </button>
        </div>
        <div style={{ flex: 1, textAlign: "right", paddingLeft: "50px" }}>
          <img
            src={robot}
            alt="AI Voice"
            style={{ maxWidth: "50%", height: "auto", borderRadius: "10px" }}
          />
        </div>
      </div> */}

      {/* Resume Summarizer Section */}
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div style={{ flex: 1, textAlign: "left", paddingRight: "50px" }}>
          <img
            src={resumeImage}
            alt="Resume Summarizer"
            style={{ maxWidth: "50%", height: "auto", borderRadius: "10px" }}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(255, 165, 0, 0.5)",
            transition: "box-shadow 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0px 0px 20px rgba(255, 165, 0, 0.8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              "0px 0px 10px rgba(255, 165, 0, 0.5)")
          }
        >
          <h1 style={{ color: "#FF8C00" }}>Resume Summarizer</h1>
          <p style={{ color: "#333" }}>
            Our AI-powered Resume Summarizer helps you extract key points from
            resumes efficiently. Get a quick overview of candidate
            qualifications with minimal effort.
          </p>
          <button
            onClick={() => handleRedirect("/resume-summarizer")}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#FF8C00",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Try Resume Summarizer
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default RecruiterTools;
