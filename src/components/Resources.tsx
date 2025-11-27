import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Numbers you can trust",
    description: "Get the highest-quality water governance data, with methodologies developed by in-house experts and vetted by third-party auditors.",
    link: "OUR APPROACH TO WATER DATA",
    href: "#"
  },
  {
    title: "Impact you can prove",
    description: "HydroTrace is the only platform purpose-built for real results. Set targets, model and track usage, and ensure compliance with our industry-leading tools.",
    link: "BUILD A HIGH-IMPACT WATER PROGRAM",
    href: "#"
  }
];

const Resources = ({ className }: { className?: string }) => {
  return (
    <section className={cn("py-32 relative overflow-hidden", className)} style={{ backgroundColor: '#F8F7F4' }}>
      {/* Grid Background with gradients */}
      <div className="absolute inset-0">
        {/* Base grid pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
        {/* Subtle gradient overlays - beige/purple tints */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 30%, rgba(230, 220, 250, 0.4) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 70%, rgba(250, 240, 230, 0.5) 0%, transparent 60%),
              radial-gradient(ellipse 40% 30% at 50% 50%, rgba(240, 235, 250, 0.3) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Vertical dashed lines */}
      <div 
        className="absolute left-[15%] top-0 bottom-0 w-px hidden lg:block"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, #D1DBF9 50%, transparent 50%)',
          backgroundSize: '1px 8px'
        }}
      />
      <div 
        className="absolute right-[15%] top-0 bottom-0 w-px hidden lg:block"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, #D1DBF9 50%, transparent 50%)',
          backgroundSize: '1px 8px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column */}
          <div>
            {/* Main Headline */}
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.15] mb-16"
              style={{ 
                color: '#336CFF',
                fontFamily: "'DM Serif Display', serif"
              }}
            >
              The HydroTrace<br />
              difference
            </h2>
            
            {/* Placeholder Image */}
            <div 
              className="aspect-[4/3] rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#E8EEF8' }}
            >
              <span className="text-[#A0B0C8] text-sm">Placeholder image</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="pt-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "pb-10",
                  index < features.length - 1 && "mb-10 border-b",
                )}
                style={{ borderColor: '#D1DBF9' }}
              >
                {/* Top border for first item */}
                {index === 0 && (
                  <div 
                    className="h-px w-full mb-8"
                    style={{ backgroundColor: '#D1DBF9' }}
                  />
                )}
                
                <h3 
                  className="text-2xl sm:text-3xl font-normal mb-5"
                  style={{ 
                    color: '#0A1B44',
                    fontFamily: "'DM Serif Display', serif"
                  }}
                >
                  {feature.title}
                </h3>
                
                <p 
                  className="text-base leading-[1.8] mb-6"
                  style={{ color: '#0A1B44' }}
                >
                  {feature.description}
                </p>
                
                <a 
                  href={feature.href}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] transition-all duration-200 hover:gap-3"
                  style={{ color: '#336CFF', fontFamily: "'Fira Code', monospace" }}
                >
                  {feature.link}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
