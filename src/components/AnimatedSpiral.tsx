import { useEffect, useRef } from 'react';

const AnimatedSpiral = ({ className }: { className?: string }) => {
  const pathRef = useRef<SVGPathElement>(null);
  
  // Generate spiral path with 2.5 revolutions
  const generateSpiralPath = () => {
    const centerX = 200;
    const centerY = 200;
    const startRadius = 20;
    const endRadius = 180;
    const revolutions = 2.5;
    const points: string[] = [];
    const steps = 200;
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * revolutions * 2 * Math.PI;
      const radius = startRadius + (endRadius - startRadius) * t;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    
    return points.join(' ');
  };

  const spiralPath = generateSpiralPath();
  
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.setProperty('--path-length', `${length}`);
    }
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for the tracer - aligned with motion direction */}
        <linearGradient id="tracerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5CC3D9" stopOpacity="0" />
          <stop offset="40%" stopColor="#5CC3D9" stopOpacity="0.5" />
          <stop offset="80%" stopColor="#0A66B7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0A66B7" stopOpacity="1" />
        </linearGradient>
        
        {/* Glow filter for the tracer */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Base spiral path - light blue */}
      <path
        d={spiralPath}
        stroke="#5CC3D9"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      
      {/* Animated tracer path */}
      <path
        ref={pathRef}
        d={spiralPath}
        stroke="url(#tracerGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
        className="spiral-tracer"
        style={{
          strokeDasharray: '150 1200',
          strokeDashoffset: '0',
        }}
      />
      
      <style>
        {`
          .spiral-tracer {
            animation: trace-spiral 8s linear infinite;
          }
          
          @keyframes trace-spiral {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -1350;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default AnimatedSpiral;
