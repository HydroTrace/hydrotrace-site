import { Link } from "react-router-dom";

const cards = [
  {
    title: "Water Governance & Management",
    description:
      "Digital tools for abstraction reporting, compliance, allocation monitoring, and basin-scale water planning.",
    href: "/digital-water-governance",
  },
  {
    title: "Agricultural Water Risk",
    description:
      "Crop-water risk screening for farmland investors, lenders, and asset managers.",
    href: "/water-risk",
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
              className="bg-white border border-[#c5d4e8] rounded-sm p-8 flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-['Fira_Code'] text-2xl text-[#21177a] font-medium mb-4">
                  {card.title}
                </h3>
                <p className="text-sm text-[#21177a]/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
              <Link
                to={card.href}
                className="font-['IBM_Plex_Mono'] text-xs tracking-widest uppercase text-[#2563eb] hover:text-[#1d4ed8] mt-6 inline-block"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
