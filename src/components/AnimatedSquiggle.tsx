const AnimatedSquiggle = ({ className }: { className?: string }) => {
  // Organic loopy path similar to reference - with big curves and loops
  const squigglePath = `
    M -50 350
    C 50 320, 100 280, 150 320
    C 200 360, 220 400, 280 380
    C 340 360, 360 280, 400 220
    C 440 160, 420 80, 480 60
    C 540 40, 580 100, 560 160
    C 540 220, 480 240, 500 300
    C 520 360, 600 380, 680 340
    C 760 300, 800 200, 860 140
    C 920 80, 1000 40, 1080 80
    C 1160 120, 1180 220, 1140 300
    C 1100 380, 1020 400, 980 340
    C 940 280, 980 200, 1060 180
    C 1140 160, 1220 200, 1280 280
    C 1340 360, 1400 380, 1480 340
  `;

  return (
    <svg
      className={className}
      viewBox="0 0 1400 450"
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
          strokeDasharray: '200 3000',
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
          strokeDasharray: '120 3000',
          strokeDashoffset: '-1200',
        }}
      />
      
      <style>
        {`
          .tracer-1 {
            animation: trace-path-1 14s linear infinite;
          }
          
          .tracer-2 {
            animation: trace-path-2 11s linear infinite;
            animation-delay: -4s;
          }
          
          @keyframes trace-path-1 {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -3200;
            }
          }
          
          @keyframes trace-path-2 {
            0% {
              stroke-dashoffset: -1200;
            }
            100% {
              stroke-dashoffset: -4400;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default AnimatedSquiggle;
