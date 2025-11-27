import { ArrowRight } from "lucide-react";

const solutions = [
  { 
    title: "Farmers",
    description: "HydroTrace makes water reporting simple, accurate, and stress-free. Skip the field notebook and manual entries. Capture water-use data automatically, stay compliant with local requirements, and get a reliable picture of your abstractions throughout the season.\n\nSpend less time on paperwork and more time farming — all while protecting your allocation and reducing the risk of compliance issues."
  },
  { 
    title: "Water stewards",
    description: "HydroTrace is a single hub for agricultural abstraction data. Standardize how information is collected, reduce errors, and streamline compliance tracking across farms and seasons. Replace scattered spreadsheets and paper forms with a clear, auditable digital workflow.\n\nBuild a database you can actually use: monitor trends, verify reporting, support enforcement, and generate regulatory submissions quickly and confidently."
  },
  { 
    title: "Water Footprinting",
    description: "Accurate water footprints start with real data. HydroTrace brings field-level abstraction measurements into your sustainability workflows, giving you a defensible foundation for blue-water use, basin impacts, and supply-chain accountability. Track water intensity across sourcing regions, spot hotspots, and quantify progress toward corporate water targets with confidence."
  },
];

const Solutions = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white border border-[#c5d4e8] rounded-sm p-8 flex flex-col justify-between min-h-[200px] hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div>
                <h3 className="font-['Fira_Code'] text-2xl text-[#21177a] font-medium mb-4">
                  {solution.title}
                </h3>
                {solution.description && (
                  <p className="text-sm text-[#21177a]/80 leading-relaxed whitespace-pre-line">
                    {solution.description}
                  </p>
                )}
              </div>
              <div className="mt-8">
                <ArrowRight className="w-5 h-5 text-[#030bfc] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
