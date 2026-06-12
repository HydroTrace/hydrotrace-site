interface HeroProps {
  title?: string;
  description?: string;
}

const Hero = ({
  title = "Digital infrastructure for water governance and water risk.",
  description = "From abstraction reporting to crop-water risk screening — transparent, trustworthy, and adaptive water management.",
}: HeroProps) => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <div className="relative z-20 w-full pb-20 lg:pb-24">
        {/* Vertical streaming lines — start at headline top */}
        <div
          aria-hidden
          className="hidden lg:block pointer-events-none absolute top-0 bottom-0 w-px bg-white/40"
          style={{ left: "calc(4rem + 180px + 1.25rem)" }}
        />
        <div
          aria-hidden
          className="hidden lg:block pointer-events-none absolute top-0 bottom-0 w-px bg-white/15"
          style={{ left: "4rem" }}
        />


        <div className="px-6 sm:px-10 lg:px-16">
          <div className="flex items-end gap-10">
            {/* Eyebrow label far left */}
            <div className="hidden lg:block w-[180px] shrink-0 pb-3">
              <span className="font-['Brown_Std'] font-normal tracking-[0.22em] text-[11px] uppercase text-white/90">
                Water Intelligence
              </span>
            </div>

            {/* Main headline + content */}
            <div className="flex-1 max-w-[1100px]">
              <span className="lg:hidden block font-['Brown_Std'] tracking-[0.22em] text-[11px] uppercase text-white/90 mb-6">
                Water Intelligence
              </span>

              <h1 className="font-['Reckless_Neue'] font-light text-white leading-[1.05] tracking-[-0.01em] text-[40px] sm:text-[56px] lg:text-[76px] xl:text-[88px]">
                {title}
              </h1>

              <p className="mt-8 max-w-2xl font-['Brown_Std'] font-light text-white/85 text-base sm:text-lg leading-relaxed">
                {description}
              </p>

              <button
                onClick={scrollToAbout}
                aria-label="Scroll to learn more"
                className="mt-10 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/70 text-white transition-colors hover:bg-white/10"
              >
                <span aria-hidden className="text-lg leading-none">↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
