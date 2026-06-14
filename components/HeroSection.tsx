"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import styles from "./HeroSection.module.css";

const CinematicLayer = dynamic(() => import("./CinematicLayer"), { ssr: false });

let globalMuted = true;

export default function HeroSection() {
  const taglineRef   = useRef<HTMLSpanElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef  = useRef<HTMLHeadingElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLButtonElement>(null);
  const sectionRef   = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(globalMuted);

  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section) return;

    v.volume = 1;
    v.muted  = true;
    v.play().then(() => {
      v.muted  = globalMuted;
      v.volume = 1;
    }).catch(() => {});

    // Watch the SECTION — pause audio when scrolled away, resume when back
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Back on hero — restore saved mute state
          v.muted  = globalMuted;
          v.volume = 1;
          setIsMuted(globalMuted);
        } else {
          // Scrolled away — mute the audio (video keeps playing visually off-screen)
          v.muted = true;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.timeline({ delay: 0.3 })
      .fromTo(taglineRef.current,   { opacity:0, y:20 },           { opacity:1, y:0, duration:1.0, ease:"power3.out" })
      .fromTo(firstNameRef.current, { opacity:0, y:80, skewY: 4 }, { opacity:1, y:0, skewY:0, duration:1.2, ease:"expo.out" }, "-=0.5")
      .fromTo(lastNameRef.current,  { opacity:0, y:80, skewY:-4 }, { opacity:1, y:0, skewY:0, duration:1.2, ease:"expo.out" }, "-=0.9")
      .fromTo(roleRef.current,      { opacity:0, y:30 },           { opacity:1, y:0, duration:0.9, ease:"power2.out" }, "-=0.5")
      .fromTo(ctaRef.current,       { opacity:0, y:20 },           { opacity:1, y:0, duration:0.8, ease:"power2.out" }, "-=0.4")
      .fromTo(scrollRef.current,    { opacity:0 },                 { opacity:1, duration:0.6 }, "-=0.2");
  }, []);

  const handleUnmute = () => {
    const v = videoRef.current;
    if (!v) return;
    const nowMuted = !isMuted;
    v.muted     = nowMuted;
    v.volume    = 1;
    globalMuted = nowMuted;
    setIsMuted(nowMuted);
  };

  return (
    <section ref={sectionRef} className={styles.hero}>

      <div className={styles.bgVideoWrap}>
        <video
          ref={videoRef}
          className={styles.bgVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.bgBlur} />
      </div>

      <div className={styles.gradientOverlay} />
      <CinematicLayer />

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

      <button
        className={`${styles.muteBtn} ${isMuted ? styles.muteBtnMuted : styles.muteBtnOn}`}
        onClick={handleUnmute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
            Tap for sound
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            Sound on
          </>
        )}
      </button>

      <button
        ref={scrollRef}
        className={styles.scrollIndicator}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}
        aria-label="Scroll down"
      >
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine}><div className={styles.scrollPulse} /></div>
      </button>
    </section>
  );
}
