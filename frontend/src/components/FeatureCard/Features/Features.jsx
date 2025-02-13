import React from 'react'
import './Features.css'
const Features = ({title, features}) => {
  return (
    <div>
        <div className="features-container">
            <h1 className="features-title">{title?title:"No tiltle"}</h1>
            {features?<ul className="features-list">
                {features.map((feature, index) => (
                    <li key={index} className="feature-item">{feature}</li>
                ))}
            </ul>: ""}
            
        </div>
    </div>
  )
}

export default Features