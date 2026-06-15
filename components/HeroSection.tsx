"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import styles from "./HeroSection.module.css";

const CinematicLayer = dynamic(() => import("./CinematicLayer"), { ssr: false });

let globalMuted = true;

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bhuvanesh-gopal-20b74a181/",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>),
  },
  {
    label: "GitHub",
    href: "https://github.com/Bhuvaneshggs",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/Bhuvaneshggs",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bhuvanesh_gopal_",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919597916799",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>),
  },
  {
    label: "Email",
    href: "mailto:bhuvanesh2228895@gmail.com",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
  },
  {
    label: "Phone",
    href: "tel:+919597916799",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
  },
];

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const taglineRef   = useRef<HTMLSpanElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef  = useRef<HTMLHeadingElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const socialsRef   = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLButtonElement>(null);

  const [isMuted, setIsMuted] = useState(globalMuted);
  const [hintHidden, setHintHidden] = useState(false);

  /* ── Video setup with audio support ── */
  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section) return;

    // Start muted (browser requirement), then restore persisted state
    v.muted  = true;
    v.volume = 1;
    v.play().then(() => {
      v.muted = globalMuted;
    }).catch(() => {});

    // Mute when scrolled away, restore when back
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.muted = globalMuted;
          setIsMuted(globalMuted);
          v.play().catch(() => {});
        } else {
          v.muted = true;
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);

    // Auto-hide sound hint after 5s
    const t = setTimeout(() => setHintHidden(true), 5000);

    return () => { observer.disconnect(); clearTimeout(t); };
  }, []);

  /* ── GSAP entrance ── */
  useEffect(() => {
    gsap.timeline({ delay: 0.4 })
      .fromTo(taglineRef.current,
        { opacity: 0, y: 18, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" })
      .fromTo(firstNameRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=0.5")
      .fromTo(lastNameRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=0.9")
      .fromTo(roleRef.current,
        { opacity: 0, y: 24, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.95, ease: "power2.out" }, "-=0.5")
      .fromTo(ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, "-=0.45")
      .fromTo(socialsRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" }, "-=0.35")
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 0.7 }, "-=0.25");
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const nowMuted = !isMuted;
    v.muted     = nowMuted;
    v.volume    = 1;
    globalMuted = nowMuted;
    setIsMuted(nowMuted);
    setHintHidden(true);
  };

  return (
    <section ref={sectionRef} className={styles.hero}>

      {/* Single fullscreen video — both blur bg + foreground handled with CSS */}
      <div className={styles.bgVideoWrap}>
        <video
          className={styles.bgVideo}
          autoPlay loop muted playsInline preload="auto"
          aria-hidden="true" tabIndex={-1}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.bgBlur} />
      </div>

      {/* Main foreground video — fullscreen */}
      <video
        ref={videoRef}
        className={styles.fgVideo}
        autoPlay loop muted playsInline preload="auto"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className={styles.gradientOverlay} />
      <CinematicLayer />

      {/* Sound hint badge */}
      <button
        className={`${styles.muteBtn} ${isMuted ? styles.muteBtnMuted : styles.muteBtnOn} ${hintHidden && !isMuted ? styles.muteBtnHide : ""}`}
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
            Tap for sound
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            Sound on
          </>
        )}
      </button>

      {/* Content */}
      <div className={styles.content}>
        <span ref={taglineRef} className={styles.tagline} style={{ opacity: 0 }}>
          <span className={styles.taglineDot} />
          IT Infrastructure · DevOps · Networks
        </span>

        <h1 ref={firstNameRef} className={`${styles.name} hero-heading`} style={{ opacity: 0 }}>BHUVANESH</h1>
        <h1 ref={lastNameRef}  className={`${styles.name} hero-heading`} style={{ opacity: 0 }}>GOPAL</h1>

        <p ref={roleRef} className={styles.role} style={{ opacity: 0 }}>
          IT Engineer &amp; DevOps Practitioner
          <br />
          <span className={styles.roleDetail}>AWS · Docker · Kubernetes · Terraform · CI/CD</span>
        </p>

        <div ref={ctaRef} className={styles.cta} style={{ opacity: 0 }}>
          <a href="#contact"  className={styles.ctaPrimary}>Get in touch</a>
          <a href="#projects" className={styles.ctaSecondary}>View work ↓</a>
          <a href="/Bhuvanesh Gopal Resume.pdf" download="Bhuvanesh Gopal Resume.pdf" className={styles.ctaResume}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </div>

        <div ref={socialsRef} className={styles.socials} style={{ opacity: 0 }}>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={s.label} className={styles.socialIcon} title={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <button
        ref={scrollRef}
        className={styles.scrollIndicator}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to next section"
        style={{ opacity: 0 }}
      >
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollLine}><div className={styles.scrollPulse} /></div>
      </button>

    </section>
  );
}
