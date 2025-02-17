import React from "react";
import { useNavigate } from "react-router-dom";
import isAuth from "libs/isAuth";
import { userType } from "libs/isAuth";
import CodeReview from "../assets/CodeReview.jpg";
import CodeOptimizer from "../assets/CodeOptimizer.jpg";
import CodeIDE from "../assets/CodeIDE.jpg";
import NoteDigitalizer from "../assets/NoteDigitalization.jpg";
import DSATracker from "../assets/dsa.jpg";

const InterviewPrepTools = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#191714] to-[#2234AE] p-5 flex flex-col items-center">
      <Section
        title="Code Review"
        description="Code Review is the process of examining and improving code quality. It ensures that the code is clean, efficient, and adheres to best practices."
        image={CodeReview}
        link="https://codebuddy-ai.netlify.app/"
        imagePosition="left"
      />

      <Section
        title="Code Optimizer"
        description="Code Optimizer improves performance, reduces execution time, and enhances scalability using profiling and compilation techniques."
        image={CodeOptimizer}
        link="https://ai-code-converter-live.vercel.app/"
        imagePosition="right"
      />

      <Section
        title="Code IDE"
        description="Code IDEs provide tools for writing, debugging, and testing code efficiently. Popular choices include VS Code, IntelliJ IDEA, and PyCharm."
        image={CodeIDE}
        link="https://codehirex.vercel.app/code-ide"
        imagePosition="left"
      />

      <Section
        title="Note Digitalization"
        description="Note Digitalization uses AI and OCR to convert handwritten or printed notes into editable and searchable digital formats."
        image={NoteDigitalizer}
        link="https://code-hire-x-digiscribe.streamlit.app"
        imagePosition="right"
      />

      <Section
        title="DSA Tracker"
        description="DSA Tracker helps monitor problem-solving progress in Data Structures and Algorithms with categorized problems and difficulty levels."
        image={DSATracker}
        link="https://codehirex.vercel.app/dsa-basics"
        imagePosition="left"
      />
    </div>
  );
};

const Section = ({ title, description, image, link, imagePosition }) => {
  const navigate = useNavigate();
  const authenticated = isAuth();
  const type = userType();
  const isApplicant = authenticated && type === "applicant";
  const isExternal = link.startsWith("http");

  const handleClick = (e) => {
    if (!isApplicant) {
      e.preventDefault();
      navigate("/sign-in");
    } else if (!isExternal) {
      e.preventDefault();
      navigate(link);
    }
  };

  return (
    <section
  className={`flex flex-col md:flex-row items-center text-center md:text-left text-white 
  w-full max-w-4xl mb-10 p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 
  ${imagePosition === "right" ? "md:flex-row-reverse" : ""}`}
>
      <div className="md:w-1/2 flex justify-center ">
        <div className="border border-white/30 rounded-xl p-2">
          <img src={image} alt={title} className="w-40 h-40 object-cover rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="md:w-1/2 p-5 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-4 text-lg">{description}</p>
        <a
          href={isApplicant ? link : "#"}
          onClick={handleClick}
          target={isExternal && isApplicant ? "_blank" : undefined}
          rel={isExternal && isApplicant ? "noopener noreferrer" : undefined}
          className="inline-block mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default InterviewPrepTools;
