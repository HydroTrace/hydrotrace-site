const AnimatedSquiggle = ({ className }: { className?: string }) => {
  // Random squiggly path that spans across the viewport
  const squigglePath = `
    M -50 180
    C 80 120, 150 280, 280 200
    S 420 80, 550 160
    S 700 300, 850 220
    S 1000 100, 1150 180
    S 1300 280, 1450 200
  `;

  return (
    <svg
      className={className}
      viewBox="0 0 1400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="squiggleTracerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5CC3D9" stopOpacity="0" />
          <stop offset="60%" stopColor="#5CC3D9" stopOpacity="0.15" />
          <stop offset="90%" stopColor="#0A66B7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0A66B7" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      
      {/* Base squiggle path - very subtle */}
      <path
        d={squigglePath}
        stroke="#5CC3D9"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.15"
      />
      
      {/* Animated tracer path */}
      <path
        d={squigglePath}
        stroke="url(#squiggleTracerGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="squiggle-tracer"
        style={{
          strokeDasharray: '200 1800',
          strokeDashoffset: '0',
        }}
      />
      
      <style>
        {`
          .squiggle-tracer {
            animation: trace-squiggle 10s linear infinite;
          }
          
          @keyframes trace-squiggle {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -2000;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default AnimatedSquiggle;
