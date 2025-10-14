import { Shield, UserCheck, Activity, Lock } from "lucide-react";
import irrigationImage from "@/assets/irrigation-water-droplet.png";

const features = [
  {
    icon: Shield,
    title: "Secure Records",
    description: "Secure, tamper-resistant water usage records",
  },
  {
    icon: UserCheck,
    title: "Digital Identity",
    description: "Verifiable quota management using digital identities",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Real-time monitoring integration (IoT & mobile reporting)",
  },
  {
    icon: Lock,
    title: "Privacy-First",
    description: "Privacy-preserving data verification (Zero-Knowledge proofs)",
  },
];

const Technology = ({ className }: { className?: string }) => {
  return (
    <section className={`py-24 bg-background ${className || ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Title + Features Grid */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-['DM_Serif_Text']">
                  Trusted Coordination Layer for Water Governance
                </h2>
                <p className="text-xl text-muted-foreground">
                  Building transparent infrastructure for sustainable water management
                </p>
              </div>

              {/* 2x2 Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-muted/30 p-6 rounded-lg border border-border hover:border-accent/50 transition-colors"
                    >
                      <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 font-['DM_Serif_Text']">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="flex items-center justify-center">
              <img 
                src={irrigationImage} 
                alt="Irrigation system in agricultural field" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
