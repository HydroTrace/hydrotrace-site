import { cn } from "@/lib/utils";
import irrigationCircle from "@/assets/irrigation-circle.png";
import RotatingArcs from "./RotatingArcs";

const About = ({ className }: { className?: string }) => {
  return (
    <section 
      id="about" 
      className={cn("py-24 bg-white", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 items-center border-t-2 border-dashed border-[#21177a]/40 p-8">
            {/* Text Content on Left */}
            <div className="pr-12">
              <h2 className="heading-l mb-8">
                A Modern Data Layer for Agricultural Water Management
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  HydroTrace streamlines how groundwater and surface-water abstractions are captured and reported. Through consistent measurement, integrated verification, and clean digital workflows, we reduce the friction that slows down compliance and makes water data difficult to trust.
                </p>
                <p>
                  The result is reliable information that helps farmers, managers, and entire basins move toward accurate reporting, stronger compliance, and genuinely data-driven water management.
                </p>
              </div>
            </div>

            {/* Image on Right */}
            <div className="relative pl-12 overflow-visible">
              {/* Squares pattern with diagonal fade */}
              <div 
                className="absolute -top-8 -bottom-8 left-0 -right-8"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(5, 135, 68, 0.5) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(5, 135, 68, 0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                  maskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                }}
              />
              <div className="relative flex items-center justify-center py-8">
                {/* Rotating arcs behind the logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <RotatingArcs className="w-[550px] h-[550px]" />
                </div>
                <img
                  src={irrigationCircle}
                  alt="Aerial view of circular irrigation system"
                  className="w-full max-w-md h-auto relative z-10"
                />
              </div>
            </div>
          </div>
          
          {/* Learn more link */}
          <div className="mt-12 text-center">
            <a 
              href="#" 
              className="about-learn-more text-lg font-medium transition-colors duration-200"
              style={{ color: '#21177a' }}
            >
              Learn more about water allocation
            </a>
          </div>
        </div>
      </div>
      
      {/* Dashed border line - interior vertical only */}
      <style>{`
        #about .grid {
          position: relative;
        }
        #about .grid::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          border-left: 2px dashed rgba(33, 23, 122, 0.4);
          transform: translateX(-50%);
        }
        @media (max-width: 768px) {
          #about .grid::before {
            display: none;
          }
        }
        .about-learn-more:hover {
          color: #1500fa !important;
        }
      `}</style>
    </section>
  );
};

export default About;