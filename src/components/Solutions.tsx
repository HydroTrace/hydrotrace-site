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
  <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none overflow-hidden">
    <svg 
      viewBox="0 0 120 120" 
      className="absolute -top-4 -right-4 w-40 h-40"
      style={{ 
        transform: isHovered ? 'translate(0, 0)' : 'translate(20px, -20px)',
        opacity: isHovered ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Main vine stem */}
      <path
        d="M120 0 Q100 20 95 40 Q90 60 80 75 Q70 90 55 100"
        fill="none"
        stroke="#2d5a27"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 150,
          strokeDashoffset: isHovered ? 0 : 150,
          transition: 'stroke-dashoffset 0.8s ease-out'
        }}
      />
      
      {/* Secondary vine */}
      <path
        d="M110 15 Q95 25 85 45 Q75 65 60 80"
        fill="none"
        stroke="#3d7a37"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: isHovered ? 0 : 100,
          transition: 'stroke-dashoffset 0.9s ease-out 0.1s'
        }}
      />
      
      {/* Leaves */}
      <g style={{ 
        opacity: isHovered ? 1 : 0, 
        transform: isHovered ? 'scale(1)' : 'scale(0.5)',
        transformOrigin: 'center',
        transition: 'all 0.4s ease-out 0.3s'
      }}>
        {/* Leaf 1 */}
        <ellipse cx="95" cy="35" rx="8" ry="5" fill="#4a9c44" transform="rotate(-30 95 35)"/>
        <ellipse cx="95" cy="35" rx="8" ry="5" fill="#3d8a37" transform="rotate(-60 95 35)"/>
        
        {/* Leaf 2 */}
        <ellipse cx="82" cy="60" rx="7" ry="4" fill="#5aac54" transform="rotate(-45 82 60)"/>
        <ellipse cx="82" cy="60" rx="7" ry="4" fill="#4a9c44" transform="rotate(-75 82 60)"/>
        
        {/* Leaf 3 */}
        <ellipse cx="68" cy="82" rx="9" ry="5" fill="#4a9c44" transform="rotate(-35 68 82)"/>
        <ellipse cx="68" cy="82" rx="9" ry="5" fill="#3d8a37" transform="rotate(-65 68 82)"/>
      </g>
      
      {/* Small decorative leaves */}
      <g style={{ 
        opacity: isHovered ? 1 : 0, 
        transition: 'opacity 0.4s ease-out 0.5s'
      }}>
        <circle cx="100" cy="25" r="3" fill="#6bc265"/>
        <circle cx="88" cy="48" r="2.5" fill="#5aac54"/>
        <circle cx="75" cy="70" r="2" fill="#6bc265"/>
        <circle cx="62" cy="90" r="3" fill="#5aac54"/>
      </g>
      
      {/* Curling tendrils */}
      <path
        d="M98 30 Q102 35 98 42"
        fill="none"
        stroke="#3d7a37"
        strokeWidth="1"
        strokeLinecap="round"
        style={{
          strokeDasharray: 20,
          strokeDashoffset: isHovered ? 0 : 20,
          transition: 'stroke-dashoffset 0.5s ease-out 0.4s'
        }}
      />
      <path
        d="M85 55 Q90 58 87 65"
        fill="none"
        stroke="#3d7a37"
        strokeWidth="1"
        strokeLinecap="round"
        style={{
          strokeDasharray: 20,
          strokeDashoffset: isHovered ? 0 : 20,
          transition: 'stroke-dashoffset 0.5s ease-out 0.5s'
        }}
      />
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
