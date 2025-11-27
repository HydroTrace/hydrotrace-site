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

import { useState, useEffect, useRef, useMemo } from 'react';

// Simple linear animation hook - no CSS transitions, pure JS
const useLinearProgress = (duration: number = 8000) => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const p = (elapsed % duration) / duration;
      setProgress(p);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration]);

  return progress;
};

// Water tank - no CSS transition, direct height
const WaterTankFilling = ({ progress }: { progress: number }) => {
  const percent = Math.round(progress * 100);
  return (
    <div className="relative h-full w-full p-2">
      <div 
        className="relative w-full h-full rounded-sm overflow-hidden"
        style={{ backgroundColor: '#E8F0FC', border: '2px solid #3366CC' }}
      >
        <div 
          className="absolute bottom-0 left-0 w-full"
          style={{ 
            height: `${percent}%`,
            background: 'linear-gradient(180deg, #5588DD 0%, #3366CC 100%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-lg font-semibold"
            style={{ 
              color: progress > 0.5 ? '#FFF' : '#3366CC',
              fontFamily: "'Fira Code', monospace",
            }}
          >
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
};

// Simple linear plot - precompute path for efficiency
const ConsumptionPlot = ({ progress }: { progress: number }) => {
  const w = 100, h = 60;
  const endX = progress * w;
  const endY = h - progress * h * 0.85;
  
  const linePath = `M 0 ${h} L ${endX} ${endY}`;
  const fillPath = `M 0 ${h} L ${endX} ${endY} L ${endX} ${h} Z`;

  return (
    <div className="w-full">
      <p className="text-xs mb-2" style={{ color: '#3366CC', fontFamily: "'Fira Code', monospace" }}>
        Cumulative Water Consumption Over Time
      </p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" preserveAspectRatio="none">
        <line x1="0" y1={h} x2={w} y2={h} stroke="#99BBEE" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="0" y2={h} stroke="#99BBEE" strokeWidth="0.5" />
        <line x1={w} y1="0" x2={w} y2={h} stroke="#99BBEE" strokeWidth="0.5" />
        <line x1="0" y1="0" x2={w} y2="0" stroke="#99BBEE" strokeWidth="0.5" />
        <line x1="0" y1={h * 0.25} x2={w} y2={h * 0.25} stroke="#99BBEE" strokeWidth="0.2" strokeDasharray="2 2" />
        <line x1="0" y1={h * 0.5} x2={w} y2={h * 0.5} stroke="#99BBEE" strokeWidth="0.2" strokeDasharray="2 2" />
        <line x1="0" y1={h * 0.75} x2={w} y2={h * 0.75} stroke="#99BBEE" strokeWidth="0.2" strokeDasharray="2 2" />
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3366CC" />
            <stop offset="100%" stopColor="#3366CC" stopOpacity="0" />
          </linearGradient>
        </defs>
        {progress > 0.001 && (
          <>
            <path d={fillPath} fill="url(#cg)" opacity="0.3" />
            <path d={linePath} fill="none" stroke="#3366CC" strokeWidth="1.5" strokeLinecap="round" />
          </>
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
  const progress = useLinearProgress(8000);
  const currentValue = progress * MAX_ALLOCATED;
  
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
                  103,437
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
