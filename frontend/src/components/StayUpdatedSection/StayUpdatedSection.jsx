import React from 'react';

const StayUpdatedSection = ({ title, description, buttonText, bgColor }) => {
  return (
    <div className={`py-14 rounded-3xl shadow-lg text-white transform transition hover:scale-105 ${bgColor}`}>
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="mt-4 text-lg opacity-80">{description}</p>
      <div className="mt-6 flex justify-center">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="p-4 w-80 rounded-l-xl text-black outline-none border-none" 
        />
        <button className="bg-orange-500 px-6 py-4 rounded-r-xl hover:bg-orange-600 font-semibold">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default StayUpdatedSection;
