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
      className={cn("py-24", className)}
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
                  HydroTrace develops transparent digital systems that strengthen how water is allocated, monitored, and reported. By combining blockchain verification, mobile monitoring, and data integrity tools, we help bridge the gap between policy frameworks and real-world water use.
                </p>
                <p>
                  Our mission is to make groundwater management traceable, auditable, and fair, empowering regulators and communities with trusted information to support sustainable water governance.
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
