const AnimatedSquiggle = ({ className }: { className?: string }) => {
  // First organic loopy path
  const squigglePath1 = `
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

  // Second path with different random twists
  const squigglePath2 = `
    M -30 180
    C 40 140, 120 200, 180 160
    C 240 120, 280 60, 360 100
    C 440 140, 480 240, 520 280
    C 560 320, 640 300, 700 240
    C 760 180, 820 120, 900 160
    C 980 200, 1020 300, 960 360
    C 900 420, 820 400, 860 320
    C 900 240, 1000 220, 1080 260
    C 1160 300, 1200 380, 1280 340
    C 1360 300, 1420 220, 1500 260
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
        {/* First path gradients - cyan to blue */}
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
        {/* Second path gradients - purple to indigo shade */}
        <linearGradient id="tracerGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B8CDE" stopOpacity="0" />
          <stop offset="50%" stopColor="#7B8CDE" stopOpacity="0.12" />
          <stop offset="85%" stopColor="#4338CA" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4338CA" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="tracerGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B8CDE" stopOpacity="0" />
          <stop offset="60%" stopColor="#7B8CDE" stopOpacity="0.1" />
          <stop offset="90%" stopColor="#4338CA" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4338CA" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      
      {/* First squiggle - base path */}
      <path
        d={squigglePath1}
        stroke="#5CC3D9"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.12"
      />
      
      {/* First squiggle - tracer 1 */}
      <path
        d={squigglePath1}
        stroke="url(#tracerGradient1)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="tracer-1"
        style={{ strokeDasharray: '200 3000', strokeDashoffset: '0' }}
      />
      
      {/* First squiggle - tracer 2 */}
      <path
        d={squigglePath1}
        stroke="url(#tracerGradient2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="tracer-2"
        style={{ strokeDasharray: '120 3000', strokeDashoffset: '-1200' }}
      />

      {/* Second squiggle - base path */}
      <path
        d={squigglePath2}
        stroke="#7B8CDE"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.1"
      />
      
      {/* Second squiggle - tracer 1 */}
      <path
        d={squigglePath2}
        stroke="url(#tracerGradient3)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="tracer-3"
        style={{ strokeDasharray: '180 2800', strokeDashoffset: '0' }}
      />
      
      {/* Second squiggle - tracer 2 */}
      <path
        d={squigglePath2}
        stroke="url(#tracerGradient4)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="tracer-4"
        style={{ strokeDasharray: '100 2800', strokeDashoffset: '-900' }}
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
          .tracer-3 {
            animation: trace-path-3 12s linear infinite;
          }
          .tracer-4 {
            animation: trace-path-4 9s linear infinite;
            animation-delay: -3s;
          }
          @keyframes trace-path-1 {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -3200; }
          }
          @keyframes trace-path-2 {
            0% { stroke-dashoffset: -1200; }
            100% { stroke-dashoffset: -4400; }
          }
          @keyframes trace-path-3 {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -2980; }
          }
          @keyframes trace-path-4 {
            0% { stroke-dashoffset: -900; }
            100% { stroke-dashoffset: -3700; }
          }
        `}
      </style>
    </svg>
  );
};

export default AnimatedSquiggle;
