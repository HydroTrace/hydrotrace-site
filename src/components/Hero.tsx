interface HeroProps {
  title?: string;
  description?: string;
}

const Hero = ({
  title = "Digital Infrastructure for Water Governance and Water Risk",
  description = "From abstraction reporting to crop-water risk screening — transparent, trustworthy, and adaptive water management.",
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
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-2xl">
          <span className="font-normal tracking-[0.2em] text-sm uppercase mb-6 block font-['Brown_Std'] text-[#9ec5e8]">
            Water Intelligence
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-[1.1] font-['Reckless_Neue'] text-white">
            {title}
          </h1>

          <p className="text-lg mb-10 leading-relaxed font-['Brown_Std'] font-light text-white/85 max-w-xl">
            {description}
          </p>

          <button
            onClick={scrollToAbout}
            className="inline-flex items-center gap-3 border border-white/70 px-7 py-3 text-base font-light text-white transition-all duration-300 hover:bg-white/10 font-['Brown_Std']"
          >
            Learn More
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
