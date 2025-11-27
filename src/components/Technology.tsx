import { useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Measure",
    description: "Map your carbon footprint in weeks, not months, with the leading climate software",
    content: {
      title: "Carbon footprint",
      categories: [
        { name: "Goods & Services", color: "#1e40af", value: "177,204" },
        { name: "Offices", color: "#93c5fd", value: "" },
        { name: "Marketing", color: "#bfdbfe", value: "" },
        { name: "Cloud", color: "#c7d2fe", value: "" },
        { name: "Employees", color: "#dbeafe", value: "" },
        { name: "Travel", color: "#1e3a8a", value: "" },
      ],
      items: [
        { name: "Accounting & Legal", value: "97,588" },
        { name: "IT", value: "21,739" },
        { name: "Insurance", value: "10,074" },
        { name: "Personnel Costs", value: "4,094" },
      ]
    }
  },
  {
    number: "02",
    title: "Report",
    description: "Prepare and file climate disclosures to meet global regulatory standards",
    content: {
      title: "Disclosure reports",
      categories: [
        { name: "CSRD", color: "#1e40af", value: "" },
        { name: "SEC", color: "#60a5fa", value: "" },
        { name: "CDP", color: "#93c5fd", value: "" },
      ],
      items: [
        { name: "Annual Report", value: "Complete" },
        { name: "Quarterly Update", value: "In Progress" },
        { name: "Audit Trail", value: "Verified" },
      ]
    }
  },
  {
    number: "03",
    title: "Act",
    description: "Set targets, reduce emissions, and track progress to real decarbonization",
    content: {
      title: "Reduction targets",
      categories: [
        { name: "Scope 1", color: "#1e40af", value: "-15%" },
        { name: "Scope 2", color: "#60a5fa", value: "-22%" },
        { name: "Scope 3", color: "#93c5fd", value: "-8%" },
      ],
      items: [
        { name: "Energy efficiency", value: "Active" },
        { name: "Renewable transition", value: "Planning" },
        { name: "Supply chain", value: "Assessment" },
      ]
    }
  },
];

const Technology = ({ className }: { className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const cycleToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(cycleToNext, 3000);
    return () => clearInterval(interval);
  }, [isHovering, cycleToNext]);

  return (
    <section className={cn("py-32 bg-white relative overflow-hidden", className)}>
      <div className="max-w-[1400px] mx-auto px-8 relative">
        
        {/* Left Dashed Vertical Border */}
        <div 
          className="absolute left-8 top-0 bottom-0 w-px hidden lg:block"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom, #336CFF 50%, transparent 50%)',
            backgroundSize: '1px 8px'
          }}
        />

        {/* Vertical HOW IT WORKS Label */}
        <div 
          className="absolute left-0 top-8 hidden lg:flex items-start justify-center"
          style={{ 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            width: '32px'
          }}
        >
          <span 
            className="text-sm tracking-[0.35em] font-normal uppercase"
            style={{ color: '#336CFF', fontFamily: "'Fira Code', monospace" }}
          >
            HOW IT WORKS
          </span>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-20 pt-8 lg:pl-12">
          <h2 
            className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1]"
            style={{ 
              color: '#0A1B44',
              fontFamily: "'DM Serif Display', serif"
            }}
          >
            Making the invisible, visible.
          </h2>
        </div>

        {/* Main Content Grid - aligned columns */}
        <div className="grid lg:grid-cols-2 gap-0 lg:pl-12 items-stretch">
          
          {/* Left Side - Steps */}
          <div className="relative flex flex-col">
            {/* Top border */}
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{ backgroundColor: '#D1DBF9' }}
            />
            
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onMouseEnter={() => {
                  setIsHovering(true);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Bottom border */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: '#D1DBF9' }}
                />
                
                {/* Active underline indicator */}
                <div 
                  className={cn(
                    "absolute bottom-0 left-0 h-[3px] transition-all duration-300 ease-out",
                    activeIndex === index ? "w-28 opacity-100" : "w-0 opacity-0"
                  )}
                  style={{ backgroundColor: '#336CFF' }}
                />
                
                <div className="py-10 pr-12 flex items-start gap-6">
                  {/* Step Number */}
                  <span 
                    className="text-sm font-normal mt-2"
                    style={{ color: '#336CFF' }}
                  >
                    {step.number}
                  </span>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 
                      className={cn(
                        "text-3xl sm:text-4xl font-normal mb-4 transition-colors duration-200"
                      )}
                      style={{ 
                        color: activeIndex === index ? '#0A1B44' : '#336CFF',
                        fontFamily: "'DM Serif Display', serif"
                      }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-base leading-[1.7] max-w-[400px]"
                      style={{ color: '#0A1B44' }}
                    >
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <ArrowRight 
                    className={cn(
                      "w-5 h-5 mt-3 transition-all duration-200 flex-shrink-0",
                      activeIndex === index 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-40 -translate-x-1"
                    )}
                    style={{ color: '#336CFF' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Interactive Panel */}
          <div className="relative h-full">
            {/* Left vertical divider (between columns) */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
              style={{ backgroundColor: '#D1DBF9' }}
            />
            
            {/* OUTER FRAME - with gradient background */}
            <div 
              className="h-full rounded overflow-hidden border flex flex-col"
              style={{ 
                borderColor: '#D4DCF6',
                borderRadius: '4px',
                background: 'linear-gradient(180deg, #EEF4FC 0%, #EEF4FC 8%, #FFFFFF 8%, #FFFFFF 85%, #FAF6EE 85%, #F5EDE0 100%)'
              }}
            >
              {/* Top Blue Gradient Area */}
              <div 
                className="h-12 flex-shrink-0 border-b"
                style={{ 
                  backgroundColor: '#EEF4FC',
                  borderColor: '#D4DCF6'
                }}
              />
              
              {/* INNER WHITE PANEL - sits inside the gradient frame */}
              <div 
                className="flex-1 bg-white flex border-b"
                style={{ borderColor: '#D4DCF6' }}
              >
                {/* Left Sidebar Strip */}
                <div 
                  className="w-12 flex-shrink-0 border-r flex flex-col items-center pt-5"
                  style={{ borderColor: '#D4DCF6' }}
                >
                  {/* Logo Circle Placeholder */}
                  <div 
                    className="w-7 h-7 rounded-full border flex items-center justify-center"
                    style={{ borderColor: '#D4DCF6' }}
                  >
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: '#336CFF' }}
                    />
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                  {/* Title Bar Area (empty placeholder) */}
                  <div 
                    className="h-14 border-b flex-shrink-0"
                    style={{ borderColor: '#D4DCF6' }}
                  >
                    {/* Empty - title goes here */}
                  </div>
                  
                  {/* Charts Area (empty placeholder) */}
                  <div 
                    className="flex-1 border-b min-h-[200px]"
                    style={{ borderColor: '#D4DCF6' }}
                  >
                    {/* Empty - charts go here */}
                  </div>
                  
                  {/* Table Area (empty placeholder) */}
                  <div className="flex-1 min-h-[160px]">
                    {/* Empty - table goes here */}
                  </div>
                </div>
              </div>
              
              {/* Bottom Beige Gradient Footer (outside inner white panel) */}
              <div 
                className="h-16 flex-shrink-0"
                style={{ 
                  background: 'linear-gradient(180deg, #FAF6EE 0%, #F5EDE0 100%)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
