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
        { name: "Offices", color: "#60a5fa", value: "" },
        { name: "Marketing", color: "#93c5fd", value: "" },
        { name: "Cloud", color: "#bfdbfe", value: "" },
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
    <section className={cn("py-24 bg-white relative", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative">
          {/* Vertical Label */}
          <div 
            className="absolute left-0 top-0 hidden lg:flex items-center"
            style={{ 
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg) translateX(60px)',
              height: '120px'
            }}
          >
            <span 
              className="text-xs tracking-[0.3em] font-medium"
              style={{ color: '#1e40af' }}
            >
              HOW IT WORKS
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-16 pl-8 lg:pl-16">
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-light"
              style={{ 
                color: '#0a1b44',
                fontFamily: "'DM Serif Text', serif"
              }}
            >
              Making the invisible, visible.
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-0 pl-8 lg:pl-16">
            {/* Left Side - Steps */}
            <div className="relative">
              {/* Top border line */}
              <div 
                className="absolute top-0 left-0 right-0 h-px"
                style={{ backgroundColor: '#c7d2e8' }}
              />
              
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer group"
                  onMouseEnter={() => {
                    setIsHovering(true);
                    setActiveIndex(index);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Bottom border line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ backgroundColor: '#c7d2e8' }}
                  />
                  
                  {/* Active indicator line */}
                  <div 
                    className={cn(
                      "absolute bottom-0 left-0 h-[3px] transition-all duration-300 ease-out",
                      activeIndex === index ? "w-24 opacity-100" : "w-0 opacity-0"
                    )}
                    style={{ backgroundColor: '#1e40af' }}
                  />
                  
                  <div className="py-8 pr-8 flex items-start gap-4">
                    {/* Step Number */}
                    <span 
                      className="text-sm font-medium mt-1"
                      style={{ color: '#1e40af' }}
                    >
                      {step.number}
                    </span>
                    
                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 
                        className={cn(
                          "text-2xl sm:text-3xl font-medium mb-3 transition-colors duration-200",
                          activeIndex === index ? "text-[#0a1b44]" : "text-[#1e40af]"
                        )}
                        style={{ fontFamily: "'DM Serif Text', serif" }}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className="text-base leading-relaxed max-w-md"
                        style={{ color: '#64748b' }}
                      >
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Arrow */}
                    <ArrowRight 
                      className={cn(
                        "w-5 h-5 mt-2 transition-all duration-200",
                        activeIndex === index 
                          ? "opacity-100 translate-x-0" 
                          : "opacity-50 -translate-x-1"
                      )}
                      style={{ color: '#1e40af' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Interactive Panel */}
            <div className="relative">
              {/* Vertical divider */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
                style={{ backgroundColor: '#c7d2e8' }}
              />
              
              {/* Right border */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-px hidden lg:block"
                style={{ backgroundColor: '#c7d2e8' }}
              />
              
              {/* Content Panel */}
              <div className="lg:pl-8 pt-4">
                <div 
                  className="rounded-lg overflow-hidden border-2 transition-all duration-500"
                  style={{ 
                    borderColor: '#a5b4d4',
                    background: 'linear-gradient(180deg, #e8f0fc 0%, #faf8f4 100%)'
                  }}
                >
                  {/* Panel Header */}
                  <div className="p-6 border-b" style={{ borderColor: '#d4dff0' }}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#e8f0fc' }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: '#1e40af' }}
                        />
                      </div>
                      <h4 
                        className="text-xl font-semibold transition-all duration-300"
                        style={{ color: '#0a1b44' }}
                      >
                        {steps[activeIndex].content.title}
                      </h4>
                    </div>
                  </div>
                  
                  {/* Panel Content */}
                  <div className="p-6">
                    {/* Categories Header */}
                    <div className="flex justify-between text-xs font-medium mb-4" style={{ color: '#1e40af' }}>
                      <span>Gross emissions by category</span>
                      <span>Gross emissions over time</span>
                    </div>
                    
                    {/* Chart Area */}
                    <div className="flex items-center gap-8 mb-6">
                      {/* Donut Chart Placeholder */}
                      <div className="relative w-20 h-20">
                        <svg viewBox="0 0 36 36" className="w-full h-full">
                          <circle
                            cx="18"
                            cy="18"
                            r="15.5"
                            fill="none"
                            stroke="#dbeafe"
                            strokeWidth="3"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15.5"
                            fill="none"
                            stroke="#1e40af"
                            strokeWidth="3"
                            strokeDasharray="60 40"
                            strokeLinecap="round"
                            transform="rotate(-90 18 18)"
                          />
                        </svg>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        {steps[activeIndex].content.categories.map((cat, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span style={{ color: '#64748b' }}>{cat.name}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Bar Chart Placeholder */}
                      <div className="flex items-end gap-1 h-16 ml-auto">
                        {[40, 55, 35, 70, 45, 80, 60, 90, 50, 65].map((h, i) => (
                          <div
                            key={i}
                            className="w-2 rounded-t transition-all duration-300"
                            style={{ 
                              height: `${h}%`,
                              backgroundColor: '#1e40af'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Expandable Section */}
                    <div 
                      className="border-t pt-4"
                      style={{ borderColor: '#d4dff0' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: '#64748b' }}>▼</span>
                          <span className="text-sm font-medium" style={{ color: '#0a1b44' }}>
                            Goods & Services
                          </span>
                        </div>
                        <span className="text-sm" style={{ color: '#64748b' }}>
                          {steps[activeIndex].content.categories[0]?.value || "177,204"} tCO₂e
                        </span>
                      </div>
                      
                      {/* Items List */}
                      <div className="space-y-2 pl-5">
                        {steps[activeIndex].content.items.map((item, i) => (
                          <div 
                            key={i}
                            className="flex justify-between text-sm py-1"
                          >
                            <span style={{ color: '#64748b' }}>{item.name}</span>
                            <span style={{ color: '#64748b' }}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Panel Footer */}
                  <div 
                    className="h-12"
                    style={{ 
                      background: 'linear-gradient(180deg, #f5efe6 0%, #f0e6d8 100%)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;