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

const WaterTankFilling = ({ progress }: { progress: number }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-2">
      {/* Tank container */}
      <div 
        className="relative w-full h-full rounded-sm overflow-hidden"
        style={{ 
          backgroundColor: '#E8F0FC',
          border: '2px solid #3366CC',
        }}
      >
        {/* Water fill - smooth transition */}
        <div 
          className="absolute bottom-0 left-0 w-full"
          style={{ 
            height: `${progress * 100}%`,
            background: 'linear-gradient(180deg, #5588DD 0%, #3366CC 100%)',
            transition: 'height 50ms linear',
          }}
        />
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-lg font-semibold"
            style={{ 
              color: progress > 0.5 ? '#FFFFFF' : '#3366CC',
              fontFamily: "'Fira Code', monospace",
              textShadow: progress > 0.5 ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

// Smooth linear animation hook
const useConsumptionAnimation = (maxValue: number, duration: number = 10000) => {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const linearProgress = Math.min(elapsed / duration, 1);
      
      setProgress(linearProgress);
      
      if (linearProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Reset and loop seamlessly
        startTimeRef.current = null;
        setProgress(0);
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration]);

  const currentValue = progress * maxValue;
  return { progress, currentValue };
};

const ConsumptionPlot = ({ progress }: { progress: number }) => {
  const points = 100;
  const width = 100;
  const height = 60;
  
  // Generate path points matching the non-linear easing curve
  const pathPoints: string[] = [];
  
  // Draw the full curve up to current progress
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    if (t > progress) break;
    
    const x = t * width;
    // Y value matches the easing curve shape
    const y = height - (progress > 0 ? (t / progress) * progress * height * 0.85 : 0);
    pathPoints.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  
  const pathD = pathPoints.join(' ');
  const currentX = progress * width;
  const currentY = height - (progress * height * 0.85);
  
  return (
    <div className="w-full">
      <p 
        className="text-xs mb-2"
        style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace" }}
      >
        Cumulative Water Consumption Over Time
      </p>
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-24"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        <line x1="0" y1={height} x2={width} y2={height} stroke="#99BBEE" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="0" y2={height} stroke="#99BBEE" strokeWidth="0.5" />
        <line x1={width} y1="0" x2={width} y2={height} stroke="#99BBEE" strokeWidth="0.5" />
        <line x1="0" y1="0" x2={width} y2="0" stroke="#99BBEE" strokeWidth="0.5" />
        
        {/* Horizontal grid lines */}
        <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="#99BBEE" strokeWidth="0.2" strokeDasharray="2 2" />
        <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="#99BBEE" strokeWidth="0.2" strokeDasharray="2 2" />
        <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#99BBEE" strokeWidth="0.2" strokeDasharray="2 2" />
        
        {/* Filled area under the line */}
        {progress > 0 && (
          <path
            d={`${pathD} L ${currentX} ${height} L 0 ${height} Z`}
            fill="url(#consumptionGradient)"
            opacity="0.3"
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
        
        <defs>
          <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3366CC" />
            <stop offset="100%" stopColor="#3366CC" stopOpacity="0" />
          </linearGradient>
        </defs>
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
              <div className="col-span-3 h-20 flex flex-col justify-center px-4" style={{ borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
                <span 
                  className="text-2xl font-semibold"
                  style={{ color: '#3366CC', fontFamily: "'Open Sans', sans-serif" }}
                >
                  {Math.floor(progress * 10000).toLocaleString()}
                </span>
                <span 
                  className="text-[10px] mt-1"
                  style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace", textTransform: 'uppercase' }}
                >
                  NUMBER OF USAGE RECORDINGS
                </span>
              </div>
              
              {/* Right side water tank filling */}
              <div className="col-span-3 row-span-2 p-1" style={{ borderBottom: '1px solid #3366CC' }}>
                <WaterTankFilling progress={progress} />
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
            
            {/* Lower section with plot only */}
            <div className="mt-0 px-4 py-4 relative" style={{ borderLeft: '1px solid #3366CC', borderRight: '1px solid #3366CC', borderBottom: '1px solid #3366CC' }}>
              <ConsumptionPlot progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
