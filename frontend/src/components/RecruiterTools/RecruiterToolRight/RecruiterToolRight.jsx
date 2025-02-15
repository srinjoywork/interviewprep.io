import React from "react";
import "./RecruiterToolRight.css";

const RecruiterToolRight = ({ title, desc, img, redirectLink }) => {
  return (
    // <div className="recruiter-container-right">
    //   <div className="recruiter-left-right">
    //     <img src={img ? img : "#"} alt={title ? title : "Unknown"} className="recruiter-image" />
    //   </div>
    //   <div className="recruiter-card-right">
    //     <h1 className="recruiter-title-right">{title ? title : "Add Title Here"}</h1>
    //     <p className="recruiter-text-right">{desc ? desc : "Add Description"}</p>
    //     <a href="/ai" className="recruiter-button-right">
    //       Explore {title ? title : ""}
    //     </a>
    //   </div>
    // </div>
    <div className="recruiter-container-right">
      <div className="recruiter-right-right">
        <img src={img?img:"#"} alt={title?title:"Unknown"} className="recruiter-image" />
      </div>
      <div className="recruiter-card-right">
            <h1 className="recruiter-title-right">{title?title:"Add Title Here"}</h1>
            <p className="recruiter-text-right">
                {desc?desc:"Add Description"}
            </p>  
            <a href={redirectLink} className="recruiter-button-right">
                Explore {title?title:""}
            </a>
        </div>
      
    </div>
  );
};

export default RecruiterToolRight;
