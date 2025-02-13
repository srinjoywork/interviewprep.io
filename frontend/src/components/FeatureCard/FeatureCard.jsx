import React from 'react';

const FeatureCard = ({ title, features, bgColor, icon  }) => {
  return (
    <div
      className={`p-8 rounded-2xl shadow-xl  w-80 transform transition hover:scale-105 ${bgColor}`}
    >
      <h3 className="text-2xl font-semibold">{title?title:""} {icon?icon:""}</h3>
      {features?<ul className="text-gray-600 mt-3 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="list-disc pl-5">{feature}</li>
        ))}
      </ul>:""}
      
    </div>
  );
};
export default FeatureCard;