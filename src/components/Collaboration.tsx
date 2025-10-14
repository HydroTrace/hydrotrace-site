import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Collaboration = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-secondary/20 to-accent/20 p-12 md:p-16 rounded-2xl border border-secondary/30">
            <div className="text-center">
              <FileText className="h-16 w-16 text-accent mx-auto mb-8" strokeWidth={1.5} />
              <blockquote className="text-2xl md:text-3xl font-light text-foreground leading-relaxed mb-8">
                "HydroTrace is collaborating with the Ministry of Agriculture, Water and Land Reform (MAFWLR) to explore blockchain-supported water quota management within the Stampriet Transboundary Aquifer System (STAS)."
              </blockquote>
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-white transition-colors font-['DM_Serif_Text']"
              >
                Read the Concept Note
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
