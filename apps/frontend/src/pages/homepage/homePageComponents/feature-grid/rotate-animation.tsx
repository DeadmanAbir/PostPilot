// Face component for each side of the cube
const CubeFace = ({ bgColor, transform, children, icon: Icon, label }) => (
    <div
      className={`absolute w-40 h-40 flex items-center justify-center  ${bgColor} border border-white/20`}
      style={{
        transform,
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <Icon className="w-16 h-16" />
        <span className="text-white text-xl font-bold">{label}</span>
      </div>
    </div>
  );
  
  const OrbitAnimation = () => {
    // Data for cube faces with brand colors and icons
    const faces = [
      { 
        bgColor: 'bg-[#FF0000]', 
        label: 'YouTube',
        icon: () => (
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-red-900">
            <path 
              fill="currentColor" 
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />
          </svg>
        )
      },
      { 
        bgColor: 'bg-[#1DA1F2]', 
        label: 'Twitter',
        icon: () => (
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-blue-900">
            <path 
              fill="currentColor" 
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
            />
          </svg>
        )
      },
      { 
        bgColor: 'bg-[#4285F4]', 
        label: 'Docs',
        icon: () => (
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-blue-900">
            <path 
              fill="currentColor" 
              d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
            />
          </svg>
        )
      },
      { 
        bgColor: 'bg-[#34A853]', 
        label: 'URL',
        icon: () => (
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-green-900">
            <path 
              fill="currentColor" 
              d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
            />
          </svg>
        )
      },
      { 
        bgColor: 'bg-[#EA4335]', 
        label: 'Post Pilot',
        icon: () => (
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-red-900">
            <path 
              fill="currentColor" 
              d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z"
            />
          </svg>
        )
      },
      { 
        bgColor: 'bg-[#FBBC05]', 
        label: 'AI',
        icon: () => (
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-yellow-900">
            <path 
              fill="currentColor" 
              d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"
            />
          </svg>
        )
      },
    ];
  
    return (
      <div className="w-full flex items-center justify-center h-[280px] overflow-hidden " style={{ perspective: "2000px" }}>
        <div
          className="relative w-48 h-48"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(15deg) rotateY(-15deg)",
            animation: "rotateCube 20s infinite linear"
          }}
        >
          <CubeFace
            {...faces[0]}
            transform="translateZ(80px)"
          />
          <CubeFace
            {...faces[1]}
            transform="translateZ(-80px) rotateY(180deg)"
          />
          <CubeFace
            {...faces[2]}
            transform="translateX(-80px) rotateY(-90deg)"
          />
          <CubeFace
            {...faces[3]}
            transform="translateX(80px) rotateY(90deg)"
          />
          <CubeFace
            {...faces[4]}
            transform="translateY(-80px) rotateX(90deg)"
          />
          <CubeFace
            {...faces[5]}
            transform="translateY(80px) rotateX(-90deg)"
          />
          
          {/* Glowing effect */}
        </div>
        
        <style jsx>{`
          @keyframes rotateCube {
            0% {
              transform: rotateX(0deg) rotateY(0deg);
            }
            100% {
              transform: rotateX(360deg) rotateY(360deg);
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default OrbitAnimation;