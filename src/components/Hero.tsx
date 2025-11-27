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
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Fade overlay from center */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 30% 50%, hsl(var(--background)) 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="max-w-xl">
            {/* Tag */}
            <span className="text-accent font-medium tracking-wider text-sm uppercase mb-4 block">
              Water Governance
            </span>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight font-['DM_Serif_Text']">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>

            {/* CTA */}
            <button
              onClick={scrollToAbout}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-foreground transition-all duration-300 hover:bg-accent/90"
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

          {/* Right side - Image placeholder */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center">
              {/* Placeholder for future image */}
              <div className="text-muted-foreground/30 text-center">
                <p className="text-sm">Image area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
