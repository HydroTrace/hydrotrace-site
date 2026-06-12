import { ArrowRight } from "lucide-react";
import waterRiskImg from "@/assets/water-risk-crop.jpg.asset.json";
import waterGovImg from "@/assets/water-governance.jpg.asset.json";

const cards = [
  {
    title: "Water Risk",
    image: waterRiskImg.url,
    alt: "Aerial view of irrigated crop field with concentric pivot rings",
    description:
      "Crop-water risk screening for agriculture and supply chains. Identify exposure to scarcity, regulation, and climate stress — from farm to portfolio.",
    href: "/water-risk",
    cta: "Explore Water Risk",
  },
  {
    title: "Digital Water Governance",
    image: waterGovImg.url,
    alt: "Aerial view of glacial river braids in shades of blue",
    description:
      "Digital infrastructure for abstraction reporting, allocation, and compliance. Transparent, trustworthy data for regulators and water users.",
    href: "/digital-water-governance",
    cta: "Explore Governance",
  },
];

const HomeCards = () => {
  return (
    <section className="bg-white min-h-screen py-24 lg:py-32">
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          {/* Top rule */}
          <div className="h-px w-full bg-[#0A1B44]" />

          <div className="grid grid-cols-1 md:grid-cols-2">
            {cards.map((card, idx) => (
              <a
                key={card.title}
                href={card.href}
                className={`group block py-12 lg:py-16 px-0 md:px-10 lg:px-14 ${
                  idx === 0
                    ? "md:border-r md:border-[#0A1B44]"
                    : ""
                } ${idx === 1 ? "border-t md:border-t-0 border-[#0A1B44]" : ""}`}
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <h2 className="mt-10 font-['Reckless_Neue'] font-light text-[#0A1B44] leading-[1.1] text-[36px] lg:text-[48px] tracking-[-0.01em]">
                  {card.title}
                </h2>

                <p className="mt-6 max-w-xl font-['Brown_Std'] font-light text-[#0A1B44]/75 text-base lg:text-[17px] leading-relaxed">
                  {card.description}
                </p>

                <div className="mt-10 inline-flex items-center gap-4 font-['Brown_Std'] tracking-[0.22em] text-[11px] uppercase text-[#0A1B44]">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#0A1B44] transition-colors group-hover:bg-[#0A1B44] group-hover:text-white">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <span>{card.cta}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom rule */}
          <div className="h-px w-full bg-[#0A1B44]" />
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
