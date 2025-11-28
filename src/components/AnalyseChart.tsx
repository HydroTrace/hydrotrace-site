import { useState, useEffect } from "react";

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
  const [visibleBars, setVisibleBars] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setAnimationProgress(0);
      setVisibleBars(0);
      return;
    }

    // Animate bars appearing one by one
    const barInterval = setInterval(() => {
      setVisibleBars((prev) => {
        if (prev >= consumptionData.length) {
          clearInterval(barInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    // Animate bar heights growing
    const progressInterval = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 1) {
          clearInterval(progressInterval);
          return 1;
        }
        return prev + 0.02;
      });
    }, 20);

    return () => {
      clearInterval(barInterval);
      clearInterval(progressInterval);
    };
  }, [isActive]);

  const formatRecordings = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <div className="w-full h-full flex p-4 gap-4" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Left Chart - Usage Recordings */}
      <div className="flex-1 flex flex-col">
        <div 
          className="text-xs font-medium mb-2 uppercase tracking-wider"
          style={{ color: '#336CFF', fontFamily: "'Fira Code', monospace" }}
        >
          Usage Recordings
        </div>
        <div className="flex-1 flex items-end gap-1">
          {recordingsData.map((item, index) => {
            const heightPercent = (item.value / maxRecordings) * 100 * animationProgress;
            const isVisible = index < visibleBars;
            return (
              <div key={item.year} className="flex-1 flex flex-col items-center">
                <div className="flex-1 w-full flex items-end justify-center">
                  <div
                    className="w-full max-w-[28px] rounded-t transition-all duration-500 ease-out relative group"
                    style={{
                      height: isVisible ? `${heightPercent}%` : '0%',
                      backgroundColor: '#60A5FA',
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Value label on hover */}
                    <div 
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                      style={{ color: '#0A1B44' }}
                    >
                      {formatRecordings(Math.round(item.value * animationProgress))}
                    </div>
                  </div>
                </div>
                <span 
                  className="text-[10px] mt-1 font-medium"
                  style={{ color: '#64748B' }}
                >
                  {item.year.slice(-2)}
                </span>
              </div>
            );
          })}
        </div>
        {/* Animated counter */}
        <div 
          className="text-center mt-2 text-lg font-semibold"
          style={{ color: '#0A1B44' }}
        >
          {formatRecordings(Math.round(recordingsData[recordingsData.length - 1].value * animationProgress))} total
        </div>
      </div>

      {/* Vertical Divider */}
      <div 
        className="w-px self-stretch my-4"
        style={{ backgroundColor: '#D4DCF6' }}
      />

      {/* Right Chart - Water Consumption */}
      <div className="flex-1 flex flex-col">
        <div 
          className="text-xs font-medium mb-2 uppercase tracking-wider"
          style={{ color: '#336CFF', fontFamily: "'Fira Code', monospace" }}
        >
          Water Consumption (M m³)
        </div>
        <div className="flex-1 flex items-end gap-1">
          {consumptionData.map((item, index) => {
            const heightPercent = (item.value / maxConsumption) * 100 * animationProgress;
            const isVisible = index < visibleBars;
            return (
              <div key={item.year} className="flex-1 flex flex-col items-center">
                <div className="flex-1 w-full flex items-end justify-center">
                  <div
                    className="w-full max-w-[28px] rounded-t transition-all duration-500 ease-out relative group"
                    style={{
                      height: isVisible ? `${heightPercent}%` : '0%',
                      backgroundColor: '#1E40AF',
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Value label on hover */}
                    <div 
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                      style={{ color: '#0A1B44' }}
                    >
                      {(item.value * animationProgress).toFixed(1)}M
                    </div>
                  </div>
                </div>
                <span 
                  className="text-[10px] mt-1 font-medium"
                  style={{ color: '#64748B' }}
                >
                  {item.year.slice(-2)}
                </span>
              </div>
            );
          })}
        </div>
        {/* Animated counter */}
        <div 
          className="text-center mt-2 text-lg font-semibold"
          style={{ color: '#0A1B44' }}
        >
          {(consumptionData[consumptionData.length - 1].value * animationProgress).toFixed(1)}M m³/year
        </div>
      </div>
    </div>
  );
};

export default AnalyseChart;