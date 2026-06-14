"use client";

import FadeIn from "./FadeIn";
import Magnet from "./Magnet";
import styles from "./ContactSection.module.css";

const contacts = [
  {
    label: "Email",
    value: "bhuvanesh2228895@gmail.com",
    href: "mailto:bhuvanesh2228895@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 9597916799",
    href: "tel:+919597916799",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.35a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.bhuvaneshgopal.com",
    href: "https://linkedin.bhuvaneshgopal.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.bhuvaneshgopal.com",
    href: "https://github.bhuvaneshgopal.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <FadeIn>
          <span className={styles.eyebrow}>Contact</span>
          <h2 className={styles.heading}>
            Let&apos;s work<br />together.
          </h2>
          <p className={styles.sub}>
            Open to DevOps, Cloud, and IT Engineering roles across Tamil Nadu and remote.
          </p>
        </FadeIn>

        <div className={styles.contacts}>
          {contacts.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <Magnet strength={0.25}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={styles.contactCard}
                >
                  <div className={styles.icon}>{c.icon}</div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardLabel}>{c.label}</span>
                    <span className={styles.cardValue}>{c.value}</span>
                  </div>
                  <div className={styles.arrow}>→</div>
                </a>
              </Magnet>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className={styles.footer}>
            <span className={styles.footerName}>Bhuvanesh Gopal</span>
            <span className={styles.footerLoc}>Vellore, Tamil Nadu · India</span>
            <span className={styles.footerCopy}>© {new Date().getFullYear()}</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
