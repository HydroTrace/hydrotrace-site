import { cn } from "@/lib/utils";
import WorldMap from "./WorldMap";

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

// Groundwater Management Plot - shows abstraction & groundwater level with policy zones
const GroundwaterManagementPlot = ({ progress }: { progress: number }) => {
  const w = 300, h1 = 80, h2 = 80, gap = 20;
  const totalH = h1 + gap + h2;
  
  // Years from 2010 to 2030 (21 years)
  const years = Array.from({ length: 21 }, (_, i) => 2010 + i);
  const yearPositions = years.map((_, i) => (i / 20) * w);
  
  // Zone boundaries (as fractions of width)
  const reform1Start = (2020 - 2010) / 20; // 0.5
  const reform2Start = (2025 - 2010) / 20; // 0.75
  
  // Abstraction data points (Mm³/yr) - rises, then stabilizes, then drops
  const abstractionData = [
    100, 108, 118, 128, 135, 140, 145, 148, 150, 152, // 2010-2019: rising
    150, 148, 145, 142, 140, // 2020-2024: stabilizing (blue zone)
    125, 122, 120, 118, 118, 118 // 2025-2030: reduced (green zone)
  ];
  
  // Groundwater level data (meters below surface) - drops, stabilizes, recovers
  const groundwaterData = [
    10, 9.8, 9.5, 9.2, 8.8, 8.5, 8.2, 7.9, 7.6, 7.3, // 2010-2019: declining
    7.2, 7.15, 7.1, 7.1, 7.1, // 2020-2024: stabilizing (blue zone)
    7.2, 7.4, 7.6, 7.8, 8.0, 8.2 // 2025-2030: recovering (green zone)
  ];
  
  // Scale functions
  const absMin = 90, absMax = 160;
  const gwMin = 6, gwMax = 11;
  
  const scaleAbs = (val: number) => h1 - ((val - absMin) / (absMax - absMin)) * h1;
  const scaleGw = (val: number) => h2 - ((val - gwMin) / (gwMax - gwMin)) * h2;
  
  // Current animation position (0 to 20 based on progress)
  const currentIndex = Math.min(Math.floor(progress * 21), 20);
  
  // Build paths up to current index
  const buildAbsPath = () => {
    if (currentIndex < 1) return '';
    let path = `M 0 ${scaleAbs(abstractionData[0])}`;
    for (let i = 1; i <= currentIndex; i++) {
      path += ` L ${yearPositions[i]} ${scaleAbs(abstractionData[i])}`;
    }
    return path;
  };
  
  const buildGwPath = () => {
    if (currentIndex < 1) return '';
    let path = `M 0 ${scaleGw(groundwaterData[0])}`;
    for (let i = 1; i <= currentIndex; i++) {
      path += ` L ${yearPositions[i]} ${scaleGw(groundwaterData[i])}`;
    }
    return path;
  };

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${totalH + 40}`} className="w-full" style={{ height: '320px' }}>
        {/* Policy zone backgrounds - Top chart */}
        <rect x={reform1Start * w} y="0" width={(reform2Start - reform1Start) * w} height={h1} fill="#CCDCEE" opacity="0.5" />
        <rect x={reform2Start * w} y="0" width={(1 - reform2Start) * w} height={h1} fill="#CCEECC" opacity="0.5" />
        
        {/* Policy zone backgrounds - Bottom chart */}
        <rect x={reform1Start * w} y={h1 + gap} width={(reform2Start - reform1Start) * w} height={h2} fill="#CCDCEE" opacity="0.5" />
        <rect x={reform2Start * w} y={h1 + gap} width={(1 - reform2Start) * w} height={h2} fill="#CCEECC" opacity="0.5" />
        
        {/* Vertical dashed lines at reform boundaries */}
        <line x1={reform1Start * w} y1="0" x2={reform1Start * w} y2={totalH} stroke="#666" strokeWidth="1" strokeDasharray="4 2" />
        <line x1={reform2Start * w} y1="0" x2={reform2Start * w} y2={totalH} stroke="#666" strokeWidth="1" strokeDasharray="4 2" />
        
        {/* Top chart - Abstraction */}
        <g>
          {/* Y-axis label */}
          <text x="-40" y={h1 / 2} fill="#3366CC" fontSize="8" fontFamily="'Fira Code', monospace" transform={`rotate(-90, -40, ${h1 / 2})`} textAnchor="middle">
            Total Abstracted (Mm³/yr)
          </text>
          
          {/* Grid lines */}
          <line x1="0" y1="0" x2={w} y2="0" stroke="#DDD" strokeWidth="0.5" />
          <line x1="0" y1={h1} x2={w} y2={h1} stroke="#DDD" strokeWidth="0.5" />
          <line x1="0" y1={h1 * 0.5} x2={w} y2={h1 * 0.5} stroke="#DDD" strokeWidth="0.5" strokeDasharray="2 2" />
          
          {/* Y-axis ticks */}
          <text x="-5" y="5" fill="#666" fontSize="7" textAnchor="end">160</text>
          <text x="-5" y={h1 / 2 + 2} fill="#666" fontSize="7" textAnchor="end">125</text>
          <text x="-5" y={h1 - 2} fill="#666" fontSize="7" textAnchor="end">90</text>
          
          {/* Data line */}
          {currentIndex >= 1 && (
            <path d={buildAbsPath()} fill="none" stroke="#3366CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
          
          {/* Current point indicator */}
          {currentIndex >= 0 && (
            <circle cx={yearPositions[currentIndex]} cy={scaleAbs(abstractionData[currentIndex])} r="3" fill="#3366CC" />
          )}
        </g>
        
        {/* Bottom chart - Groundwater Level */}
        <g transform={`translate(0, ${h1 + gap})`}>
          {/* Y-axis label */}
          <text x="-40" y={h2 / 2} fill="#228B22" fontSize="8" fontFamily="'Fira Code', monospace" transform={`rotate(-90, -40, ${h2 / 2})`} textAnchor="middle">
            Groundwater Level (m)
          </text>
          
          {/* Grid lines */}
          <line x1="0" y1="0" x2={w} y2="0" stroke="#DDD" strokeWidth="0.5" />
          <line x1="0" y1={h2} x2={w} y2={h2} stroke="#DDD" strokeWidth="0.5" />
          <line x1="0" y1={h2 * 0.5} x2={w} y2={h2 * 0.5} stroke="#DDD" strokeWidth="0.5" strokeDasharray="2 2" />
          
          {/* Y-axis ticks */}
          <text x="-5" y="5" fill="#666" fontSize="7" textAnchor="end">11</text>
          <text x="-5" y={h2 / 2 + 2} fill="#666" fontSize="7" textAnchor="end">8.5</text>
          <text x="-5" y={h2 - 2} fill="#666" fontSize="7" textAnchor="end">6</text>
          
          {/* Data line */}
          {currentIndex >= 1 && (
            <path d={buildGwPath()} fill="none" stroke="#228B22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
          
          {/* Current point indicator */}
          {currentIndex >= 0 && (
            <circle cx={yearPositions[currentIndex]} cy={scaleGw(groundwaterData[currentIndex])} r="3" fill="#228B22" />
          )}
        </g>
        
        {/* X-axis labels */}
        <g transform={`translate(0, ${totalH + 10})`}>
          {[2010, 2015, 2020, 2025, 2030].map((year, i) => (
            <text key={year} x={((year - 2010) / 20) * w} y="0" fill="#666" fontSize="8" textAnchor="middle">
              {year}
            </text>
          ))}
          <text x={w / 2} y="18" fill="#666" fontSize="9" textAnchor="middle" fontFamily="'Fira Code', monospace">
            Year
          </text>
        </g>
        
        {/* Zone labels */}
        <text x={(reform1Start + (reform2Start - reform1Start) / 2) * w} y="-8" fill="#3366CC" fontSize="7" textAnchor="middle" fontFamily="'Fira Code', monospace">
          Allocation Freeze
        </text>
        <text x={(reform1Start + (reform2Start - reform1Start) / 2) * w} y="-1" fill="#3366CC" fontSize="6" textAnchor="middle" fontFamily="'Fira Code', monospace">
          (Reform 1)
        </text>
        <text x={(reform2Start + (1 - reform2Start) / 2 + reform2Start / 2) * w} y="-8" fill="#228B22" fontSize="7" textAnchor="middle" fontFamily="'Fira Code', monospace">
          Allocation Reduction
        </text>
        <text x={(reform2Start + (1 - reform2Start) / 2 + reform2Start / 2) * w} y="-1" fill="#228B22" fontSize="6" textAnchor="middle" fontFamily="'Fira Code', monospace">
          (Reform 2)
        </text>
        
        {/* Annotations on charts */}
        {currentIndex >= 15 && (
          <>
            <text x={reform1Start * w + 30} y={h1 + gap + 45} fill="#3366CC" fontSize="6" fontFamily="'Fira Code', monospace">
              Sustainable Yield
            </text>
            <text x={reform1Start * w + 30} y={h1 + gap + 52} fill="#3366CC" fontSize="6" fontFamily="'Fira Code', monospace">
              Achieved
            </text>
          </>
        )}
        {currentIndex >= 18 && (
          <>
            <text x={reform2Start * w + 15} y={h1 + gap + 30} fill="#228B22" fontSize="6" fontFamily="'Fira Code', monospace">
              Aquifer Recovery
            </text>
            <text x={reform2Start * w + 15} y={h1 + gap + 37} fill="#228B22" fontSize="6" fontFamily="'Fira Code', monospace">
              Begins
            </text>
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
      <div className="relative z-10 text-center pt-16 mb-8 max-w-4xl mx-auto px-4">
        <h2 
          className="heading-xl mb-6"
          style={{ color: '#21177a', fontFamily: "'Open Sans', sans-serif" }}
        >
          Data-driven water governance
        </h2>
        <p 
          className="text-lg leading-relaxed"
          style={{ color: '#21177a', fontFamily: "'Open Sans', sans-serif" }}
        >
          Reliable, high-frequency abstraction data is the catalyst that transforms static records into operational intelligence for both regulators and farmers. It moves management beyond simple accounting and into proactive resource stewardship.
        </p>
      </div>

      {/* Dashboard UI */}
      <div className="relative z-10 flex items-center justify-center min-h-[600px] px-4">
        <div className="w-full max-w-[1400px] flex gap-6">
          {/* Left Dashboard - Groundwater Management */}
          <div 
            className="flex-1 bg-white rounded-lg shadow-sm p-6"
            style={{ 
              border: '2px solid #3366CC',
              minHeight: '550px'
            }}
          >
            {/* Globe icon */}
            <div className="mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#3366CC" strokeWidth="1.5">
                <circle cx="16" cy="16" r="12" />
                <ellipse cx="16" cy="16" rx="5" ry="12" />
                <line x1="4" y1="16" x2="28" y2="16" />
                <path d="M6 10 Q16 8 26 10" />
                <path d="M6 22 Q16 24 26 22" />
              </svg>
            </div>
            
            <h3 
              className="text-2xl font-normal mb-2"
              style={{ color: '#3366CC', fontFamily: "'Open Sans', sans-serif" }}
            >
              Sustainable Groundwater Management
            </h3>
            <p 
              className="text-xs mb-6"
              style={{ color: '#666', fontFamily: "'Fira Code', monospace" }}
            >
              Pairing abstraction data with groundwater levels enables informed decisions for long-term aquifer health
            </p>
            
            <GroundwaterManagementPlot progress={progress} />
            
            <div className="mt-4 flex gap-4 text-xs" style={{ fontFamily: "'Fira Code', monospace" }}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: '#CCDCEE' }} />
                <span style={{ color: '#3366CC' }}>Allocation Freeze</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: '#CCEECC' }} />
                <span style={{ color: '#228B22' }}>Allocation Reduction</span>
              </div>
            </div>
          </div>
          
          {/* Right Dashboard - Metrics */}
          <div 
            className="w-[500px] bg-white rounded-lg shadow-sm"
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
      </div>

      {/* World Map Section */}
      <WorldMap />
    </section>
  );
};

export default Resources;
