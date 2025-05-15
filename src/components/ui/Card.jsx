const Card = ({ title, children, className }) => {
  return (
    <div
      className={`
        p-6
        bg-gradient-to-tr from-black via-[#0b1a4d] to-[#2a0048]
        rounded-lg
        border-2 border-transparent
        shadow-[0_0_10px_rgba(55,0,120,0.8),0_0_20px_rgba(15,30,80,0.6)]
        transition-transform duration-300 transform hover:scale-105
        ${className}
      `}
      style={{
        borderImage: 'linear-gradient(45deg, #1a0033, #0b1a4d, #2a0048) 1',
        borderStyle: 'solid',
      }}
    >
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      {children}
    </div>
  );
};

export default Card;

