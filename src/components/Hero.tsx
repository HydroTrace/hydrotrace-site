import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Glacial water flowing through natural terrain"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Building Digital Foundations For Water Security
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto font-light">
          From Source to System: Blockchain for Traceable, Trustworthy Water Management
        </p>
        <Button
          onClick={scrollToAbout}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-['DM_Serif_Text']"
        >
          Learn More
          <ChevronDown className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/70" />
      </div>
    </section>
  );
};

export default Hero;
