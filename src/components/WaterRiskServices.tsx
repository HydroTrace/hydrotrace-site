const services = [
  {
    title: "Crop-Water Assessment",
    image: "/images/services/crop-water.jpg",
    alt: "Aerial view of irrigated farmland fields",
    description:
      "Field-level yield distributions and revenue-at-risk from physically-based crop-water simulation.",
  },
  {
    title: "Water Market Intelligence",
    image: "/images/services/water-market.jpg",
    alt: "River flowing through forested gorge",
    description:
      "Storage, allocation, price, and crop demand in one integrated view.",
  },
];

const WaterRiskServices = () => {
  return (
    <section className="relative bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr]">
        {/* Label column */}
        <div className="relative px-8 md:px-10 py-12 md:py-20">
          <span className="text-[14px] tracking-[0.22em] font-mono text-white/70 uppercase">
            Water Risk Services
          </span>
        </div>

        {/* Card 1 */}
        <article className="relative px-8 md:px-12 py-12 md:py-16">
          <h2 className="font-serif text-[34px] md:text-[46px] font-light mb-8 md:mb-10">
            {services[0].title}
          </h2>
          <div className="aspect-[4/3] max-w-[520px] overflow-hidden mb-6">
            <img
              src={services[0].image}
              alt={services[0].alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-base md:text-[15px] leading-relaxed text-white/85 mb-10 max-w-xl font-['Brown_Std']">
            {services[0].description}
          </p>
          <div className="flex items-center gap-4 text-white/50">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30">
              <span className="block w-1.5 h-1.5 rounded-full bg-white/40" />
            </span>
            <span className="text-xs tracking-[0.22em] font-mono uppercase">
              Coming Soon
            </span>
          </div>
        </article>

        {/* Card 2 */}
        <article className="relative px-8 md:px-12 py-12 md:py-16">
          <h2 className="font-serif text-[34px] md:text-[46px] font-light mb-8 md:mb-10">
            {services[1].title}
          </h2>
          <div className="aspect-[4/3] max-w-[520px] overflow-hidden mb-6">
            <img
              src={services[1].image}
              alt={services[1].alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-base md:text-[15px] leading-relaxed text-white/85 mb-10 max-w-xl font-['Brown_Std']">
            {services[1].description}
          </p>
          <div className="flex items-center gap-4 text-white/50">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30">
              <span className="block w-1.5 h-1.5 rounded-full bg-white/40" />
            </span>
            <span className="text-xs tracking-[0.22em] font-mono uppercase">
              Coming Soon
            </span>
          </div>
        </article>
      </div>

      {/* Thick left divider — full height, between label and card 1 */}
      <div
        className="hidden md:block absolute top-0 bottom-0 w-[2px] bg-white"
        style={{ left: "220px" }}
      />

      {/* Middle divider — starts at title level, between card 1 and card 2 */}
      <div
        className="hidden md:block absolute w-px bg-white"
        style={{ left: "calc(50% + 110px)", top: "6.5rem", bottom: "0" }}
      />
    </section>
  );
};

export default WaterRiskServices;
