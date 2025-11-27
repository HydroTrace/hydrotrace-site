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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-0 lg:pl-12">
          
          {/* Left Side - Steps */}
          <div className="relative">
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
          <div className="relative min-h-[620px]">
            {/* Left vertical divider */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
              style={{ backgroundColor: '#D1DBF9' }}
            />
            
            {/* Outer Frame with gradient */}
            <div 
              className="h-full rounded-sm overflow-hidden border transition-all duration-500"
              style={{ borderColor: '#D4DCF6' }}
            >
              {/* Top Gradient Section */}
              <div 
                className="h-16"
                style={{ backgroundColor: '#EEF4FC' }}
              />
              
              {/* Inner White Panel Container */}
              <div className="bg-white mx-0 relative">
                <div className="flex">
                  {/* Left Sidebar Strip */}
                  <div 
                    className="w-14 flex-shrink-0 border-r flex flex-col items-center pt-6"
                    style={{ borderColor: '#D4DCF6' }}
                  >
                    {/* Logo Circle */}
                    <div 
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#D4DCF6' }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: '#336CFF' }}
                      />
                    </div>
                  </div>
                  
                  {/* Main Content Area */}
                  <div className="flex-1">
                    {/* Title Row */}
                    <div 
                      className="px-6 py-5 border-b flex items-center gap-3"
                      style={{ borderColor: '#D4DCF6' }}
                    >
                      <h4 
                        className="text-lg font-medium transition-all duration-300"
                        style={{ color: '#0A1B44' }}
                      >
                        {steps[activeIndex].content.title}
                      </h4>
                      <div 
                        className="ml-auto px-3 py-1 rounded text-xs"
                        style={{ backgroundColor: '#E8EFF8', color: '#6B7A99' }}
                      >
                        
                      </div>
                    </div>
                    
                    {/* Charts Section */}
                    <div 
                      className="px-6 py-6 border-b"
                      style={{ borderColor: '#D4DCF6' }}
                    >
                      {/* Headers Row */}
                      <div className="grid grid-cols-2 gap-8 mb-6">
                        <span 
                          className="text-xs font-medium"
                          style={{ color: '#0A1B44' }}
                        >
                          Gross emissions by category
                        </span>
                        <span 
                          className="text-xs font-medium"
                          style={{ color: '#0A1B44' }}
                        >
                          Gross emissions over time
                        </span>
                      </div>
                      
                      {/* Charts Row */}
                      <div className="grid grid-cols-2 gap-8">
                        {/* Left: Donut + Legend */}
                        <div className="flex items-start gap-5">
                          {/* Donut Chart */}
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <svg viewBox="0 0 36 36" className="w-full h-full">
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="none"
                                stroke="#dbeafe"
                                strokeWidth="4"
                              />
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="none"
                                stroke="#336CFF"
                                strokeWidth="4"
                                strokeDasharray="55 45"
                                strokeLinecap="round"
                                transform="rotate(-90 18 18)"
                              />
                            </svg>
                          </div>
                          
                          {/* Legend */}
                          <div className="grid grid-cols-1 gap-1.5 text-xs">
                            {steps[activeIndex].content.categories.map((cat, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div 
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: cat.color }}
                                />
                                <span style={{ color: '#0A1B44' }}>{cat.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Right: Bar Chart */}
                        <div className="flex items-end gap-1.5 h-20">
                          {[45, 55, 40, 65, 50, 75, 55, 85, 60, 70].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t transition-all duration-300"
                              style={{ 
                                height: `${h}%`,
                                backgroundColor: '#336CFF'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Table Section */}
                    <div className="px-6 py-5">
                      {/* Expandable Header */}
                      <div 
                        className="flex items-center justify-between pb-4 border-b mb-4"
                        style={{ borderColor: '#E8EFF8' }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: '#336CFF' }}>▼</span>
                          <span className="text-sm font-medium" style={{ color: '#0A1B44' }}>
                            Goods & Services
                          </span>
                        </div>
                        <span className="text-sm" style={{ color: '#0A1B44' }}>
                          {steps[activeIndex].content.categories[0]?.value || "177,204"} <span className="text-xs text-[#6B7A99]">tCO₂e</span>
                        </span>
                      </div>
                      
                      {/* Items Table */}
                      <div className="space-y-0">
                        {steps[activeIndex].content.items.map((item, i) => (
                          <div 
                            key={i}
                            className="flex justify-between text-sm py-2 border-b last:border-b-0"
                            style={{ borderColor: '#F0F4F9' }}
                          >
                            <span style={{ color: '#0A1B44' }}>{item.name}</span>
                            <span style={{ color: '#0A1B44' }}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Beige Gradient Section */}
              <div 
                className="h-20"
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
