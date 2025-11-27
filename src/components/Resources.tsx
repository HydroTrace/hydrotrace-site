import { cn } from "@/lib/utils";

const generateRings = (count: number, baseRadius: number, centerX: number, centerY: number) => {
  const rings = [];
  for (let i = 0; i < count; i++) {
    const radius = baseRadius + i * 25;
    const opacity = 0.5 - (i * 0.025);
    const duration = 15 + i * 2;
    const direction = i % 2 === 0 ? 1 : -1;
    const dashArray = `${80 + i * 15} ${120 + i * 20}`;
    const dashOffset = i * 50;
    
    rings.push({
      radius,
      opacity: Math.max(opacity, 0.2),
      duration,
      direction,
      dashArray,
      dashOffset,
      centerX,
      centerY,
    });
  }
  return rings;
};

const AnimatedRing = ({ 
  radius, 
  opacity, 
  duration, 
  direction, 
  dashArray, 
  dashOffset,
  centerX,
  centerY,
  index 
}: {
  radius: number;
  opacity: number;
  duration: number;
  direction: number;
  dashArray: string;
  dashOffset: number;
  centerX: number;
  centerY: number;
  index: number;
}) => {
  const circumference = 2 * Math.PI * radius;
  
  return (
    <circle
      cx={centerX}
      cy={centerY}
      r={radius}
      fill="none"
      stroke="#0043B0"
      strokeWidth="1.5"
      strokeOpacity={opacity}
      strokeDasharray={dashArray}
      strokeLinecap="round"
      style={{
        transformOrigin: `${centerX}px ${centerY}px`,
        animation: `spin-ring-${direction > 0 ? 'cw' : 'ccw'} ${duration}s linear infinite`,
        animationDelay: `${index * 0.5}s`,
      }}
    />
  );
};

import { useState, useEffect } from 'react';

// Grid layout configurations for animation
const gridLayouts = [
  // Layout A
  [
    { gridColumn: '1 / 3', gridRow: '1 / 2', opacity: 0.6 },
    { gridColumn: '3 / 4', gridRow: '1 / 3', opacity: 0.4 },
    { gridColumn: '4 / 5', gridRow: '1 / 2', opacity: 0.7 },
    { gridColumn: '1 / 2', gridRow: '2 / 4', opacity: 0.5 },
    { gridColumn: '2 / 3', gridRow: '2 / 3', opacity: 0.8 },
    { gridColumn: '4 / 5', gridRow: '2 / 4', opacity: 0.45 },
    { gridColumn: '2 / 4', gridRow: '3 / 4', opacity: 0.55 },
  ],
  // Layout B
  [
    { gridColumn: '1 / 2', gridRow: '1 / 2', opacity: 0.7 },
    { gridColumn: '2 / 4', gridRow: '1 / 2', opacity: 0.5 },
    { gridColumn: '4 / 5', gridRow: '1 / 3', opacity: 0.6 },
    { gridColumn: '1 / 3', gridRow: '2 / 3', opacity: 0.45 },
    { gridColumn: '3 / 4', gridRow: '2 / 4', opacity: 0.8 },
    { gridColumn: '1 / 2', gridRow: '3 / 4', opacity: 0.55 },
    { gridColumn: '2 / 3', gridRow: '3 / 4', opacity: 0.4 },
  ],
  // Layout C
  [
    { gridColumn: '1 / 3', gridRow: '1 / 3', opacity: 0.5 },
    { gridColumn: '3 / 5', gridRow: '1 / 2', opacity: 0.65 },
    { gridColumn: '3 / 4', gridRow: '2 / 3', opacity: 0.4 },
    { gridColumn: '4 / 5', gridRow: '2 / 4', opacity: 0.75 },
    { gridColumn: '1 / 2', gridRow: '3 / 4', opacity: 0.6 },
    { gridColumn: '2 / 4', gridRow: '3 / 4', opacity: 0.5 },
    { gridColumn: '4 / 5', gridRow: '3 / 4', opacity: 0 },
  ],
];

const AnimatedGridPanel = () => {
  const [layoutIndex, setLayoutIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayoutIndex((prev) => (prev + 1) % gridLayouts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentLayout = gridLayouts[layoutIndex];

  return (
    <div 
      className="grid h-full w-full gap-[2px]"
      style={{ 
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
      }}
    >
      {currentLayout.map((cell, index) => (
        <div
          key={index}
          style={{
            gridColumn: cell.gridColumn,
            gridRow: cell.gridRow,
            backgroundColor: `rgba(214, 227, 248, ${cell.opacity})`,
            border: '1px solid #D4DCF6',
            borderRadius: '2px',
            transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      ))}
    </div>
  );
};

const ConcentricCircles = ({ 
  position, 
  className 
}: { 
  position: 'top-left' | 'bottom-right';
  className?: string;
}) => {
  const isTopLeft = position === 'top-left';
  const centerX = isTopLeft ? 280 : 320;
  const centerY = isTopLeft ? 280 : 280;
  const rings = generateRings(12, 60, centerX, centerY);
  
  return (
    <svg
      className={cn("absolute pointer-events-none", className)}
      width="600"
      height="560"
      viewBox="0 0 600 560"
      style={{
        [isTopLeft ? 'left' : 'right']: isTopLeft ? '5%' : '10%',
        [isTopLeft ? 'top' : 'bottom']: isTopLeft ? '-50px' : '-30px',
      }}
    >
      <style>
        {`
          @keyframes spin-ring-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-ring-ccw {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          @keyframes dash-slide {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: 1000; }
          }
        `}
      </style>
      {rings.map((ring, index) => (
        <AnimatedRing
          key={index}
          {...ring}
          index={index}
        />
      ))}
    </svg>
  );
};

const Resources = ({ className }: { className?: string }) => {
  return (
    <section 
      className={cn("py-32 relative overflow-hidden min-h-[900px]", className)} 
      style={{ backgroundColor: '#FAFAF7' }}
    >
      {/* Animated concentric circle clusters */}
      <ConcentricCircles position="top-left" />
      <ConcentricCircles position="bottom-right" />

      {/* Section Title */}
      <div className="relative z-10 text-center pt-16 mb-8">
        <h2 
          className="heading-xl"
          style={{ color: '#21177a', fontFamily: "'Open Sans', sans-serif" }}
        >
          Data-driven water governance
        </h2>
      </div>

      {/* Dashboard UI */}
      <div className="relative z-10 flex items-center justify-center min-h-[600px] px-4">
        <div 
          className="w-full max-w-[1000px] bg-white rounded-lg shadow-sm"
          style={{ 
            border: '2px solid #3366CC',
            minHeight: '550px'
          }}
        >
          {/* Header with globe icon */}
          <div className="p-6">
            {/* Globe icon */}
            <div className="mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#3366CC" strokeWidth="1.5">
                <circle cx="16" cy="16" r="12" />
                <ellipse cx="16" cy="16" rx="5" ry="12" />
                <line x1="4" y1="16" x2="28" y2="16" />
                <path d="M6 10 Q16 8 26 10" />
                <path d="M6 22 Q16 24 26 22" />
              </svg>
            </div>
            
            {/* Dashboard title */}
            <h2 
              className="text-3xl font-normal mb-6"
              style={{ color: '#3366CC', fontFamily: "'Open Sans', sans-serif" }}
            >
              Dashboard
            </h2>
            
            {/* Metrics label */}
            <p 
              className="text-sm font-medium mb-4"
              style={{ color: '#3366CC' }}
            >
              Metrics
            </p>
            
            {/* Metrics Grid */}
            <div 
              className="grid grid-cols-12 gap-0"
              style={{ border: '1px solid #3366CC' }}
            >
              {/* Row 1 */}
              <div className="col-span-3 h-20" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }} />
              <div className="col-span-3 h-20" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }} />
              <div className="col-span-3 h-20" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }} />
              
              {/* Right side animated grid panel */}
              <div className="col-span-3 row-span-2 p-1" style={{ borderBottom: '1px solid #3366CC' }}>
                <AnimatedGridPanel />
              </div>
              
              {/* Row 2 */}
              <div className="col-span-3 h-20" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }} />
              <div className="col-span-3 h-20" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }} />
              <div className="col-span-3 h-20" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }} />
            </div>
            
            {/* Lower section with horizontal line */}
            <div className="mt-0 h-40 relative" style={{ borderLeft: '1px solid #3366CC', borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
              <div 
                className="absolute top-0 left-0 right-0 h-px"
                style={{ backgroundColor: '#99BBEE' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
