"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  splitBy?: "chars" | "words" | "lines";
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = el.textContent || "";
    let elements: string[] = [];

    if (splitBy === "chars") {
      elements = text.split("");
    } else if (splitBy === "words") {
      elements = text.split(" ");
    } else {
      elements = [text];
    }

    el.innerHTML = elements
      .map(
        (item) =>
          `<span style="display:inline-block;overflow:hidden;"><span style="display:inline-block;">${
            splitBy === "words" ? item + "&nbsp;" : item
          }</span></span>`
      )
      .join("");

    const innerSpans = el.querySelectorAll("span > span");

    gsap.from(innerSpans, {
      y: "110%",
      opacity: 0,
      duration: 0.8,
      delay,
      stagger: splitBy === "chars" ? 0.02 : 0.08,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, delay, splitBy]);

  return (
    <div ref={containerRef} className={className}>
      <Tag>{children}</Tag>
    </div>
  );
}
