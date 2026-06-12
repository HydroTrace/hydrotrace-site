import { Link } from "react-router-dom";

const cards = [
  {
    title: "Agricultural Water Risk",
    description:
      "Crop-water risk screening for farmland investors, lenders, and asset managers.",
    href: "/water-risk",
  },
  {
    title: "Water Governance & Management",
    description:
      "Digital tools for abstraction reporting, compliance, allocation monitoring, and basin-scale water planning.",
    href: "/digital-water-governance",
  },
];

const HomeCards = () => {
  return (
    <section>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white/5 backdrop-blur-sm border border-white/25 rounded-sm p-8 flex flex-col justify-between min-h-[220px] hover:bg-white/10 transition-colors"
            >
              <div>
                <h3 className="font-['Reckless_Neue'] font-light text-2xl text-white mb-4 leading-tight">
                  {card.title}
                </h3>
                <p className="font-['Brown_Std'] font-light text-[15px] text-white/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
              <Link
                to={card.href}
                className="font-['Brown_Std'] text-sm tracking-wide text-white/90 hover:text-white mt-6 inline-flex items-center gap-2 border-b border-white/40 hover:border-white pb-1 self-start"
              >
                Learn more <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
