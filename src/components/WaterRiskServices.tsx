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
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr_1fr] divide-y md:divide-y-0 md:divide-x divide-white/15">
        <div className="px-8 md:px-10 py-12 md:py-20">
          <span className="text-[14px] tracking-[0.22em] font-mono text-white/70 uppercase">
            Water Risk Services
          </span>
        </div>

        {services.map((s) => (
          <article key={s.title} className="px-8 md:px-12 py-12 md:py-16">
            <h2 className="font-serif text-[34px] md:text-[46px] font-light mb-8 md:mb-10">
              {s.title}
            </h2>
            <div className="aspect-[4/3] w-full overflow-hidden mb-6">
              <img
                src={s.image}
                alt={s.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base md:text-[15px] leading-relaxed text-white/85 mb-10 max-w-xl font-['Brown_Std']">
              {s.description}
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
        ))}
      </div>
    </section>
  );
};

export default WaterRiskServices;
