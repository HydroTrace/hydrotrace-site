import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Interested in learning more about HydroTrace? We'd love to hear from you.
          </p>

          <div className="bg-background p-8 md:p-12 rounded-xl border border-border">
            <div className="flex items-center justify-center mb-6">
              <Mail className="h-12 w-12 text-accent" />
            </div>
            <a
              href="mailto:info@hydrotrace.io"
              className="text-2xl font-semibold text-accent hover:text-accent/80 transition-colors mb-8 block"
            >
              info@hydrotrace.io
            </a>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 font-['DM_Serif_Text']"
              onClick={() => window.location.href = "mailto:info@hydrotrace.io"}
            >
              Send us a message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
