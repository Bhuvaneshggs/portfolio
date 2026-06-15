"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "./FadeIn";
import styles from "./ProjectsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Android Malware Detector API",
    tech: ["Python", "Androguard", "CatBoost", "Blockchain", "REST API"],
    desc: "Built a machine-learning API that analyzes Android APKs for malware signatures using Androguard for static analysis and CatBoost for classification, integrated into a blockchain domain for immutable threat logging.",
    type: "Research Project",
    year: "2024",
  },
  {
    id: "02",
    title: "Multi-Site IT Infrastructure",
    tech: ["Cisco", "Firewalls", "Windows Server", "Active Directory", "NAS"],
    desc: "Designed and currently managing the entire IT infrastructure for Lanson Toyota across 5+ locations — including unified AD, secure NAS storage, centralized firewall policies, and Toyota CTDMS integration.",
    type: "Professional",
    year: "2024–Present",
  },
  {
    id: "03",
    title: "DevOps Pipeline (In Progress)",
    tech: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"],
    desc: "Personal DevOps lab environment — provisioning AWS infrastructure with Terraform, containerizing services with Docker, orchestrating with Kubernetes, and automating deployments through Jenkins CI/CD pipelines.",
    type: "Personal Lab",
    year: "2026",
  },
];

/* How far each card is offset when stacked */
const STACK_OFFSET = 18; // px from top per card

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        /* Each card except the last scales down + dims as the next card scrolls over it */
        if (i < projects.length - 1) {
          gsap.to(card, {
            scale:   0.94 - i * 0.02,
            opacity: 0.55,
            filter:  "brightness(0.6)",
            ease:    "none",
            scrollTrigger: {
              trigger:  cardRefs.current[i + 1], // triggered when the NEXT card arrives
              start:    "top 65%",
              end:      "top 20%",
              scrub:    true,
            },
          });
        }

        /* Entrance: each card fades + slides up when it first enters viewport */
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start:   "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className={styles.section}>
      <div className={styles.inner}>
        <FadeIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Projects</span>
            <h2 className={styles.heading}>Selected Work</h2>
          </div>
        </FadeIn>

        <div className={styles.stack}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={styles.card}
              style={{
                top:    `${STACK_OFFSET + i * STACK_OFFSET}px`,
                zIndex: i + 1,
              }}
            >
              <div className={styles.cardMeta}>
                <span className={styles.cardId}>{p.id}</span>
                <div className={styles.cardRight}>
                  <span className={styles.cardType}>{p.type}</span>
                  <span className={styles.cardYear}>{p.year}</span>
                </div>
              </div>

              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>

              <div className={styles.techWrap}>
                {p.tech.map((t, ti) => (
                  <span key={ti} className={styles.tag}>{t}</span>
                ))}
              </div>

              {/* subtle card number watermark */}
              <span className={styles.cardWatermark}>{p.id}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
