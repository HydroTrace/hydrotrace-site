import { useRef, useEffect } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShaderBackground from "./ShaderBackground";
import grassField from "@/assets/grass-field.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollOverlayProps {
  title?: string;
  description?: string;
}

const ScrollOverlay = ({
  title = "Strengthening Water Transparency in Agriculture",
  description = "Agriculture accounts for over 70% of global freshwater use — yet most irrigation systems still rely on manual reporting and outdated records. HydroTrace brings verifiable, digital transparency to water allocation and use, helping farmers and regulators manage water more fairly, efficiently, and sustainably."
}: ScrollOverlayProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

      // Set initial states - start completely off-screen
      gsap.set(imageRef.current, {
        y: '100vh',
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(contentRef.current, {
        y: 60,
        opacity: 0,
      });

      // Animate image popping up from bottom
      gsap.to(imageRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3,
        },
      });

      // Animate content fading in
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center 30%',
          scrub: 3,
        },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="scroll-overlay"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Shader Background - continues from hero */}
      <ShaderBackground />

      {/* Grass Field Image - pops up on scroll */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-10 flex items-end justify-center"
      >
        <img
          src={grassField}
          alt="Agricultural field with grass"
          className="w-full h-[60vh] object-cover object-bottom"
        />
      </div>

      {/* Content - centered text */}
      <div
        ref={contentRef}
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-32"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto font-['DM_Serif_Text'] drop-shadow-lg">
          {title}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto font-light drop-shadow-md">
          {description}
        </p>
      </div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7f7e9] to-transparent z-30" />
    </section>
  );
};

export default ScrollOverlay;
