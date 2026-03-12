"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "stagger";
  delay?: number;
  duration?: number;
  staggerAmount?: number;
}

export default function GsapReveal({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 1,
  staggerAmount = 0.15,
}: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { y: 80, opacity: 0 },
      fadeIn: { opacity: 0 },
      slideLeft: { x: -100, opacity: 0 },
      slideRight: { x: 100, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      stagger: { y: 50, opacity: 0 },
    };

    const from = animations[animation];

    if (animation === "stagger") {
      const children = el.children;
      gsap.from(children, {
        ...from,
        duration,
        delay,
        stagger: staggerAmount,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.from(el, {
        ...from,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animation, delay, duration, staggerAmount]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
