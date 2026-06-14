"use client";

import FadeIn from "./FadeIn";
import styles from "./ProjectsSection.module.css";

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
    year: "2025",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
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
              className={styles.card}
              style={{ top: `${8 + i * 2}rem` }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
