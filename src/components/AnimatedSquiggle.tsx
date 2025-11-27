const AnimatedSquiggle = ({ className }: { className?: string }) => {
  // More random, organic squiggly path with frequent curves
  const squigglePath = `
    M -30 220
    C 40 150, 80 280, 140 200
    S 180 100, 240 160
    S 300 250, 360 180
    S 400 90, 480 150
    S 540 240, 620 170
    S 680 80, 760 140
    S 820 230, 900 160
    S 960 70, 1040 130
    S 1100 220, 1180 150
    S 1240 90, 1320 170
    S 1380 250, 1460 180
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
        <linearGradient id="tracerGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5CC3D9" stopOpacity="0" />
          <stop offset="50%" stopColor="#5CC3D9" stopOpacity="0.12" />
          <stop offset="85%" stopColor="#0A66B7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0A66B7" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="tracerGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5CC3D9" stopOpacity="0" />
          <stop offset="60%" stopColor="#5CC3D9" stopOpacity="0.1" />
          <stop offset="90%" stopColor="#0A66B7" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0A66B7" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      
      {/* Base squiggle path - very subtle */}
      <path
        d={squigglePath}
        stroke="#5CC3D9"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.12"
      />
      
      {/* First tracer - longer, slower */}
      <path
        d={squigglePath}
        stroke="url(#tracerGradient1)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="tracer-1"
        style={{
          strokeDasharray: '180 2200',
          strokeDashoffset: '0',
        }}
      />
      
      {/* Second tracer - shorter, different timing */}
      <path
        d={squigglePath}
        stroke="url(#tracerGradient2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="tracer-2"
        style={{
          strokeDasharray: '100 2200',
          strokeDashoffset: '-800',
        }}
      />
      
      <style>
        {`
          .tracer-1 {
            animation: trace-path-1 12s linear infinite;
          }
          
          .tracer-2 {
            animation: trace-path-2 9s linear infinite;
            animation-delay: -3s;
          }
          
          @keyframes trace-path-1 {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -2400;
            }
          }
          
          @keyframes trace-path-2 {
            0% {
              stroke-dashoffset: -800;
            }
            100% {
              stroke-dashoffset: -3200;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default AnimatedSquiggle;
