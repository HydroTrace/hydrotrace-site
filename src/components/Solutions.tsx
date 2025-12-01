import { useState, useEffect, useRef } from "react";

const solutions = [
  { 
    title: "Water Stewards",
    description: "HydroTrace helps water regulators collect, manage, and standardize the abstraction data required by their water laws. Reduce errors, unify reporting across farms and seasons, and replace scattered spreadsheets with a clear, auditable digital workflow tailored to national and regional regulations.\n\nBuild a database you can actually use: monitor trends, verify reporting, support enforcement, and produce regulatory submissions that align seamlessly with your jurisdiction's compliance framework, quickly and confidently."
  },
  { 
    title: "Farmers",
    description: "HydroTrace makes water reporting simple, accurate, and stress-free. Skip the field notebook and manual entries. Capture water-use data automatically, stay compliant with local requirements, and get a reliable picture of your abstractions throughout the season.\n\nSpend less time on paperwork and more time farming, all while protecting your allocation and reducing the risk of compliance issues."
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

const WaterSeepageOverlay = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute top-0 right-0 w-24 h-32 pointer-events-none">
    <svg 
      viewBox="0 0 80 110" 
      className="w-full h-full"
      style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease-out' }}
    >
      {/* Water drip 1 - main drip */}
      <path
        d="M70 0 L70 25 Q70 32 68 38 L68 55 Q68 62 66 70 L66 85"
        fill="none"
        stroke="#7db8e0"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: isHovered ? 0 : 100,
          transition: 'stroke-dashoffset 0.8s ease-out'
        }}
      />
      
      {/* Water drip 2 */}
      <path
        d="M58 0 L58 18 Q57 25 55 32 L55 48 Q54 55 52 65"
        fill="none"
        stroke="#a8d4f0"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 80,
          strokeDashoffset: isHovered ? 0 : 80,
          transition: 'stroke-dashoffset 0.7s ease-out 0.1s'
        }}
      />
      
      {/* Water drip 3 */}
      <path
        d="M78 8 L78 35 Q77 42 75 50 L75 72"
        fill="none"
        stroke="#c5e4f7"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 70,
          strokeDashoffset: isHovered ? 0 : 70,
          transition: 'stroke-dashoffset 0.6s ease-out 0.15s'
        }}
      />
      
      {/* Water drip 4 - thin */}
      <path
        d="M50 0 L50 12 Q49 18 47 25 L47 40"
        fill="none"
        stroke="#7db8e0"
        strokeWidth="1"
        strokeLinecap="round"
        style={{
          strokeDasharray: 50,
          strokeDashoffset: isHovered ? 0 : 50,
          transition: 'stroke-dashoffset 0.5s ease-out 0.2s'
        }}
      />
      
      {/* Water drip 5 */}
      <path
        d="M64 5 L64 30 Q63 38 61 45 L61 60"
        fill="none"
        stroke="#a8d4f0"
        strokeWidth="1.3"
        strokeLinecap="round"
        style={{
          strokeDasharray: 65,
          strokeDashoffset: isHovered ? 0 : 65,
          transition: 'stroke-dashoffset 0.65s ease-out 0.12s'
        }}
      />
      
      {/* Water droplets at ends */}
      <g style={{ 
        opacity: isHovered ? 1 : 0, 
        transition: 'opacity 0.3s ease-out 0.6s'
      }}>
        <ellipse cx="66" cy="88" rx="3" ry="4" fill="#7db8e0"/>
        <ellipse cx="52" cy="68" rx="2.5" ry="3.5" fill="#a8d4f0"/>
        <ellipse cx="75" cy="75" rx="2" ry="3" fill="#c5e4f7"/>
        <ellipse cx="47" cy="43" rx="2" ry="2.5" fill="#7db8e0"/>
        <ellipse cx="61" cy="63" rx="2" ry="3" fill="#a8d4f0"/>
      </g>
      
      {/* Small splash marks */}
      <g style={{ 
        opacity: isHovered ? 1 : 0, 
        transition: 'opacity 0.3s ease-out 0.7s'
      }}>
        <circle cx="68" cy="92" r="1.5" fill="#c5e4f7"/>
        <circle cx="63" cy="90" r="1" fill="#a8d4f0"/>
        <circle cx="54" cy="70" r="1" fill="#c5e4f7"/>
      </g>
    </svg>
  </div>
);

const FootprintOverlay = ({ isHovered }: { isHovered: boolean }) => (
  <div className="absolute top-0 right-0 w-28 h-36 pointer-events-none">
    <svg 
      viewBox="0 0 100 130" 
      className="w-full h-full"
    >
      {/* First footprint - top right, more visible */}
      <g 
        style={{ 
          opacity: isHovered ? 0.85 : 0, 
          transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.5s ease-out 0.1s'
        }}
      >
        {/* Toes - water droplet circles */}
        <ellipse cx="72" cy="8" rx="4" ry="5" fill="#3366a8"/>
        <ellipse cx="82" cy="12" rx="3.5" ry="4.5" fill="#3366a8"/>
        <ellipse cx="90" cy="18" rx="3" ry="4" fill="#3366a8"/>
        <ellipse cx="63" cy="12" rx="3" ry="4" fill="#3366a8"/>
        <ellipse cx="56" cy="18" rx="2.5" ry="3.5" fill="#3366a8"/>
        
        {/* Main foot body */}
        <path
          d="M62 22 Q58 28 60 38 Q62 48 68 55 Q72 60 72 68 Q72 75 68 80 L76 80 Q80 72 78 62 Q76 52 82 42 Q88 32 86 24 Q84 20 78 20 Q72 20 66 22 Z"
          fill="#3366a8"
        />
      </g>
      
      {/* Second footprint - lower left, more transparent */}
      <g 
        style={{ 
          opacity: isHovered ? 0.4 : 0, 
          transform: isHovered ? 'translateY(0)' : 'translateY(-15px)',
          transition: 'all 0.6s ease-out 0.4s'
        }}
      >
        {/* Toes - water droplet circles */}
        <ellipse cx="42" cy="48" rx="3.5" ry="4.5" fill="#3366a8"/>
        <ellipse cx="51" cy="52" rx="3" ry="4" fill="#3366a8"/>
        <ellipse cx="58" cy="58" rx="2.8" ry="3.5" fill="#3366a8"/>
        <ellipse cx="34" cy="52" rx="2.8" ry="3.5" fill="#3366a8"/>
        <ellipse cx="28" cy="58" rx="2.5" ry="3" fill="#3366a8"/>
        
        {/* Main foot body */}
        <path
          d="M34 62 Q30 68 32 76 Q34 84 39 90 Q42 94 42 100 Q42 106 39 110 L46 110 Q49 104 48 96 Q46 88 51 80 Q56 72 54 64 Q52 60 48 60 Q42 60 38 62 Z"
          fill="#3366a8"
        />
      </g>
      
      {/* Third footprint hint - very faint */}
      <g 
        style={{ 
          opacity: isHovered ? 0.15 : 0, 
          transform: isHovered ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.7s ease-out 0.7s'
        }}
      >
        <ellipse cx="18" cy="88" rx="3" ry="4" fill="#3366a8"/>
        <ellipse cx="26" cy="92" rx="2.5" ry="3.5" fill="#3366a8"/>
        <ellipse cx="32" cy="97" rx="2.3" ry="3" fill="#3366a8"/>
        <ellipse cx="11" cy="92" rx="2.3" ry="3" fill="#3366a8"/>
        <path
          d="M12 100 Q9 105 10 112 Q12 118 16 122 L22 122 Q24 117 23 112 Q21 106 25 100 Q28 94 26 100 Q24 96 20 96 Q16 96 14 98 Z"
          fill="#3366a8"
        />
      </g>
    </svg>
  </div>
);

const SolutionCard = ({ solution, index }: { solution: typeof solutions[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Check if element starts below the viewport
    const rect = card.getBoundingClientRect();
    const startsBelow = rect.top > window.innerHeight;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          // Only animate if it started below viewport or after a small delay
          if (startsBelow) {
            hasAnimated.current = true;
            setIsVisible(true);
          } else {
            // For elements in view on load, animate after scroll starts
            setTimeout(() => {
              if (!hasAnimated.current) {
                hasAnimated.current = true;
                setIsVisible(true);
              }
            }, 500);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white border border-[#c5d4e8] rounded-sm p-8 flex flex-col justify-between min-h-[200px] hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden"
    >
      {index === 0 && <WaterSeepageOverlay isHovered={isVisible} />}
      {index === 1 && <VineOverlay isHovered={isVisible} />}
      {index === 2 && <FootprintOverlay isHovered={isVisible} />}
      
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
  );
};

const Solutions = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
