"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import styles from "./HeroSection.module.css";

const CinematicLayer = dynamic(() => import("./CinematicLayer"), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // ✅ THE FIX: React doesn't properly set the `muted` attribute on <video>.
  // We must set it directly on the DOM node, then call play().
  useEffect(() => {
    const playVideo = async (vid: HTMLVideoElement | null) => {
      if (!vid) return;
      // Set muted directly on the DOM node — React's `muted` prop is broken
      vid.defaultMuted = true;
      vid.muted = true;
      vid.setAttribute("muted", "");
      vid.setAttribute("playsinline", "");
      vid.loop = true;
      try {
        await vid.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay failed:", err);
        // Show a manual play button state
        setIsPlaying(false);
      }
    };

    // Small delay ensures DOM is fully ready
    const t = setTimeout(() => {
      playVideo(videoRef.current);
      playVideo(bgVideoRef.current);
    }, 100);

    const hint = setTimeout(() => setShowSoundHint(false), 4500);
    return () => {
      clearTimeout(t);
      clearTimeout(hint);
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
    )
    .fromTo(firstNameRef.current,
      { opacity: 0, y: 80, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "expo.out" },
      "-=0.5"
    )
    .fromTo(lastNameRef.current,
      { opacity: 0, y: 80, skewY: -4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "expo.out" },
      "-=0.9"
    )
    .fromTo(roleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2"
    );
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
    setShowSoundHint(false);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    const bg = bgVideoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      bg?.pause();
      setIsPlaying(false);
    } else {
      v.muted = true;
      v.play().then(() => setIsPlaying(true)).catch(console.warn);
      bg?.play().catch(console.warn);
    }
  };

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className={styles.hero}>

      {/* Blurred ambient background */}
      <div className={styles.bgVideoWrap}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          playsInline
          preload="auto"
          loop
          muted
          onError={() => setVideoError(true)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.bgBlur} />
      </div>

      {/* Cinematic gradients */}
      <div className={styles.gradientOverlay} />

      {/* Three.js bokeh */}
      <CinematicLayer />

      {/* Foreground portrait video */}
      <div className={styles.videoPortrait}>
        {videoError ? (
          <div className={styles.videoPlaceholder}>
            <span>Add hero-video.mp4 to /public</span>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className={styles.fgVideo}
              playsInline
              preload="auto"
              loop
              muted
              onError={() => setVideoError(true)}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            {/* Manual play overlay — shown only if autoplay was blocked */}
            {!isPlaying && (
              <button className={styles.manualPlay} onClick={togglePlay} aria-label="Play video">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
            )}
          </>
        )}
        <div className={styles.videoGlow} />
        <div className={styles.videoVignette} />
      </div>

      {/* Text content */}
      <div className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
          IT Infrastructure · DevOps · Networks
        </span>
        <h1 ref={firstNameRef} className={`${styles.name} hero-heading`}>
          BHUVANESH
        </h1>
        <h1 ref={lastNameRef} className={`${styles.name} hero-heading`}>
          GOPAL
        </h1>
        <p ref={roleRef} className={styles.role}>
          IT Engineer &amp; DevOps Practitioner
          <br />
          <span className={styles.roleDetail}>
            AWS · Docker · Kubernetes · Terraform · CI/CD
          </span>
        </p>
        <div ref={ctaRef} className={styles.cta}>
          <a href="#contact" className={styles.ctaPrimary}>Get in touch</a>
          <a href="#projects" className={styles.ctaSecondary}>View work ↓</a>
          <a
            href="/Bhuvanesh Gopal Resume.pdf"
            download="Bhuvanesh Gopal Resume.pdf"
            className={styles.ctaResume}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </div>
      </div>

      {/* Play / Mute controls */}
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>
        <button className={styles.controlBtn} onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>
      </div>

      {/* Sound hint */}
      {showSoundHint && isPlaying && (
        <div className={styles.soundHint} onClick={toggleMute}>
          <span className={styles.soundDot} />
          Tap for sound
        </div>
      )}

      {/* Scroll indicator */}
      <button ref={scrollRef} className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll down">
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </button>
    </section>
  );
}
