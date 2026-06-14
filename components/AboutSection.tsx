"use client";

import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import styles from "./AboutSection.module.css";

const techSkills = [
  { category: "Network & Security", items: ["Firewall & Router Config", "Firewall Rule Management", "Port Forwarding", "Network Security", "NAS Storage Management"] },
  { category: "System Administration", items: ["Windows Server", "Active Directory", "Remote Support", "System Troubleshooting", "User Access Control"] },
  { category: "Cloud & DevOps", items: ["AWS (EC2, S3, VPC, IAM)", "Route 53, CloudWatch", "Auto Scaling", "Docker", "Kubernetes (K8s)"] },
  { category: "Infrastructure as Code", items: ["Terraform", "Shell Scripting (Bash)", "Linux Admin (Ubuntu/CentOS)", "CI/CD Pipelines", "Jenkins"] },
  { category: "Version Control & Tools", items: ["Git & GitHub", "Microsoft Office 365", "CTDMS (Toyota DMS)", "HTML, CSS, JavaScript", "Basic Java, C++"] },
];

export default function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        {/* Left — bio */}
        <div className={styles.bio}>
          <FadeIn delay={0}>
            <span className={styles.eyebrow}>About</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className={styles.heading}>
              <AnimatedText text="Building reliable" delay={0.1} />
              <br />
              <AnimatedText text="infrastructure." delay={0.2} />
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className={styles.body}>
              IT Infrastructure Engineer with hands-on experience managing multi-location networks,
              server environments, and enterprise systems. Currently at Lanson Motors (Lanson Toyota),
              maintaining mission-critical IT infrastructure and the Toyota Dealer Management System.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className={styles.body}>
              Expanding into Cloud & DevOps — focused on AWS, containerization with Docker &
              Kubernetes, and automating infrastructure with Terraform and CI/CD pipelines.
              Passionate about bridging traditional IT with modern cloud-native practices.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>1+</span>
                <span className={styles.statLabel}>Year Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>5+</span>
                <span className={styles.statLabel}>Locations Managed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>10+</span>
                <span className={styles.statLabel}>Tech Skills</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right — skills grid */}
        <div className={styles.skills}>
          <FadeIn delay={0.15}>
            <span className={styles.eyebrow}>Skills</span>
          </FadeIn>
          <div className={styles.skillsGrid}>
            {techSkills.map((group, gi) => (
              <FadeIn key={gi} delay={0.15 + gi * 0.1}>
                <div className={styles.skillCard}>
                  <span className={styles.skillCategory}>{group.category}</span>
                  <ul className={styles.skillList}>
                    {group.items.map((item, ii) => (
                      <li key={ii} className={styles.skillItem}>
                        <span className={styles.dot} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
