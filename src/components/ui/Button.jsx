// components/ui/Button.jsx
const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 font-bold rounded-lg
        bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900
        text-white
        shadow-[0_0_8px_rgba(75,0,130,0.7),0_0_20px_rgba(10,10,70,0.8)]
        hover:shadow-[0_0_12px_rgba(100,0,150,0.9),0_0_30px_rgba(20,60,180,1)]
        transition-shadow duration-300 ease-in-out
        transform hover:scale-105 active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;

