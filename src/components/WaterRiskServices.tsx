const services = [
  {
    title: "Crop-Water Assessment",
    image: "/images/services/crop-water.jpg",
    alt: "Aerial view of irrigated farmland fields",
    description:
      "Leveraging 40 years of satellite imagery, we remotely identify irrigated vs rain-fed areas and classify crops using our in-house database. We combine real-time weather data with irrigation schedules to deliver precise water audits — making it easy to meet due-diligence and regulatory requirements.",
    linkText: "Coming Soon",
    linkHref: "#",
  },
  {
    title: "Insights",
    image: "/images/services/crop-water.jpg",
    alt: "Aerial view of irrigated farmland fields",
    description:
      "Analysis and perspectives on water risk in agriculture and capital markets.",
    linkText: "Read on blog",
    linkHref: "/blog",
  },
];

const WaterRiskServices = () => {
  return (
    <section className="relative bg-black text-white min-h-screen flex items-center py-32 md:py-48">
      <div className="w-full grid grid-cols-1 md:grid-cols-[220px_auto_auto_1fr] relative">
        {/* Label column */}
        <div className="px-8 md:px-10 pt-2">
          <span className="text-[14px] tracking-[0.22em] font-mono text-white/70 uppercase leading-tight block">
            Water Risk<br />Services
          </span>
        </div>

        {/* Card 1 */}
        <article className="px-8 md:px-12 max-w-[580px]">
          <h2 className="font-serif text-[34px] md:text-[46px] font-light mb-10">
            {services[0].title}
          </h2>
          <div className="aspect-[4/3] max-w-[520px] overflow-hidden mb-8">
            <img
              src={services[0].image}
              alt={services[0].alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[15px] leading-relaxed text-white/85 mb-12 max-w-md font-['Brown_Std']">
            {services[0].description}
          </p>
          <span className="inline-flex items-center gap-3 text-white/40">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-xs tracking-[0.22em] font-mono uppercase">
              {services[0].linkText}
            </span>
          </span>
        </article>

        {/* Card 2 */}
        <article className="px-8 md:px-12 max-w-[580px]">
          <h2 className="font-serif text-[34px] md:text-[46px] font-light mb-10">
            {services[1].title}
          </h2>
          <div className="aspect-[4/3] max-w-[520px] overflow-hidden mb-8">
            <img
              src={services[1].image}
              alt={services[1].alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[15px] leading-relaxed text-white/85 mb-12 max-w-md font-['Brown_Std']">
            {services[1].description}
          </p>
          <a
            href={services[1].linkHref}
            className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 group-hover:border-white/60 transition-colors">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-white/60 group-hover:text-white transition-colors"
              >
                <path
                  d="M1 6H11M11 6L6 1M11 6L6 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-xs tracking-[0.22em] font-mono uppercase">
              {services[1].linkText}
            </span>
          </a>
        </article>

        {/* Thick left divider — full section height, between label and cards */}
        <div className="hidden md:block absolute top-[-8rem] md:top-[-12rem] bottom-[-8rem] md:bottom-[-12rem] w-[2px] bg-white left-[220px]" />
      </div>
    </section>
  );
};

export default WaterRiskServices;
