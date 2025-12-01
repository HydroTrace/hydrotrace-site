import { useRef, useEffect } from "react";
import { FileCheck, Clock, Leaf, Shield, Archive, Scale, AlertTriangle, FileText, ArrowLeftRight } from "lucide-react";

const complianceCards = [
  {
    icon: FileCheck,
    title: "Stay within allocated abstraction volumes",
    description: "Verify use against seasonal or annual limits."
  },
  {
    icon: Clock,
    title: "Submit required usage reports on time",
    description: "Automated reminders and ready-to-file formats."
  },
  {
    icon: Leaf,
    title: "Demonstrate conservation and efficiency measures",
    description: "Document improvements directly from the field."
  },
  {
    icon: Shield,
    title: "Prove compliance with licensed quotas",
    description: "Maintain time-stamped, verifiable usage records."
  },
  {
    icon: Archive,
    title: "Maintain defensible audit records",
    description: "Transparent, tamper-resistant data trails."
  },
  {
    icon: Scale,
    title: "Track water-balance components",
    description: "Support basin planning with complete inputs."
  },
  {
    icon: AlertTriangle,
    title: "Identify and act on non-compliance",
    description: "Spot breaches early with automated checks."
  },
  {
    icon: FileText,
    title: "Produce statutory reports for higher authorities",
    description: "Generate submissions aligned with national rules."
  },
  {
    icon: ArrowLeftRight,
    title: "Certify unused allocation for water trades",
    description: "Pre-trade validation of entitlement and unused volume."
  }
];

const ComplianceCard = ({ card }: { card: typeof complianceCards[0] }) => {
  const Icon = card.icon;
  
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-lg shadow-sm border border-gray-100 p-5 mx-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="mb-3">
        <Icon className="w-6 h-6 text-[#5DA9E9] stroke-[1.5]" />
      </div>
      <h4 className="font-['Open_Sans'] font-semibold text-[#21177a] text-sm leading-tight mb-2">
        {card.title}
      </h4>
      <p className="font-['Open_Sans'] text-xs text-[#21177a]/60 leading-relaxed">
        {card.description}
      </p>
    </div>
  );
};

const ComplianceSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset when we've scrolled through half the content (since content is duplicated)
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-l mb-4">Compliance Made Easy</h2>
          <p className="font-['Open_Sans'] text-[#21177a]/70 text-lg max-w-2xl mx-auto leading-relaxed">
            A streamlined way to meet your water-law obligations — aligned with national frameworks, basin rules, and jurisdiction-specific regulations.
          </p>
        </div>

        {/* Flowline SVG - Connecting curve */}
        <div className="relative">
          <svg 
            className="absolute left-1/2 -translate-x-1/2 -top-8 w-full max-w-4xl h-24 pointer-events-none"
            viewBox="0 0 800 80"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Vertical line from top */}
            <path
              d="M 400 0 L 400 30 Q 400 50 420 50 L 800 50"
              fill="none"
              stroke="#5DA9E9"
              strokeWidth="2"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
            {/* Left side horizontal extension */}
            <path
              d="M 400 30 Q 400 50 380 50 L 0 50"
              fill="none"
              stroke="#5DA9E9"
              strokeWidth="2"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          </svg>

          {/* Horizontal dashed line track */}
          <div className="absolute left-0 right-0 top-16 h-0.5 border-t-2 border-dashed border-[#5DA9E9]/40" />

          {/* Scrolling cards container */}
          <div className="pt-20 relative">
            <div 
              ref={scrollRef}
              className="flex overflow-hidden"
              style={{ scrollBehavior: 'auto' }}
            >
              {/* Duplicate cards for seamless loop */}
              {[...complianceCards, ...complianceCards].map((card, index) => (
                <ComplianceCard key={index} card={card} />
              ))}
            </div>

            {/* Fade edges */}
            <div className="absolute left-0 top-20 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-20 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
