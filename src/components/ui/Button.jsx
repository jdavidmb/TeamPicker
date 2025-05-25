const Button = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-block px-8 py-4 text-lg font-extrabold uppercase rounded-xl
        tracking-wider transition-all duration-300 ease-in-out
        bg-indigo-700
        text-white border-2 border-indigo-800
        shadow-[0_0_10px_rgba(75,0,130,0.4),0_0_20px_rgba(25,25,112,0.5)]
        hover:shadow-[0_0_20px_rgba(106,90,205,0.6),0_0_40px_rgba(72,61,139,0.8)]
        hover:scale-105 active:scale-95
        hover:bg-indigo-900
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        textShadow: '0 0 4px rgba(255,255,255,0.4), 0 0 8px rgba(106,90,205,0.6)',
        boxShadow:
          '0 0 6px rgba(72,61,139,0.5), 0 0 15px rgba(75,0,130,0.4), inset 0 0 4px rgba(255,255,255,0.05)',
      }}
    >
      {children}
    </button>
  );
};

export default Button;

