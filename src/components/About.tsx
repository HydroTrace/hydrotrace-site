import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import animationVideo from "@/assets/hydrotrace-animation.mp4";

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

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (video.duration) {
          // Map scroll progress to video time
          video.currentTime = self.progress * video.duration;
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
      className={`py-24 bg-muted/10 ${className || ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Video on Left */}
            <div className="flex items-center justify-center">
              <video
                ref={videoRef}
                src={animationVideo}
                className="w-full max-w-md h-auto"
                muted
                playsInline
                preload="auto"
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
