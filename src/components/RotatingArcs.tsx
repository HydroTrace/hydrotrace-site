const RotatingArcs = ({ className }: { className?: string }) => {
  // Define arcs at different radii with varying dash patterns
  const arcs = [
    { radius: 120, dashArray: '80 40', rotation: 'cw', duration: 25, startAngle: 0 },
    { radius: 140, dashArray: '100 50', rotation: 'ccw', duration: 20, startAngle: 45 },
    { radius: 160, dashArray: '90 60', rotation: 'cw', duration: 30, startAngle: 120 },
    { radius: 180, dashArray: '110 40', rotation: 'ccw', duration: 18, startAngle: 200 },
    { radius: 200, dashArray: '85 55', rotation: 'cw', duration: 22, startAngle: 80 },
    { radius: 220, dashArray: '120 50', rotation: 'ccw', duration: 28, startAngle: 160 },
    { radius: 240, dashArray: '95 45', rotation: 'cw', duration: 15, startAngle: 270 },
    { radius: 260, dashArray: '105 55', rotation: 'ccw', duration: 24, startAngle: 30 },
    { radius: 280, dashArray: '90 60', rotation: 'cw', duration: 26, startAngle: 90 },
    { radius: 300, dashArray: '115 45', rotation: 'ccw', duration: 22, startAngle: 180 },
  ];

  const centerX = 350;
  const centerY = 350;

  return (
    <svg
      className={className}
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          @keyframes rotate-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes rotate-ccw {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
        `}
      </style>
      
      {arcs.map((arc, index) => (
        <circle
          key={index}
          cx={centerX}
          cy={centerY}
          r={arc.radius}
          fill="none"
          stroke="#0C5212"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeDasharray={arc.dashArray}
          strokeLinecap="round"
          style={{
            transformOrigin: `${centerX}px ${centerY}px`,
            animation: `rotate-${arc.rotation} ${arc.duration}s linear infinite`,
            transform: `rotate(${arc.startAngle}deg)`,
          }}
        />
      ))}
    </svg>
  );
};

export default RotatingArcs;
