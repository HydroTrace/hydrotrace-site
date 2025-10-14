import { Droplet } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                About HydroTrace
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  HydroTrace develops transparent digital systems for managing groundwater and water quotas using blockchain-based verification and data integrity tools.
                </p>
                <p>
                  Our goal is to bridge policy and practice — making water allocation traceable, auditable, and fair.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-secondary to-accent p-12 rounded-full">
                  <Droplet className="h-32 w-32 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
