import React from "react";
import "./InterviewPrepTools.css";
import CodeReview from "../assets/CodeReview.jpg";
import CodeOptimizer from "../assets/CodeOptimizer.jpg";
import CodeIDE from "../assets/CodeIDE.jpg";
import NoteDigitalizer from "../assets/NoteDigitalization.jpg";
import DSATracker from "../assets/dsa.jpg";

const InterviewPrepTools = () => {
  return (
    <div className="InterviewPrepTools">
      {/* Section 1: Code Review */}
      <Section
        title="Code Review"
        description="Code Review is the process of examining and improving code quality. It ensures that the code is clean, efficient, and adheres to best practices. Peer reviews and automated tools are often used in this process."
        image={CodeReview}
        imagePosition="left"
        buttonText="Learn More"
        link="https://codebuddy-ai.netlify.app/"
      />

      {/* Section 2: Code Optimizer */}
      <Section
        title="Code Optimizer"
        description="Code Optimizer focuses on improving the performance of your code. It reduces execution time, minimizes resource usage, and enhances scalability. Tools like profilers and compilers are commonly used."
        image={CodeOptimizer}
        imagePosition="right"
        buttonText="Learn More"
        link="https://ai-code-converter-live.vercel.app/"
      />

      {/* Section 3: Code IDE */}
      <Section
        title="Code IDE"
        description="Code IDE (Integrated Development Environment) is a software suite that provides comprehensive facilities for coding, debugging, and testing. Popular IDEs include Visual Studio Code, IntelliJ IDEA, and PyCharm."
        image={CodeIDE}
        imagePosition="left"
        buttonText="Learn More"
        link="http://localhost:4000/code-ide"
      />

      {/* Section 4: Note Digitalization */}
      <Section
        title="Note Digitalization"
        description="Note Digitalization converts handwritten or printed notes into digital formats. It uses OCR (Optical Character Recognition) and AI to make notes searchable, editable, and easily shareable."
        image={NoteDigitalizer}
        imagePosition="right"
        buttonText="Learn More"
        link="https://resume-parser-pdqm.onrender.com"
      />

      {/* Section 5: DSA Tracker */}
      <Section
        title="DSA Tracker"
        description="DSA Tracker helps you track your progress in Data Structures and Algorithms. It provides categorized problems, difficulty levels, and progress monitoring to improve your problem-solving skills efficiently."
        image={DSATracker}
        imagePosition="left"
        buttonText="Start Tracking"
        link="http://localhost:4000/dsa-basics"
      />
    </div>
  );
};

const Section = ({
  title,
  description,
  image,
  imagePosition,
  buttonText,
  link,
}) => {
  return (
    <section
      className={`section ${
        imagePosition === "right" ? "right-image" : "left-image"
      }`}
    >
      <div className="section-image-container">
        <img src={image} alt={title} className="section-image" />
      </div>
      <div className="section-content">
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
        <a
          href={link}
          className="section-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default InterviewPrepTools;
