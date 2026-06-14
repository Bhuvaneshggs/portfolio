"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Current & target positions
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot snaps instantly
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    // Ring lerps behind the dot
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);

    // Hover effects — scale ring up on interactive elements
    const onEnter = () => ring.classList.add(styles.ringHover);
    const onLeave = () => ring.classList.remove(styles.ringHover);

    const targets = document.querySelectorAll("a, button, [role='button']");
    targets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Click effect
    const onClick = () => {
      dot.classList.add(styles.dotClick);
      ring.classList.add(styles.ringClick);
      setTimeout(() => {
        dot.classList.remove(styles.dotClick);
        ring.classList.remove(styles.ringClick);
      }, 300);
    };
    window.addEventListener("click", onClick);

    // Hide on touch devices
    const onTouch = () => {
      dot.style.display  = "none";
      ring.style.display = "none";
    };
    window.addEventListener("touchstart", onTouch, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      targets.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
