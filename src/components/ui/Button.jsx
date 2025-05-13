// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 bg-blue-500 text-black rounded-lg hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
