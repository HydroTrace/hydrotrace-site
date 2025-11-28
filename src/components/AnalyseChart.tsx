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

const AnalyseChart = ({ isActive }: AnalyseChartProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    let start: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min(elapsed / 2500, 1); // 2.5s total
      setProgress(newProgress);
      if (newProgress < 1) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  const getBarHeight = (index: number, value: number, max: number) => {
    const barStart = index * 0.12; // Each bar starts 12% into the animation
    const barProgress = Math.max(0, Math.min(1, (progress - barStart) / 0.3));
    return (value / max) * 120 * barProgress;
  };

  const getValue = (index: number, value: number) => {
    const barStart = index * 0.12;
    const barProgress = Math.max(0, Math.min(1, (progress - barStart) / 0.3));
    return value * barProgress;
  };

  const format = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v).toString();

  return (
    <div className="w-full h-full flex p-6 gap-6" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Usage Recordings */}
      <div className="flex-1 flex flex-col">
        <div className="text-xs font-medium mb-3 uppercase tracking-wider" style={{ color: '#336CFF', fontFamily: "'Fira Code', monospace" }}>
          Usage Recordings
        </div>
        <div className="flex-1 flex items-end gap-2">
          {recordingsData.map((item, i) => (
            <div key={item.year} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center" style={{ height: 120 }}>
                <div
                  className="w-full max-w-[32px] rounded-t relative"
                  style={{ height: getBarHeight(i, item.value, 15000), backgroundColor: '#60A5FA', transition: 'height 0.05s linear' }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold" style={{ color: '#0A1B44' }}>
                    {format(getValue(i, item.value))}
                  </span>
                </div>
              </div>
              <span className="text-[10px] mt-2 font-medium" style={{ color: '#64748B' }}>{item.year}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-3 text-base font-semibold" style={{ color: '#0A1B44' }}>
          {format(getValue(5, 14000))} total
        </div>
      </div>

      <div className="w-px self-stretch my-4" style={{ backgroundColor: '#D4DCF6' }} />

      {/* Water Consumption */}
      <div className="flex-1 flex flex-col">
        <div className="text-xs font-medium mb-3 uppercase tracking-wider" style={{ color: '#336CFF', fontFamily: "'Fira Code', monospace" }}>
          Water Consumption (M m³)
        </div>
        <div className="flex-1 flex items-end gap-2">
          {consumptionData.map((item, i) => (
            <div key={item.year} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center" style={{ height: 120 }}>
                <div
                  className="w-full max-w-[32px] rounded-t relative"
                  style={{ height: getBarHeight(i, item.value, 5), backgroundColor: '#1E40AF', transition: 'height 0.05s linear' }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold" style={{ color: '#0A1B44' }}>
                    {getValue(i, item.value).toFixed(1)}M
                  </span>
                </div>
              </div>
              <span className="text-[10px] mt-2 font-medium" style={{ color: '#64748B' }}>{item.year}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-3 text-base font-semibold" style={{ color: '#0A1B44' }}>
          {getValue(5, 4.5).toFixed(1)}M m³/year
        </div>
      </div>
    </div>
  );
};

export default AnalyseChart;