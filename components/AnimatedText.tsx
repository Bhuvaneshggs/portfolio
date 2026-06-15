"use client";

import { useEffect, useRef } from "react";
import styles from "./AnimatedText.module.css";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const spans = el.querySelectorAll<HTMLSpanElement>("." + styles.char);
          spans.forEach((s, i) => {
            s.style.transitionDelay = `${delay + i * 0.025}s`;
            s.classList.add(styles.visible);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <span key={i} className={styles.char}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
