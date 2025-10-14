import { useRef } from "react";
import ShaderBackground from "./ShaderBackground";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, useGSAP);

interface HeroProps {
  title?: string;
  description?: string;
}

const Hero = ({ 
  title = "Transparent Water Management Through Digital Trust",
  description = "Building verifiable systems for sustainable groundwater governance"
}: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      if (!headerRef.current) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headerRef.current!, {
          type: 'lines',
          linesClass: 'line-wrapper',
        });

        gsap.set(split.lines, {
          filter: 'blur(16px)',
          yPercent: 30,
          autoAlpha: 0,
          scale: 1.06,
          transformOrigin: '50% 50%',
        });

        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        tl.to(
          split.lines,
          {
            filter: 'blur(0px)',
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
          },
          0.1,
        );

        if (subtitleRef.current) {
          tl.to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.55');
        }
        if (ctaRef.current) {
          tl.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.35');
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Shader Background */}
      <ShaderBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Title */}
        <h1 
          ref={headerRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto font-['DM_Serif_Text']"
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light"
        >
          {description}
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <button
            onClick={scrollToAbout}
            className="rounded-full border border-white/30 bg-transparent px-8 py-3 text-base text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 font-['DM_Serif_Text']"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/60 to-transparent" />
    </section>
  );
};

export default Hero;
