"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  duration = 0.7,
  staggerAmount = 0.15,
}: GsapRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directions: Record<string, { y?: number; x?: number; scale?: number }> = {
    fadeUp: { y: 60 },
    fadeIn: {},
    slideLeft: { x: -80 },
    slideRight: { x: 80 },
    scale: { scale: 0.85 },
    stagger: { y: 40 },
  };

  const from = directions[animation];

  if (animation === "stagger") {
    const items = React.Children.toArray(children);
    return (
      <div ref={ref} className={className}>
        {items.map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: from.y ?? 0, x: from.x ?? 0, scale: from.scale ?? 1 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, x: 0, scale: 1 }
                : { opacity: 0, y: from.y ?? 0, x: from.x ?? 0, scale: from.scale ?? 1 }
            }
            transition={{
              duration,
              delay: delay + i * staggerAmount,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: from.y ?? 0, x: from.x ?? 0, scale: from.scale ?? 1 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, scale: 1 }
          : { opacity: 0, y: from.y ?? 0, x: from.x ?? 0, scale: from.scale ?? 1 }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
