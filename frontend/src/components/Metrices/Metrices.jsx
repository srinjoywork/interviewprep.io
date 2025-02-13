import React from 'react';
import './Metrices.css';
import { dialogBody } from '@material-tailwind/react';
const Metrices = ({title, desc}) => {
  return (
    <div className='metrices'>
    <div className="text-center">
      <h2 className="text-4xl font-bold">{title?title:""}</h2>
      <p className="mt-4 text-xl opacity-90">{desc?desc:""}</p>
    </div>
    </div>
  );
};

export default Metrices;
