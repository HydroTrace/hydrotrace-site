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

import { useState, useEffect, useRef } from 'react';

// Fixed grid cells with morphing scale/padding animations
const gridCells = [
  // Row 1
  { id: 1, col: 1, row: 1, colSpan: 2, rowSpan: 1 },
  { id: 2, col: 3, row: 1, colSpan: 1, rowSpan: 1 },
  { id: 3, col: 4, row: 1, colSpan: 1, rowSpan: 2 },
  { id: 4, col: 5, row: 1, colSpan: 1, rowSpan: 1 },
  // Row 2
  { id: 5, col: 1, row: 2, colSpan: 1, rowSpan: 1 },
  { id: 6, col: 2, row: 2, colSpan: 2, rowSpan: 1 },
  { id: 7, col: 5, row: 2, colSpan: 1, rowSpan: 2 },
  // Row 3
  { id: 8, col: 1, row: 3, colSpan: 1, rowSpan: 1 },
  { id: 9, col: 2, row: 3, colSpan: 1, rowSpan: 1 },
  { id: 10, col: 3, row: 3, colSpan: 1, rowSpan: 1 },
  { id: 11, col: 4, row: 3, colSpan: 1, rowSpan: 1 },
];

// Animation states for each layout
const animationStates = [
  // State A - default
  { 1: { scale: 1, x: 0 }, 2: { scale: 1, x: 0 }, 3: { scale: 1, x: 0 }, 4: { scale: 1, x: 0 }, 5: { scale: 1, x: 0 }, 6: { scale: 1, x: 0 }, 7: { scale: 1, x: 0 }, 8: { scale: 1, x: 0 }, 9: { scale: 1, x: 0 }, 10: { scale: 1, x: 0 }, 11: { scale: 1, x: 0 } },
  // State B - some cells scale up, others shrink
  { 1: { scale: 0.92, x: 0 }, 2: { scale: 1.08, x: 0 }, 3: { scale: 1.05, x: 0 }, 4: { scale: 0.9, x: 2 }, 5: { scale: 1.1, x: 0 }, 6: { scale: 0.95, x: -2 }, 7: { scale: 1.08, x: 0 }, 8: { scale: 0.9, x: 0 }, 9: { scale: 1.12, x: 0 }, 10: { scale: 0.88, x: 2 }, 11: { scale: 1.05, x: 0 } },
  // State C - alternate pattern
  { 1: { scale: 1.06, x: 2 }, 2: { scale: 0.88, x: 0 }, 3: { scale: 0.92, x: 0 }, 4: { scale: 1.1, x: -2 }, 5: { scale: 0.9, x: 0 }, 6: { scale: 1.1, x: 3 }, 7: { scale: 0.9, x: 0 }, 8: { scale: 1.08, x: 0 }, 9: { scale: 0.85, x: 0 }, 10: { scale: 1.1, x: -2 }, 11: { scale: 0.92, x: 0 } },
];

const AnimatedGridPanel = () => {
  const [stateIndex, setStateIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % animationStates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentState = animationStates[stateIndex];

  return (
    <div 
      className="relative h-full w-full"
      style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '0px',
        backgroundColor: '#E8F0FC',
      }}
    >
      {gridCells.map((cell) => {
        const anim = currentState[cell.id] || { scale: 1, x: 0 };
        return (
          <div
            key={cell.id}
            className="relative"
            style={{
              gridColumn: `${cell.col} / span ${cell.colSpan}`,
              gridRow: `${cell.row} / span ${cell.rowSpan}`,
              backgroundColor: '#D6E3F8',
              border: '2px solid #3366CC',
              transform: `scale(${anim.scale}) translateX(${anim.x}px)`,
              transition: 'transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        );
      })}
    </div>
  );
};

// Animated consumption visualization component
const useConsumptionAnimation = (maxValue: number, duration: number = 15000) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isAnimating) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(elapsed / duration, 1);
      
      setProgress(newProgress);
      
      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Reset and loop
        setTimeout(() => {
          startTimeRef.current = null;
          setProgress(0);
        }, 2000);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, duration, progress]);

  const currentValue = progress * maxValue;
  return { progress, currentValue };
};

const ConsumptionProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full">
      <p 
        className="text-xs mb-2"
        style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace" }}
      >
        Cumulative Water Consumption
      </p>
      <div 
        className="relative h-8 rounded-full overflow-hidden"
        style={{ backgroundColor: '#E8F0FC', border: '1px solid #3366CC' }}
      >
        <div 
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-100"
          style={{ 
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #3366CC 0%, #5588DD 100%)',
          }}
        />
      </div>
    </div>
  );
};

const ConsumptionPlot = ({ progress }: { progress: number }) => {
  const points = 100;
  const width = 100;
  const height = 60;
  
  // Generate path points - x-axis directly matches progress bar position
  const pathPoints: string[] = [];
  const currentX = progress * width;
  
  // Draw from 0 to current progress position
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * currentX;
    const normalizedX = x / width;
    // Exponential growth curve based on x position
    const y = height - (Math.pow(normalizedX, 1.5) * height * 0.85);
    pathPoints.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  
  const pathD = pathPoints.join(' ');
  
  return (
    <div className="w-full mt-2">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-20"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        <line x1="0" y1={height} x2={width} y2={height} stroke="#99BBEE" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="0" y2={height} stroke="#99BBEE" strokeWidth="0.5" />
        
        {/* Vertical marker at current position */}
        {progress > 0 && (
          <line 
            x1={currentX} 
            y1={0} 
            x2={currentX} 
            y2={height} 
            stroke="#99BBEE" 
            strokeWidth="0.3" 
            strokeDasharray="2 2"
          />
        )}
        
        {/* Consumption line */}
        {progress > 0 && (
          <path
            d={pathD}
            fill="none"
            stroke="#3366CC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
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
  const MAX_ALLOCATED = 5; // 5 M m³/year
  const { progress, currentValue } = useConsumptionAnimation(MAX_ALLOCATED, 12000);
  
  // Format the consumed value for display
  const formatConsumed = (value: number) => {
    if (value < 1) {
      return `${(value * 1000).toFixed(0)} K m³/year`;
    }
    return `${value.toFixed(1)} M m³/year`;
  };

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
              <div className="col-span-3 h-20 flex flex-col justify-center px-4" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
                <span 
                  className="text-2xl font-semibold"
                  style={{ color: '#3366CC', fontFamily: "'Open Sans', sans-serif" }}
                >
                  5 M m³/year
                </span>
                <span 
                  className="text-[10px] mt-1"
                  style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace", textTransform: 'uppercase' }}
                >
                  TOTAL ALLOCATED GROUNDWATER
                </span>
              </div>
              <div className="col-span-3 h-20 flex flex-col justify-center px-4" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
                <span 
                  className="text-2xl font-semibold"
                  style={{ color: '#3366CC', fontFamily: "'Open Sans', sans-serif" }}
                >
                  {formatConsumed(currentValue)}
                </span>
                <span 
                  className="text-[10px] mt-1"
                  style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace", textTransform: 'uppercase' }}
                >
                  TOTAL CONSUMED TO DATE
                </span>
              </div>
              <div className="col-span-3 h-20" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }} />
              
              {/* Right side animated grid panel */}
              <div className="col-span-3 row-span-2 p-1" style={{ borderBottom: '1px solid #3366CC' }}>
                <AnimatedGridPanel />
              </div>
              
              {/* Row 2 */}
              <div className="col-span-3 h-20 flex flex-col justify-center px-4" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
                <span 
                  className="text-2xl font-semibold"
                  style={{ color: '#3366CC', fontFamily: "'Open Sans', sans-serif" }}
                >
                  6000
                </span>
                <span 
                  className="text-[10px] mt-1"
                  style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace", textTransform: 'uppercase' }}
                >
                  REGISTERED FARMERS
                </span>
              </div>
              <div className="col-span-3 h-20 flex flex-col justify-center px-4" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
                <span 
                  className="text-2xl font-semibold"
                  style={{ color: '#3366CC', fontFamily: "'Open Sans', sans-serif" }}
                >
                  7483
                </span>
                <span 
                  className="text-[10px] mt-1"
                  style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace", textTransform: 'uppercase' }}
                >
                  REGISTERED BOREHOLES
                </span>
              </div>
              <div className="col-span-3 h-20 flex flex-col justify-center px-4" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
                <span 
                  className="text-2xl font-semibold"
                  style={{ color: '#3366CC', fontFamily: "'Open Sans', sans-serif" }}
                >
                  103'437
                </span>
                <span 
                  className="text-[10px] mt-1"
                  style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace", textTransform: 'uppercase' }}
                >
                  HECTARES OF FARM LAND
                </span>
              </div>
            </div>
            
            {/* Lower section with progress bar and plot */}
            <div className="mt-0 px-4 py-4 relative" style={{ borderLeft: '1px solid #3366CC', borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
              <ConsumptionProgressBar progress={progress} />
              <ConsumptionPlot progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
