"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.3,
  overlay = true,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={className} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <motion.div
        style={{ y, position: "absolute", top: "-20%", left: "-20%", right: "-20%", bottom: "-20%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>
      {overlay && (
        <div
          style={{ position: "absolute", inset: 0 }}
          className="bg-gradient-to-b from-navy-dark/60 via-navy-dark/30 to-navy-dark/80"
        />
      )}
    </div>
  );
}
