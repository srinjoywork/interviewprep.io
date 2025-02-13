// import React, { useRef, useState, forwardRef } from "react";
// import ReactToPrint from "react-to-print";
// import { ArrowDown } from "react-feather";

// import Editor from "../Editor/Editor";
// import Resume from "../Resume/Resume";

// import styles from "./ResumeLanding.module.css";

// // export default function ResumeLanding() {
//   export default function ResumeLanding() {
//   const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
//   const sections = {
//     basicInfo: "Basic Info",
//     workExp: "Work Experience",
//     project: "Projects",
//     education: "Education",
//     skills: "Skills",
//     achievement: "Achievements",
  
//     other: "Other",
//   };
//   // --------------------------------------------------------------------
//   const resumeRef = useRef();
//   // const resumeRef = forwardRef();
//     // --------------------------------------------------------------------

//   const [activeColor, setActiveColor] = useState(colors[0]);
//   const [resumeInformation, setResumeInformation] = useState({
//     [sections.basicInfo]: {
//       id: sections.basicInfo,
//       sectionTitle: sections.basicInfo,
//       detail: {},
//     },
//     [sections.workExp]: {
//       id: sections.workExp,
//       sectionTitle: sections.workExp,
//       details: [],
//     },
//     [sections.project]: {
//       id: sections.project,
//       sectionTitle: sections.project,
//       details: [],
//     },
//     [sections.education]: {
//       id: sections.education,
//       sectionTitle: sections.education,
//       details: [],
//     },
//     [sections.skills]: {
//       id: sections.skills,
//       sectionTitle: sections.skills,
//       details: [],
//       },
//     [sections.achievement]: {
//       id: sections.achievement,
//       sectionTitle: sections.achievement,
//       points: [],
//     },
//     // [sections.summary]: {
//     //   id: sections.summary,
//     //   sectionTitle: sections.summary,
//     //   detail: "",
//     // },
//     [sections.other]: {
//       id: sections.other,
//       sectionTitle: sections.other,
//       detail: "",
//     },
//   });

//   // console.log(Resume);
//   return (
//     <div className={styles.container}>
//       <p className={styles.heading}>Resume Builder</p>
//       <div className={styles.toolbar}>
//         <div className={styles.colors}>
//           {colors.map((item) => (
//             <span
//               key={item}
//               style={{ backgroundColor: item }}
//               className={`${styles.color} ${
//                 activeColor === item ? styles.active : ""
//               }`}
//               onClick={() => setActiveColor(item)}
//             />
//           ))}
//         </div>

// {/* {console.log("Content: ",resumeRef)} */}
//         {/* Download Button Issue */}
// {/* -------------------------------------------------------------------- */}
//         {/* <ReactToPrint
//           trigger={() => {
//             return (
//               <button>
//                 Download <ArrowDown />
//               </button>
//             );
//           }}
//           content={() => resumeRef.current }
//         /> */}
// {/* -------------------------------------------------------------------- */}
//       </div>
//       <div className={styles.main}>
//         <Editor
//           sections={sections}
//           information={resumeInformation}
//           setInformation={setResumeInformation}
//         />
//         <Resume
//           ref={resumeRef}
//           sections={sections}
//           information={resumeInformation}
//           activeColor={activeColor}
//         />
//       </div>
//     </div>
//   );
// }




import React, { useRef, useState } from "react";
// import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";
import html2pdf from "html2pdf.js"; // Import html2pdf.js

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./ResumeLanding.module.css";

export default function ResumeLanding() {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    skills: "Skills",
    achievement: "Achievements",
    other: "Other",
  };

  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.skills]: {
      id: sections.skills,
      sectionTitle: sections.skills,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  // Function to download resume as PDF
  const downloadResumeAsPDF = () => {
    const element = resumeRef.current;

    // Use html2pdf to generate the PDF from the HTML
    const options = {
      margin: 1,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>

        {/* Download Button */}
        <button onClick={downloadResumeAsPDF} className={styles.downloadButton}>
          Download <ArrowDown />
        </button>
      </div>

      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}




