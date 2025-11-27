import AnimatedSpiral from './AnimatedSpiral';

interface HeroProps {
  title?: string;
  description?: string;
}

const Hero = ({
  title = "Building Digital Foundations for Water Governance",
  description = "From Source to System — Traceable, Trustworthy, and Adaptive Water Management."
}: HeroProps) => {

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-background"
    >
      {/* White area behind navbar */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-background z-[1]" />

      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden top-24">
        {/* Grid pattern - smaller squares, more transparent */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
        {/* Stronger fade overlay from center-left */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 80% at 25% 50%, hsl(var(--background)) 0%, hsl(var(--background) / 0.9) 30%, transparent 70%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="max-w-2xl">
            {/* Tag */}
            <span 
              className="font-medium tracking-wider text-sm uppercase mb-4 block font-['Roboto']"
              style={{ color: '#030bfc' }}
            >
              Water Governance
            </span>
            
            {/* Title */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 leading-tight font-['Open_Sans']"
              style={{ color: '#21177a' }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg mb-8 leading-relaxed font-['Fira_Code'] uppercase tracking-wide"
              style={{ color: '#249be0' }}
            >
              {description}
            </p>

            {/* CTA */}
            <button
              onClick={scrollToAbout}
              className="inline-flex items-center gap-2 bg-[#044cdb] px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#044cdb]/90 font-['Roboto']"
            >
              Learn More
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Right side - Animated Spiral */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center">
              <AnimatedSpiral className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
