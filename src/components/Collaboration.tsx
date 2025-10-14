import { Button } from "@/components/ui/button";
import pathlinesImage from "@/assets/pathlines-aerial.png";

const Collaboration = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Half: Text Content */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                "HydroTrace is collaborating with the Ministry of Agriculture, Water and Land Reform (MAFWLR) to explore blockchain-supported water quota management within the Stampriet Transboundary Aquifer System (STAS)."
              </p>
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-white transition-colors font-['DM_Serif_Text']"
              >
                Read the Concept Note
              </Button>
            </div>

            {/* Right Half: Image */}
            <div className="flex items-center justify-center">
              <img 
                src={pathlinesImage} 
                alt="Collaboration visual" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
