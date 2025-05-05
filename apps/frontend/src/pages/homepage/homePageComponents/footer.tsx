import { useMemo } from 'react';

const Footer = () => {
  const text = 'POST PILOT';
  const rotations = useMemo(() => {
    return text.split('').map(() => {
      const angle = Math.floor(Math.random() * 60) - 30; // between -30 and +30 deg
      return angle;
    });
  }, []);
  return (
    <footer className="w-full border-t-2 border-blue-950/40 z-50">
      <div className="container mx-auto flex items-center justify-center text-[150px] font-bold tracking-widest  min-h-60 px-5  w-full">
        {text.split('').map((char, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `rotate(${rotations[index]}deg) scale(1.2)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
            }}
            className={`md:text-[150px] text-6xl font-bold tracking-widest transition-all duration-300 cursor-pointer text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-blue-950/20 hover:from-blue-400 hover:to-blue-700  `}
          >
            {char}
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
