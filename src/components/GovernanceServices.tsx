const services = [
  {
    title: "Licence Adequacy Assessment",
    image: "/images/services/licence-adequacy.jpg",
    alt: "Aerial view of irrigation pivot watering green agricultural field",
    description:
      "We estimate crop water demand from physical simulation and compare it against licensed abstraction volumes. Where licence information or abstraction records are unavailable, we can independently estimate the volumes a crop and location require under current and future conditions. This gives operators, regulators, and investors a probabilistic assessment of whether a licence is adequate, whether demand is being met, and where water use is likely to concentrate across a catchment.",
  },
  {
    title: "Water Use Transparency",
    image: "/images/services/water-transparency.png",
    alt: "Aerial view of catchment showing fields, water bodies, and irrigation networks",
    description:
      "A digital layer for real time abstraction reporting, licence utilisation monitoring, and catchment scale water use analysis. Integrating satellite derived demand estimates with licence register data to support more transparent and adaptive water allocation systems.",
  },
];

const GovernanceServices = () => {
  return (
    <section className="relative bg-black text-white min-h-screen flex items-center py-32 md:py-48">
      <div className="w-full flex flex-col xl:flex-row relative">
        {/* Left sidebar */}
        <div className="xl:w-[420px] 2xl:w-[480px] shrink-0 px-8 md:px-10 lg:px-12 pt-2 pb-16 xl:pb-0">
          <span className="text-[14px] tracking-[0.22em] font-mono text-white/70 uppercase leading-tight block mb-10">
            Water<br />Governance
          </span>
          <p className="font-['Reckless_Neue'] text-[22px] xl:text-[26px] font-light italic text-white/90 leading-[1.45]">
            Effective water management depends on knowing how much water is being used, where, and by whom. We help regulators, water authorities, and catchment managers build the data foundation that makes this possible. By combining physical demand estimation, licence register analysis, and satellite derived observations, we support more transparent, more adaptive, and more equitable allocation systems.
          </p>
        </div>

        {/* Vertical divider */}
        <div className="hidden xl:block absolute top-[-8rem] xl:top-[-12rem] bottom-[-8rem] xl:bottom-[-12rem] w-[2px] bg-white xl:left-[420px] 2xl:left-[480px]" />

        {/* Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          {/* Card 1 */}
          <article className="px-8 md:px-12 max-w-[580px]">
            <h2 className="font-['Reckless_Neue'] text-[34px] md:text-[46px] font-light mb-10">
              {services[0].title}
            </h2>
            <div className="aspect-[4/3] max-w-[520px] overflow-hidden mb-8 relative">
              <img
                src={services[0].image}
                alt={services[0].alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" aria-hidden />
            </div>
            <p className="text-[15px] leading-relaxed text-white/85 mb-12 max-w-md font-['Brown_Std']">
              {services[0].description}
            </p>
            <a
              href="mailto:info@hydrotrace.io"
              className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 group-hover:border-white/60 transition-colors">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-xs tracking-[0.22em] font-mono uppercase">
                Request an assessment
              </span>
            </a>
          </article>

          {/* Card 2 */}
          <article className="relative px-8 md:px-12 md:border-l md:border-white/90 max-w-[580px]">
            <h2 className="font-['Reckless_Neue'] text-[34px] md:text-[46px] font-light mb-10">
              {services[1].title}
            </h2>
            <div className="aspect-[4/3] max-w-[520px] overflow-hidden mb-8 relative">
              <img
                src={services[1].image}
                alt={services[1].alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" aria-hidden />
            </div>
            <p className="text-[15px] leading-relaxed text-white/85 mb-12 max-w-md font-['Brown_Std']">
              {services[1].description}
            </p>
            <div className="flex items-center gap-4 text-white/60">
              <span className="text-xs tracking-[0.22em] font-mono uppercase">
                · In development ·
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default GovernanceServices;
