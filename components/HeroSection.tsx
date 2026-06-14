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

  const [isMuted, setIsMuted]         = useState(true);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [showSoundHint, setShowHint]  = useState(true);

  // Refs to the actual <video> DOM nodes (injected via dangerouslySetInnerHTML)
  const fgWrapRef = useRef<HTMLDivElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const fgVid     = useRef<HTMLVideoElement | null>(null);
  const bgVid     = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Grab the real DOM video nodes — bypasses React's broken muted prop
    fgVid.current = fgWrapRef.current?.querySelector("video") ?? null;
    bgVid.current = bgWrapRef.current?.querySelector("video") ?? null;

    const play = async (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.muted = true;
      v.loop  = true;
      try { await v.play(); } catch { /* blocked — user must tap */ }
    };

    play(fgVid.current).then(() => setIsPlaying(true)).catch(() => {});
    play(bgVid.current);

    const t = setTimeout(() => setShowHint(false), 4500);
    return () => clearTimeout(t);
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

  const toggleMute = () => {
    if (!fgVid.current) return;
    fgVid.current.muted = !isMuted;
    setIsMuted(m => !m);
    setShowHint(false);
  };

  const togglePlay = () => {
    const v = fgVid.current;
    const b = bgVid.current;
    if (!v) return;
    if (isPlaying) {
      v.pause(); b?.pause();
      setIsPlaying(false);
    } else {
      v.muted = true;
      v.play().then(() => setIsPlaying(true)).catch(console.warn);
      b?.play().catch(console.warn);
    }
  };

  // Raw HTML string — this is the ONLY reliable way to get muted autoplay in React/Next.js
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

      {/* BG blurred video — raw HTML injection */}
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

      {/* FG portrait video — raw HTML injection */}
      <div className={styles.videoPortrait}>
        <div
          ref={fgWrapRef}
          dangerouslySetInnerHTML={{ __html: videoHTML }}
          className={styles.fgVideoInner}
        />
        {!isPlaying && (
          <button className={styles.manualPlay} onClick={togglePlay} aria-label="Play video">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>
        )}
        <div className={styles.videoGlow} />
        <div className={styles.videoVignette} />
      </div>

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

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          }
        </button>
        <button className={styles.controlBtn} onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          }
        </button>
      </div>

      {showSoundHint && isPlaying && (
        <div className={styles.soundHint} onClick={toggleMute}>
          <span className={styles.soundDot} />
          Tap for sound
        </div>
      )}

      <button ref={scrollRef} className={styles.scrollIndicator} onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })} aria-label="Scroll down">
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine}><div className={styles.scrollPulse} /></div>
      </button>
    </section>
  );
}
