import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterToolLeft from "../components/RecruiterTools/RecruiterToolLeft/RecruiterToolLeft";
import RecruiterToolRight from "../components/RecruiterTools/RecruiterToolRight/RecruiterToolRight";
import Resume_Summarizer from "../assets/resumesummary.png";
import Notedigitizer from "../assets/NoteDigitalization.jpg";
import questiongenai from "../assets/questiongenai.png";
import isAuth from "libs/isAuth";
import { userType } from "libs/isAuth";

const RecruiterTools = () => {
  const navigate = useNavigate();
  const isAuthenticated = isAuth();
  const isRecruiter = userType() === "recruiter";

  // Redirect non-authenticated users to the sign-in page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="conatiner" style={{ width: "100%",
      height: "110%",
    //  marginBottom: "20px", // Added margin bottom
      paddingBottom:"40px",
      background: "linear-gradient(135deg, #0A192F, #004D40)", // Deep blue to green gradient
      backgroundcolor: "radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0)",
      backgroundPosition: "-5px -5px"}}>
      {isRecruiter ? (
        <>
          {/* Resume Summarizer */}
          <RecruiterToolLeft
            redirectLink={"https://code-hire-x-resume-analyzer.onrender.com/"}
            title={"Resume Summarizer"}
            desc={
              "An AI-powered tool that extracts key details from resumes, providing concise summaries of candidates' skills, experience, and qualifications to streamline the recruitment process."
            }
            img={Resume_Summarizer}
          />

          {/* Note Digitalizer */}
          <RecruiterToolRight
            redirectLink={"https://code-hire-x-digiscribe.streamlit.app/"}
            title={"Note Digitalizer"}
            desc={
              "A smart tool that converts handwritten or typed notes into digital format, making them easily searchable, editable, and shareable. It enhances productivity by organizing notes efficiently."
            }
            img={Notedigitizer}
          />

          {/* AI Question Generator */}
          <RecruiterToolLeft
            redirectLink={"https://code-hire-x-question-generator.onrender.com"}
            title={"Question Generator"}
            desc={
              "An AI-powered tool that creates relevant and diverse questions based on given topics or content. It helps in exam preparation, interviews, and quizzes by generating insightful and structured questions efficiently."
            }
            img={questiongenai}
          />
        </>
      ) : (
        <>
        {/* Resume Summarizer */}
        
        <RecruiterToolLeft
            redirectLink={"/sign-in"}
            title={"Resume Summarizer"}
            desc={
              "An AI-powered tool that extracts key details from resumes, providing concise summaries of candidates' skills, experience, and qualifications to streamline the recruitment process."
            }
            img={Resume_Summarizer}
          />

          {/* Note Digitalizer */}
          <RecruiterToolRight
            redirectLink={"/sign-in"}
            title={"Note Digitalizer"}
            desc={
              "A smart tool that converts handwritten or typed notes into digital format, making them easily searchable, editable, and shareable. It enhances productivity by organizing notes efficiently."
            }
            img={Notedigitizer}
          />

          {/* AI Question Generator */}
          <RecruiterToolLeft
            redirectLink={"/sign-in"}
            title={"Question Generator"}
            desc={
              "An AI-powered tool that creates relevant and diverse questions based on given topics or content. It helps in exam preparation, interviews, and quizzes by generating insightful and structured questions efficiently."
            }
            img={questiongenai}
          />
          </>
      )}
    </div>
  );
};

export default RecruiterTools;
