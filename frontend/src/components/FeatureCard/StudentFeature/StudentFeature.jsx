// import React from "react";
// import "./RecruiterFeature.css";

// const featuresData = [
//     {
//       title: "Candidate Evaluation",
//       description: "Assess candidates effectively with detailed profiles, skill evaluations, and interview feedback.",
//       bgColor: "#3b82f6", // Blue
//     },
//     {
//       title: "Collaborative Hiring",
//       description: "Collaborate with your team in real-time to streamline the recruitment process and make informed decisions.",
//       bgColor: "#8b5cf6", // Purple
//     },
//     {
//       title: "Advanced Analytics",
//       description: "Leverage data-driven insights to optimize your hiring strategies and improve candidate selection.",
//       bgColor: "#10b981", // Green
//     },
//     {
//       title: "Job Postings & Candidate Search",
//       description: "Post job openings and easily search for candidates based on specific skill sets and experience.",
//       bgColor: "#fbbf24", // Yellow
//     },
//   ];
  

// const RecruiterFeature = () => {
//   return (
//     <section className="features-section">
//       <div className="container">
//       <h1 className="features-title">
//         <span>OUR FEATURES</span>
//         <span style={{ fontSize: "100px" }}>&#128073;&#127999;</span>
//     </h1>
//         {/* <p className="features-subtitle">
//           Your one-stop solution for acing technical and HR interviews with ease.
//         </p> */}
//         <div className="features-list">
//           {featuresData.map((feature, index) => (
//             <div
//               key={index}
//               className="feature"
//               style={{ borderLeft: `5px solid ${feature.bgColor}`, paddingLeft: "15px" }}
//             >
//               <h2 className="feature-title" style={{ color: feature.bgColor }}>
//                 {feature.title}
//               </h2>
//               <p className="feature-description">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecruiterFeature;

import React from 'react'

const RecruiterFeature = () => {
  const features = [
    {
      title: "Code Review",
      description: "A platform that allows you to receive valuable feedback on your code to improve quality, readability, and performance.",
      icon: "🔍"
    },
    {
      title: "Code Optimizer",
      description: "A tool that analyzes and refines your code, suggesting improvements to make it more efficient and faster.",
      icon: "🚀"
    },
    {
      title: "Code IDE",
      description: "An integrated development environment that provides a comprehensive workspace for coding, debugging, and testing, with advanced features for developers.",
      icon: "🖥️"
    },
    {
      title: "DigiScribe",
      description: "A tool that converts handwritten notes into digital format, making them easy to edit, store, and share.",
      icon: "✍️"
    },
    {
      title: "Dsa Tracker",
      description: "A tool to help you track your progress in Data Structures and Algorithms, with personalized learning paths and performance metrics.",
      icon: "📈"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#0892d0] to-[#4b0082]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white">Applicant Features</h2>
        <p className="mt-4 text-white">Enhance your career journey with advanced tools designed to help you explore opportunities efficiently and accurately, guiding you toward the best-fit roles in the IT industry.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruiterFeature;

