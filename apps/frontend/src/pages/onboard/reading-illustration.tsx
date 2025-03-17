export function ReadingIllustration() {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-full h-auto"
    >
      {/* Background elements */}
      <rect x="100" y="100" width="300" height="300" rx="20" fill="#E9EFF6" />
      <circle cx="250" cy="250" r="120" fill="#F5F8FC" />

      {/* Plant */}
      <path
        d="M150 300C150 300 130 250 160 230C190 210 180 180 180 180"
        stroke="#6D9EEB"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M150 300C150 300 170 260 150 230C130 200 140 170 140 170"
        stroke="#6D9EEB"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M150 300C150 300 120 270 130 240C140 210 120 190 120 190"
        stroke="#6D9EEB"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="140" y="300" width="20" height="30" rx="5" fill="#A4C2F4" />

      {/* Chair */}
      <rect x="220" y="280" width="120" height="20" rx="5" fill="#8E9CB6" />
      <rect x="230" y="300" width="100" height="10" rx="2" fill="#7D8BA3" />
      <rect x="240" y="230" width="80" height="50" rx="5" fill="#8E9CB6" />
      <rect x="240" y="230" width="80" height="10" rx="2" fill="#7D8BA3" />

      {/* Person */}
      {/* Head */}
      <circle cx="280" cy="180" r="25" fill="#FFD7B5" />
      <path
        d="M265 175C265 175 270 180 280 180C290 180 295 175 295 175"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="270" cy="170" r="2" fill="#333" />
      <circle cx="290" cy="170" r="2" fill="#333" />

      {/* Hair */}
      <path
        d="M280 155C280 155 260 160 265 180C265 180 275 175 280 175C285 175 295 180 295 180C300 160 280 155 280 155Z"
        fill="#333"
      />
      <circle cx="280" cy="145" r="10" fill="#333" />

      {/* Body */}
      <path
        d="M280 205C280 205 260 220 255 260C255 260 270 270 280 270C290 270 305 260 305 260C300 220 280 205 280 205Z"
        fill="#B76E79"
      />

      {/* Arms */}
      <path
        d="M260 220C260 220 240 230 230 250C220 270 230 280 230 280"
        stroke="#FFD7B5"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M300 220C300 220 320 230 330 240C340 250 335 260 335 260"
        stroke="#FFD7B5"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Legs */}
      <path
        d="M270 270C270 270 260 300 255 330C250 360 260 370 260 370"
        stroke="#6D9EEB"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d="M290 270C290 270 300 300 305 330C310 360 300 370 300 370"
        stroke="#6D9EEB"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {/* Book */}
      <rect
        x="260"
        y="240"
        width="40"
        height="30"
        rx="2"
        fill="#FFF"
        stroke="#333"
        strokeWidth="2"
      />
      <line x1="280" y1="240" x2="280" y2="270" stroke="#333" strokeWidth="2" />

      {/* Cat */}
      <ellipse cx="350" cy="350" rx="30" ry="20" fill="#8E9CB6" />
      <circle cx="330" cy="340" r="10" fill="#8E9CB6" />
      <path
        d="M325 335L320 325M335 335L340 325"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="330" cy="338" rx="1" ry="2" fill="#333" />
      <path
        d="M330 342C330 342 328 344 330 345C332 344 330 342 330 342Z"
        fill="#333"
      />
      <path
        d="M350 350C350 350 370 340 380 350"
        stroke="#8E9CB6"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M320 350L310 370"
        stroke="#8E9CB6"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M330 360L325 380"
        stroke="#8E9CB6"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
