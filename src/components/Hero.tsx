import heroBg from "@/assets/hydrotrace-background.png.asset.json";

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
      style={{
        backgroundImage: `url(${heroBg.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left fade for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(8,14,20,0.85) 0%, rgba(8,14,20,0.55) 40%, rgba(8,14,20,0.15) 70%, rgba(8,14,20,0) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-2xl">
          {/* Tag */}
          <span
            className="font-normal tracking-[0.2em] text-sm uppercase mb-6 block font-['Brown_Std'] text-[#9ec5e8]"
          >
            Water Intelligence
          </span>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-[1.1] font-['Reckless_Neue'] text-white"
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg mb-10 leading-relaxed font-['Brown_Std'] font-light text-white/85 max-w-xl"
          >
            {description}
          </p>

          {/* CTA */}
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
