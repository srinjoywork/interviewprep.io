import React from "react";
import "./RecruiterToolLeft.css";

const RecruiterToolLeft = ({title, desc, img, redirectLink}) => {
  return (
    <div className="recruiter-container">
      <div className="recruiter-card">
            <h1 className="recruiter-title">{title?title:"Add Title Here"}</h1>
            <p className="recruiter-text">
                {desc?desc:"Add Description"}
            </p>  
            <a href={redirectLink} className="recruiter-button">
                Explore {title?title:""}
            </a>
        </div>
      <div className="recruiter-right">
        <img src={img?img:"#"} alt={title?title:"Unknown"} className="recruiter-image" />
      </div>
    </div>
  );
};

export default RecruiterToolLeft;
