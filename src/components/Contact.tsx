import { Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = ({ className }: { className?: string }) => {
  return (
    <section id="contact" className={`py-24 bg-[#F6F8F9] ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-['DM_Serif_Text']">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Interested in learning more about HydroTrace? We'd love to hear from you.
          </p>

          <Button
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-background px-8 mb-12 font-['DM_Serif_Text']"
            onClick={() => window.location.href = "mailto:info@hydrotrace.io"}
          >
            Send us a message
          </Button>

          {/* Social Media Strip */}
          <div className="flex items-center justify-center gap-6 pt-8 border-t border-border/50">
            <a 
              href="https://twitter.com/hydrotrace" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="text-sm">@hydrotrace</span>
            </a>
            <a 
              href="https://linkedin.com/company/hydrotrace" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-sm">HydroTrace</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
