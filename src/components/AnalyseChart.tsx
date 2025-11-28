import { useState, useEffect, useRef } from "react";

interface AnalyseChartProps {
  isActive: boolean;
}

const consumptionData = [
  { year: "2019", value: 1.2 },
  { year: "2020", value: 1.8 },
  { year: "2021", value: 2.4 },
  { year: "2022", value: 3.1 },
  { year: "2023", value: 3.8 },
  { year: "2024", value: 4.5 },
];

const recordingsData = [
  { year: "2019", value: 500 },
  { year: "2020", value: 1200 },
  { year: "2021", value: 2800 },
  { year: "2022", value: 5500 },
  { year: "2023", value: 9000 },
  { year: "2024", value: 14000 },
];

const maxConsumption = 5;
const maxRecordings = 15000;

const AnalyseChart = ({ isActive }: AnalyseChartProps) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setAnimationProgress(0);
      startTimeRef.current = null;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animateBars = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const duration = 2000; // 2 seconds for full animation
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateBars);
      }
    };

    animationRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  const formatRecordings = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const maxBarHeight = 120; // Fixed pixel height for bars

  return (
    <div className="w-full h-full flex p-6 gap-6" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Left Chart - Usage Recordings */}
      <div className="flex-1 flex flex-col min-h-0">
        <div 
          className="text-xs font-medium mb-3 uppercase tracking-wider"
          style={{ color: '#336CFF', fontFamily: "'Fira Code', monospace" }}
        >
          Usage Recordings
        </div>
        <div className="flex-1 flex items-end gap-2 pb-2">
          {recordingsData.map((item, index) => {
            const barHeight = (item.value / maxRecordings) * maxBarHeight * animationProgress;
            const delay = index * 0.1;
            const adjustedProgress = Math.max(0, Math.min(1, (animationProgress - delay) / (1 - delay)));
            const animatedHeight = (item.value / maxRecordings) * maxBarHeight * adjustedProgress;
            
            return (
              <div key={item.year} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full flex items-end justify-center"
                  style={{ height: `${maxBarHeight}px` }}
                >
                  <div
                    className="w-full max-w-[32px] rounded-t relative group"
                    style={{
                      height: `${animatedHeight}px`,
                      backgroundColor: '#60A5FA',
                      transition: 'height 0.1s ease-out',
                    }}
                  >
                    {/* Value label */}
                    <div 
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap"
                      style={{ color: '#0A1B44' }}
                    >
                      {formatRecordings(Math.round(item.value * adjustedProgress))}
                    </div>
                  </div>
                </div>
                <span 
                  className="text-[10px] mt-2 font-medium"
                  style={{ color: '#64748B' }}
                >
                  {item.year}
                </span>
              </div>
            );
          })}
        </div>
        {/* Animated counter */}
        <div 
          className="text-center mt-3 text-base font-semibold"
          style={{ color: '#0A1B44' }}
        >
          {formatRecordings(Math.round(recordingsData[recordingsData.length - 1].value * animationProgress))} total recordings
        </div>
      </div>

      {/* Vertical Divider */}
      <div 
        className="w-px self-stretch my-4"
        style={{ backgroundColor: '#D4DCF6' }}
      />

      {/* Right Chart - Water Consumption */}
      <div className="flex-1 flex flex-col min-h-0">
        <div 
          className="text-xs font-medium mb-3 uppercase tracking-wider"
          style={{ color: '#336CFF', fontFamily: "'Fira Code', monospace" }}
        >
          Water Consumption (M m³)
        </div>
        <div className="flex-1 flex items-end gap-2 pb-2">
          {consumptionData.map((item, index) => {
            const delay = index * 0.1;
            const adjustedProgress = Math.max(0, Math.min(1, (animationProgress - delay) / (1 - delay)));
            const animatedHeight = (item.value / maxConsumption) * maxBarHeight * adjustedProgress;
            
            return (
              <div key={item.year} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full flex items-end justify-center"
                  style={{ height: `${maxBarHeight}px` }}
                >
                  <div
                    className="w-full max-w-[32px] rounded-t relative group"
                    style={{
                      height: `${animatedHeight}px`,
                      backgroundColor: '#1E40AF',
                      transition: 'height 0.1s ease-out',
                    }}
                  >
                    {/* Value label */}
                    <div 
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap"
                      style={{ color: '#0A1B44' }}
                    >
                      {(item.value * adjustedProgress).toFixed(1)}M
                    </div>
                  </div>
                </div>
                <span 
                  className="text-[10px] mt-2 font-medium"
                  style={{ color: '#64748B' }}
                >
                  {item.year}
                </span>
              </div>
            );
          })}
        </div>
        {/* Animated counter */}
        <div 
          className="text-center mt-3 text-base font-semibold"
          style={{ color: '#0A1B44' }}
        >
          {(consumptionData[consumptionData.length - 1].value * animationProgress).toFixed(1)}M m³/year
        </div>
      </div>
    </div>
  );
};

export default AnalyseChart;