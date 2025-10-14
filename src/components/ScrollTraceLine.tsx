import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollTraceLine = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pathRef.current || !containerRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Set up the initial state
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate the path based on scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed left-0 top-0 w-full h-full pointer-events-none z-20"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="traceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Flowing curved path - represents water tracing */}
        <path
          ref={pathRef}
          d="M 15,5 
             Q 25,15 20,25
             T 30,45
             Q 35,55 25,65
             T 35,85
             Q 30,95 35,100"
          fill="none"
          stroke="url(#traceGradient)"
          strokeWidth="0.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          opacity="0.6"
        />
        
        {/* Subtle flowing dots along the path */}
        <circle r="0.4" fill="hsl(var(--accent))" opacity="0.6">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M 15,5 
                 Q 25,15 20,25
                 T 30,45
                 Q 35,55 25,65
                 T 35,85
                 Q 30,95 35,100"
          />
        </circle>
        
        <circle r="0.3" fill="hsl(var(--secondary))" opacity="0.5">
          <animateMotion
            dur="10s"
            repeatCount="indefinite"
            begin="2s"
            path="M 15,5 
                 Q 25,15 20,25
                 T 30,45
                 Q 35,55 25,65
                 T 35,85
                 Q 30,95 35,100"
          />
        </circle>
      </svg>
    </div>
  );
};

export default ScrollTraceLine;
