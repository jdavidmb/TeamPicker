import React from 'react';


const Card = ({ title, children, className }) => {
  return (
    <div
      className={`w-full p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default Card;



