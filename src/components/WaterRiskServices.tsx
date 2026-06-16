import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Crop-Water Assessment",
    image: "/images/services/crop-water.jpg",
    alt: "Aerial view of irrigated farmland fields",
    description:
      "Field-level yield distributions and revenue-at-risk from physically-based crop-water simulation.",
  },
  {
    title: "Perspectives",
    image: "/images/services/water-market.jpg",
    alt: "River flowing through forested gorge",
    description:
      "Analysis and perspectives on water risk in agriculture and capital markets",
  },
];

const WaterRiskServices = () => {
  const navigate = useNavigate();

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
          <h2 className="font-['Reckless_Neue'] text-[34px] md:text-[46px] font-light mb-10">
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
        <article className="relative px-8 md:px-12 md:border-l md:border-white/90 max-w-[580px]">
          <h2 className="font-['Reckless_Neue'] text-[34px] md:text-[46px] font-light mb-10">
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
          <button
            onClick={() => navigate('/blog')}
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
              Explore
            </span>
          </button>
        </article>

        {/* Thick left divider — full section height, between label and card 1 */}
        <div className="hidden md:block absolute top-[-8rem] md:top-[-12rem] bottom-[-8rem] md:bottom-[-12rem] w-[2px] bg-white left-[220px]" />
      </div>
    </section>
  );
};

export default WaterRiskServices;
