import sphereLogo from "@/assets/hydrotrace-sphere.png";

const About = ({ className }: { className?: string }) => {
  return (
    <section id="about" className={`py-24 bg-muted/10 ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Logo on Left */}
            <div className="flex items-center justify-center">
              <img 
                src={sphereLogo} 
                alt="HydroTrace Sphere Logo" 
                className="w-full max-w-md h-auto"
              />
            </div>

            {/* Text Content on Right */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 font-['DM_Serif_Text']">
                About HydroTrace
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  HydroTrace develops transparent digital systems for managing groundwater and water quotas using blockchain-based verification and data integrity tools.
                </p>
                <p>
                  Our goal is to bridge policy and practice — making water allocation traceable, auditable, and fair.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
