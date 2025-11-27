import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animationVideo from "@/assets/hydrotrace-animation.mp4";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const About = ({ className }: { className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    
    if (!video || !section) return;

    // Set video to first frame
    video.currentTime = 0;

    // Create a proxy object to animate
    const progress = { value: 0 };

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5, // Smooth scrubbing with 0.5 second delay
      onUpdate: (self) => {
        if (video.duration) {
          gsap.to(progress, {
            value: self.progress,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
              video.currentTime = progress.value * video.duration;
            }
          });
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={cn("py-24 bg-white", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 items-center border-t-2 border-dashed border-[#21177a]/40 p-8">
            {/* Text Content on Left */}
            <div className="pr-12">
              <h2 className="heading-l mb-8">
                Making Water Governance Traceable and Fair
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  HydroTrace develops transparent digital systems that strengthen how water is allocated, monitored, and reported. By combining blockchain verification, mobile monitoring, and data integrity tools, we help bridge the gap between policy frameworks and real-world water use.
                </p>
                <p>
                  Our mission is to make groundwater management traceable, auditable, and fair — empowering regulators and communities with trusted information to support sustainable water governance.
                </p>
              </div>
            </div>

            {/* Video on Right */}
            <div className="relative pl-12 overflow-visible">
              {/* Squares pattern with diagonal fade */}
              <div 
                className="absolute -top-8 -bottom-8 -left-12 -right-8"
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
                <video
                  ref={videoRef}
                  src={animationVideo}
                  className="w-full max-w-md h-auto relative z-10"
                  muted
                  playsInline
                  preload="auto"
                />
              </div>
            </div>
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
      `}</style>
    </section>
  );
};

export default About;
