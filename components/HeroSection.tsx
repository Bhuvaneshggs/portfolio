"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import styles from "./HeroSection.module.css";

const CinematicLayer = dynamic(() => import("./CinematicLayer"), { ssr: false });

export default function HeroSection() {
  const taglineRef   = useRef<HTMLSpanElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef  = useRef<HTMLHeadingElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLButtonElement>(null);

  const [showSoundHint, setShowHint] = useState(true);

  const bgWrapRef = useRef<HTMLDivElement>(null);
  const bgVid     = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    bgVid.current = bgWrapRef.current?.querySelector("video") ?? null;
    const v = bgVid.current;
    if (!v) return;

    v.muted  = true;
    v.loop   = true;
    v.volume = 1;
    v.play().catch(() => {});

    // First click anywhere on page → unmute + full volume
    const unlock = () => {
      if (!bgVid.current) return;
      bgVid.current.muted  = false;
      bgVid.current.volume = 1;
      setShowHint(false);
      document.removeEventListener("click", unlock);
    };
    document.addEventListener("click", unlock);

    const t = setTimeout(() => setShowHint(false), 7000);
    return () => {
      clearTimeout(t);
      document.removeEventListener("click", unlock);
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    gsap.timeline({ delay: 0.3 })
      .fromTo(taglineRef.current,   { opacity:0, y:20 },           { opacity:1, y:0, duration:1.0, ease:"power3.out" })
      .fromTo(firstNameRef.current, { opacity:0, y:80, skewY: 4 }, { opacity:1, y:0, skewY:0, duration:1.2, ease:"expo.out" }, "-=0.5")
      .fromTo(lastNameRef.current,  { opacity:0, y:80, skewY:-4 }, { opacity:1, y:0, skewY:0, duration:1.2, ease:"expo.out" }, "-=0.9")
      .fromTo(roleRef.current,      { opacity:0, y:30 },           { opacity:1, y:0, duration:0.9, ease:"power2.out" }, "-=0.5")
      .fromTo(ctaRef.current,       { opacity:0, y:20 },           { opacity:1, y:0, duration:0.8, ease:"power2.out" }, "-=0.4")
      .fromTo(scrollRef.current,    { opacity:0 },                 { opacity:1, duration:0.6 }, "-=0.2");
  }, []);

  const videoHTML = `<video
    autoplay
    loop
    muted
    playsinline
    preload="auto"
    style="width:100%;height:100%;object-fit:cover;"
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>`;

  return (
    <section className={styles.hero}>

      {/* Full-screen background video */}
      <div className={styles.bgVideoWrap}>
        <div
          ref={bgWrapRef}
          dangerouslySetInnerHTML={{ __html: videoHTML }}
          className={styles.bgVideoInner}
        />
        <div className={styles.bgBlur} />
      </div>

      <div className={styles.gradientOverlay} />
      <CinematicLayer />

      {/* Text */}
      <div className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
          IT Infrastructure · DevOps · Networks
        </span>
        <h1 ref={firstNameRef} className={`${styles.name} hero-heading`}>BHUVANESH</h1>
        <h1 ref={lastNameRef}  className={`${styles.name} hero-heading`}>GOPAL</h1>
        <p ref={roleRef} className={styles.role}>
          IT Engineer &amp; DevOps Practitioner
          <br />
          <span className={styles.roleDetail}>AWS · Docker · Kubernetes · Terraform · CI/CD</span>
        </p>
        <div ref={ctaRef} className={styles.cta}>
          <a href="#contact" className={styles.ctaPrimary}>Get in touch</a>
          <a href="#projects" className={styles.ctaSecondary}>View work ↓</a>
          <a href="/Bhuvanesh Gopal Resume.pdf" download="Bhuvanesh Gopal Resume.pdf" className={styles.ctaResume}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </div>
      </div>

      {/* Sound hint — disappears on first click */}
      {showSoundHint && (
        <div className={styles.soundHint}>
          <span className={styles.soundDot} />
          Click anywhere for sound
        </div>
      )}

      <button ref={scrollRef} className={styles.scrollIndicator} onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })} aria-label="Scroll down">
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine}><div className={styles.scrollPulse} /></div>
      </button>
    </section>
  );
}
