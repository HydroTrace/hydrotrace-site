import { Shield, UserCheck, Activity, Lock } from "lucide-react";

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

const Technology = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Trusted Coordination Layer for Water Governance
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building transparent infrastructure for sustainable water management
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-background p-8 rounded-lg border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-['DM_Serif_Text']">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
