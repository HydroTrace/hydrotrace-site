import { Shield, UserCheck, Activity, Lock } from "lucide-react";
import irrigationImage from "@/assets/irrigation-water-droplet.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const features = [
  {
    icon: Shield,
    title: "Secure Records",
    description: "Secure, tamper-resistant water usage records",
    detailedDescription: "Every water transaction is recorded on an immutable blockchain ledger, ensuring complete transparency and accountability. Historical data cannot be altered or deleted, providing a permanent audit trail for regulators and stakeholders."
  },
  {
    icon: UserCheck,
    title: "Digital Identity",
    description: "Verifiable quota management using digital identities",
    detailedDescription: "Water users receive cryptographic digital identities that enable secure authentication and quota tracking. Smart contracts automatically enforce allocation limits while maintaining user privacy and preventing unauthorized access."
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Real-time monitoring integration (IoT & mobile reporting)",
    detailedDescription: "IoT sensors and mobile applications continuously feed data into the system, providing live visibility into water extraction, flow rates, and usage patterns. Automated alerts notify stakeholders of anomalies or threshold breaches instantly."
  },
  {
    icon: Lock,
    title: "Privacy-First",
    description: "Privacy-preserving data verification (Zero-Knowledge proofs)",
    detailedDescription: "Advanced cryptographic techniques allow verification of compliance without revealing sensitive operational data. Zero-knowledge proofs enable auditors to confirm usage limits are met while protecting proprietary information and competitive advantages."
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
                    <HoverCard key={index} openDelay={200}>
                      <HoverCardTrigger asChild>
                        <div
                          className="bg-muted/30 p-6 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer"
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
                      </HoverCardTrigger>
                      <HoverCardContent 
                        className="w-80 rounded-xl border-border shadow-lg"
                        style={{ backgroundColor: '#d4b896' }}
                      >
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-900 font-['DM_Serif_Text']">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-800 leading-relaxed">
                            {feature.detailedDescription}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
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
