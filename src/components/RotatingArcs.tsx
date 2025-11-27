const RotatingArcs = ({ className }: { className?: string }) => {
  // Define arcs at different radii with varying dash patterns
  const arcs = [
    { radius: 240, dashArray: '200 100', rotation: 'cw', duration: 25, startAngle: 0 },
    { radius: 280, dashArray: '250 120', rotation: 'ccw', duration: 20, startAngle: 120 },
    { radius: 320, dashArray: '220 130', rotation: 'cw', duration: 30, startAngle: 240 },
  ];

  const centerX = 350;
  const centerY = 350;

  // Generate keyframes for each arc
  const keyframes = arcs.map((arc, index) => `
    @keyframes rotate-arc-${index} {
      from { transform: rotate(${arc.startAngle}deg); }
      to { transform: rotate(${arc.startAngle + (arc.rotation === 'cw' ? 360 : -360)}deg); }
    }
  `).join('');

  return (
    <svg
      className={className}
      viewBox="0 0 700 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{keyframes}</style>
      
      {arcs.map((arc, index) => (
        <circle
          key={index}
          cx={centerX}
          cy={centerY}
          r={arc.radius}
          fill="none"
          stroke="#0C5212"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray={arc.dashArray}
          strokeLinecap="round"
          style={{
            transformOrigin: `${centerX}px ${centerY}px`,
            animation: `rotate-arc-${index} ${arc.duration}s linear infinite`,
          }}
        />
      ))}
    </svg>
  );
};

export default RotatingArcs;
