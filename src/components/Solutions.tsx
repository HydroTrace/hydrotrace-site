import { ArrowRight } from "lucide-react";

const solutions = [
  {
    category: "PLATFORM",
    title: "Farmers",
  },
  {
    category: "PLATFORM",
    title: "Water stewards",
  },
  {
    category: "INTELLIGENT SOFTWARE",
    title: "Water Footprinting",
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
                <span className="font-['Fira_Code'] text-xs tracking-wider text-[#249be0] uppercase mb-4 block">
                  {solution.category}
                </span>
                <h3 className="font-['Fira_Code'] text-2xl text-[#21177a] font-medium">
                  {solution.title}
                </h3>
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
