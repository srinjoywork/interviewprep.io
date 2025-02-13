import React from "react";
import "./RecruiterFeature.css";

const featuresData = [
    {
      title: "Candidate Evaluation",
      description: "Assess candidates effectively with detailed profiles, skill evaluations, and interview feedback.",
      bgColor: "#3b82f6", // Blue
    },
    {
      title: "Collaborative Hiring",
      description: "Collaborate with your team in real-time to streamline the recruitment process and make informed decisions.",
      bgColor: "#8b5cf6", // Purple
    },
    {
      title: "Advanced Analytics",
      description: "Leverage data-driven insights to optimize your hiring strategies and improve candidate selection.",
      bgColor: "#10b981", // Green
    },
    {
      title: "Job Postings & Candidate Search",
      description: "Post job openings and easily search for candidates based on specific skill sets and experience.",
      bgColor: "#fbbf24", // Yellow
    },
  ];
  

const RecruiterFeature = () => {
  return (
    <section className="features-section">
      <div className="container">
      <h1 className="features-title">
        <span>OUR FEATURES</span>
        <span style={{ fontSize: "100px" }}>&#128073;&#127999;</span>
    </h1>
        {/* <p className="features-subtitle">
          Your one-stop solution for acing technical and HR interviews with ease.
        </p> */}
        <div className="features-list">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="feature"
              style={{ borderLeft: `5px solid ${feature.bgColor}`, paddingLeft: "15px" }}
            >
              <h2 className="feature-title" style={{ color: feature.bgColor }}>
                {feature.title}
              </h2>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruiterFeature;
