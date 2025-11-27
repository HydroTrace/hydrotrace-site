import { useState } from "react";

const solutions = [
  { 
    title: "Farmers",
    description: "HydroTrace makes water reporting simple, accurate, and stress-free. Skip the field notebook and manual entries. Capture water-use data automatically, stay compliant with local requirements, and get a reliable picture of your abstractions throughout the season.\n\nSpend less time on paperwork and more time farming — all while protecting your allocation and reducing the risk of compliance issues."
  },
  { 
    title: "Water Stewards",
    description: "HydroTrace is a single hub for agricultural abstraction data. Standardize how information is collected, reduce errors, and streamline compliance tracking across farms and seasons. Replace scattered spreadsheets and paper forms with a clear, auditable digital workflow.\n\nBuild a database you can actually use: monitor trends, verify reporting, support enforcement, and generate regulatory submissions quickly and confidently."
  },
  { 
    title: "Water Footprinting",
    description: "Accurate water footprints start with real data. HydroTrace brings field-level abstraction measurements into your sustainability workflows, giving you a defensible foundation for blue-water use, basin impacts, and supply-chain accountability. Track water intensity across sourcing regions, spot hotspots, and quantify progress toward corporate water targets with confidence."
  },
];

const VineOverlay = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none">
    <svg 
      viewBox="0 0 100 100" 
      className="w-full h-full"
      style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.4s ease-out' }}
    >
      {/* Vine 1 - Main curling vine from top right */}
      <path
        d="M100 5 Q85 8 80 15 Q75 25 78 35 Q82 42 76 48 Q68 55 72 65"
        fill="none"
        stroke="#3d7a37"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 120,
          strokeDashoffset: isHovered ? 0 : 120,
          transition: 'stroke-dashoffset 0.8s ease-out'
        }}
      />
      
      {/* Vine 2 - Secondary twirl */}
      <path
        d="M95 0 Q88 12 92 22 Q96 30 88 38 Q80 44 85 55"
        fill="none"
        stroke="#2d5a27"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: isHovered ? 0 : 100,
          transition: 'stroke-dashoffset 0.7s ease-out 0.1s'
        }}
      />
      
      {/* Vine 3 - Small accent vine */}
      <path
        d="M100 18 Q90 20 88 28 Q86 36 80 40"
        fill="none"
        stroke="#4a9c44"
        strokeWidth="1"
        strokeLinecap="round"
        style={{
          strokeDasharray: 50,
          strokeDashoffset: isHovered ? 0 : 50,
          transition: 'stroke-dashoffset 0.5s ease-out 0.2s'
        }}
      />
      
      {/* Vine 4 - Another twirl from corner */}
      <path
        d="M100 12 Q92 15 94 25 Q96 33 90 40 Q84 46 88 56"
        fill="none"
        stroke="#5aac54"
        strokeWidth="1"
        strokeLinecap="round"
        style={{
          strokeDasharray: 90,
          strokeDashoffset: isHovered ? 0 : 90,
          transition: 'stroke-dashoffset 0.6s ease-out 0.15s'
        }}
      />
      
      {/* Curling tendrils */}
      <path
        d="M82 30 Q78 28 76 32 Q74 38 78 42"
        fill="none"
        stroke="#3d7a37"
        strokeWidth="0.8"
        strokeLinecap="round"
        style={{
          strokeDasharray: 25,
          strokeDashoffset: isHovered ? 0 : 25,
          transition: 'stroke-dashoffset 0.4s ease-out 0.4s'
        }}
      />
      <path
        d="M90 42 Q86 40 84 44 Q82 50 86 54"
        fill="none"
        stroke="#4a9c44"
        strokeWidth="0.8"
        strokeLinecap="round"
        style={{
          strokeDasharray: 25,
          strokeDashoffset: isHovered ? 0 : 25,
          transition: 'stroke-dashoffset 0.4s ease-out 0.5s'
        }}
      />
      <path
        d="M76 50 Q72 48 70 52 Q68 58 72 62"
        fill="none"
        stroke="#2d5a27"
        strokeWidth="0.8"
        strokeLinecap="round"
        style={{
          strokeDasharray: 25,
          strokeDashoffset: isHovered ? 0 : 25,
          transition: 'stroke-dashoffset 0.4s ease-out 0.6s'
        }}
      />
      
      {/* Small leaves */}
      <g style={{ 
        opacity: isHovered ? 1 : 0, 
        transition: 'opacity 0.3s ease-out 0.5s'
      }}>
        <ellipse cx="78" cy="18" rx="4" ry="2.5" fill="#4a9c44" transform="rotate(-40 78 18)"/>
        <ellipse cx="86" cy="32" rx="3.5" ry="2" fill="#5aac54" transform="rotate(-55 86 32)"/>
        <ellipse cx="74" cy="45" rx="4" ry="2.5" fill="#3d8a37" transform="rotate(-30 74 45)"/>
        <ellipse cx="82" cy="58" rx="3" ry="2" fill="#4a9c44" transform="rotate(-50 82 58)"/>
        <ellipse cx="92" cy="25" rx="3" ry="1.8" fill="#6bc265" transform="rotate(-45 92 25)"/>
      </g>
    </svg>
  </div>
);

const Solutions = ({ className }: { className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={className}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white border border-[#c5d4e8] rounded-sm p-8 flex flex-col justify-between min-h-[200px] hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Vine overlay for Farmers card */}
              {index === 0 && <VineOverlay isHovered={hoveredIndex === 0} />}
              
              <div className="relative z-10">
                <h3 className="font-['Fira_Code'] text-2xl text-[#21177a] font-medium mb-4">
                  {solution.title}
                </h3>
                {solution.description && (
                  <p className="text-sm text-[#21177a]/80 leading-relaxed whitespace-pre-line">
                    {solution.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
