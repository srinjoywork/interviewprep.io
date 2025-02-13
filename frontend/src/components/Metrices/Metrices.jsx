import React from 'react';

const Metrices = ({title, desc}) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold">{title?title:""}</h2>
      <p className="mt-4 text-xl opacity-90">{desc?desc:""}</p>
    </div>
  );
};

export default Metrices;
