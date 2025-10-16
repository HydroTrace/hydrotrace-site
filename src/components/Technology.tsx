import { Shield, UserCheck, Activity, Lock } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import irrigationStructure from "@/assets/irrigation-structure.png";
import irrigationDroplet from "@/assets/irrigation-water-droplet.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const imageStructureRef = useRef<HTMLImageElement>(null);
  const imageDropletRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !imageStructureRef.current || !imageDropletRef.current) return;

    gsap.set(imageDropletRef.current, { opacity: 0 });
    
    gsap.to(imageStructureRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    gsap.to(imageDropletRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`py-24 bg-background ${className || ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Title + Features Grid */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-['DM_Serif_Text']">
                  Empowering Agriculture Through Transparent Water Governance
                </h2>
                <p className="text-xl text-muted-foreground">
                  Agriculture accounts for over 70% of global freshwater use — yet most irrigation systems still rely on manual reporting and outdated records. HydroTrace brings verifiable, digital transparency to water allocation and use, helping farmers and regulators manage water more fairly, efficiently, and sustainably.
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
            <div className="flex items-center justify-center relative">
              <img 
                ref={imageStructureRef}
                src={irrigationStructure} 
                alt="Irrigation infrastructure in agricultural field" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <img 
                ref={imageDropletRef}
                src={irrigationDroplet} 
                alt="Water droplet irrigation system" 
                className="w-full h-auto rounded-2xl shadow-lg absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
