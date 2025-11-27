const RotatingArcs = ({ className }: { className?: string }) => {
  // Define arcs at different radii with varying dash patterns
  const arcs = [
    { radius: 80, dashArray: '40 60', rotation: 'cw', duration: 25, startAngle: 0 },
    { radius: 100, dashArray: '60 80', rotation: 'ccw', duration: 20, startAngle: 45 },
    { radius: 120, dashArray: '50 90', rotation: 'cw', duration: 30, startAngle: 120 },
    { radius: 140, dashArray: '70 60', rotation: 'ccw', duration: 18, startAngle: 200 },
    { radius: 160, dashArray: '45 100', rotation: 'cw', duration: 22, startAngle: 80 },
    { radius: 180, dashArray: '80 70', rotation: 'ccw', duration: 28, startAngle: 160 },
    { radius: 200, dashArray: '55 85', rotation: 'cw', duration: 15, startAngle: 270 },
    { radius: 220, dashArray: '65 75', rotation: 'ccw', duration: 24, startAngle: 30 },
  ];

  const centerX = 250;
  const centerY = 250;

  return (
    <svg
      className={className}
      viewBox="0 0 500 500"
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
          strokeOpacity="0.3"
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
