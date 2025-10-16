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
    title: "Blockchain Integrity Layer",
    description: "Blockchain Integrity Layer",
    detailedDescription: "Blockchain is the core of HydroTrace. It provides the accountable coordination layer that records all actions in an immutable and verifiable ledger. It connects field data, institutions, and policy decisions through transparent records that cannot be altered, ensuring trust and traceability across the entire water management system."
  },
  {
    icon: UserCheck,
    title: "Verifiable Usage Data",
    description: "Verifiable Usage Data",
    detailedDescription: "Data from IoT sensors, flow meter readings, or mobile submissions is securely linked to blockchain anchored identities. This creates a clear chain of custody from source to regulator, improving data integrity, reducing errors, and providing a reliable foundation for adaptive water governance."
  },
  {
    icon: Activity,
    title: "Digital Water Credits",
    description: "Digital Water Credits",
    detailedDescription: "HydroTrace enables water allocations to be represented digitally, either anchored on chain or issued through blockchain native assets that can be transferred to water license holders through custodial wallets. These digital credits make allocation and use fully traceable, supporting accountable quota management and opening opportunities for ESG linked value creation and transparent water credit markets that reward sustainable agriculture."
  },
  {
    icon: Lock,
    title: "Transparent Policy and Smart Contracts",
    description: "Transparent Policy and Smart Contracts",
    detailedDescription: "Smart contracts encode allocation logic, trading rules, and policy adjustments directly on chain. This ensures that enforcement, quota changes, and trading mechanisms remain transparent, auditable, and automatically executed, reducing administrative overhead while improving trust and compliance."
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
                  Trusted Coordination Layer for Water Governance
                </h2>
                <p className="text-xl text-muted-foreground">
                  Blockchain forms the secure and transparent foundation linking water use from source to policy. This trusted digital layer makes data tamper resistant, verifiable, and auditable. It enables regulators and agencies to make confident management decisions based on reliable and high quality information.
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
