"use client";

import FadeIn from "./FadeIn";
import styles from "./ExperienceSection.module.css";

const experiences = [
  {
    company: "Lanson Motors Private Limited",
    brand: "Lanson Toyota",
    role: "IT Engineer — Information Technology Services",
    period: "Sep 2024 – Present",
    location: "Vellore, Tamil Nadu",
    type: "Full-time",
    responsibilities: [
      "Manage and maintain IT infrastructure across multiple company locations",
      "Provide hardware, software, and network troubleshooting support",
      "Maintain and support Toyota Dealer Management System (CTDMS)",
      "Create and manage user accounts, permissions, and access control via Active Directory",
      "Configure and maintain routers, switches, and firewalls across all branches",
      "Create and modify firewall rules and port forwarding configurations",
      "Manage NAS storage systems and ensure secure data access",
      "Provide Microsoft Office 365 and system support for employees",
      "Maintain network security and protect confidential business data",
    ],
    skills: ["Firewall Config", "Active Directory", "Windows Server", "NAS Storage", "CTDMS", "Office 365", "Network Security"],
  },
];

const education = [
  {
    institution: "Sri Balaji Chockalingam Engineering College",
    location: "Tiruvannamalai",
    degree: "B.Tech — Information Technology",
    affiliation: "Anna University (Affiliated)",
    period: "2021 – 2024",
  },
  {
    institution: "Sri Venkateswara Polytechnic College",
    location: "Vellore",
    degree: "Diploma — Computer Engineering",
    affiliation: "Tamil Nadu Directorate of Technical Education",
    period: "2018 – 2021",
  },
  {
    institution: "Seventh Day Adventist School",
    location: "Vellore",
    degree: "SSLC",
    affiliation: "State Board of School Examinations, Tamil Nadu",
    period: "Completed 2018",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>

        {/* Work Experience */}
        <FadeIn>
          <span className={styles.eyebrow}>Experience</span>
          <h2 className={styles.heading}>Work History</h2>
        </FadeIn>

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <FadeIn key={i} delay={0.1}>
              <div className={styles.expCard}>
                <div className={styles.expLeft}>
                  <div className={styles.dot} />
                  <div className={styles.line} />
                </div>

                <div className={styles.expRight}>
                  <div className={styles.expHeader}>
                    <div>
                      <h3 className={styles.company}>{exp.company}</h3>
                      <span className={styles.brand}>{exp.brand}</span>
                    </div>
                    <div className={styles.expMeta}>
                      <span className={styles.period}>{exp.period}</span>
                      <span className={styles.badge}>{exp.type}</span>
                    </div>
                  </div>

                  <div className={styles.roleRow}>
                    <span className={styles.role}>{exp.role}</span>
                    <span className={styles.location}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {exp.location}
                    </span>
                  </div>

                  <ul className={styles.responsibilities}>
                    {exp.responsibilities.map((r, ri) => (
                      <li key={ri} className={styles.respItem}>
                        <span className={styles.respDot} />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.skillTags}>
                    {exp.skills.map((s, si) => (
                      <span key={si} className={styles.tag}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Education */}
        <FadeIn delay={0.15}>
          <div className={styles.eduHeader}>
            <span className={styles.eyebrow}>Education</span>
            <h2 className={styles.heading}>Academic Background</h2>
          </div>
        </FadeIn>

        <div className={styles.eduGrid}>
          {education.map((edu, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={styles.eduCard}>
                <div className={styles.eduPeriod}>{edu.period}</div>
                <h3 className={styles.eduInstitution}>{edu.institution}</h3>
                <span className={styles.eduLocation}>{edu.location}</span>
                <p className={styles.eduDegree}>{edu.degree}</p>
                <p className={styles.eduAffil}>{edu.affiliation}</p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
