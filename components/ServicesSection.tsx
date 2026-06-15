"use client";

import FadeIn from "./FadeIn";
import styles from "./ServicesSection.module.css";

const services = [
  {
    num: "01",
    title: "Network Infrastructure",
    desc: "Design and maintenance of enterprise network environments — routers, switches, firewalls, VLANs, and multi-site connectivity. Firewall rule management, port forwarding, and network security hardening.",
  },
  {
    num: "02",
    title: "Cloud & DevOps Engineering",
    desc: "AWS infrastructure with EC2, S3, VPC, IAM, Route 53, and CloudWatch. Containerization with Docker & Kubernetes, Infrastructure as Code with Terraform, and CI/CD pipeline setup with Jenkins.",
  },
  {
    num: "03",
    title: "System Administration",
    desc: "Windows Server and Active Directory management, user account provisioning, remote support, and enterprise application maintenance — including dealer management systems like Toyota CTDMS.",
  },
  {
    num: "04",
    title: "Security & Data Management",
    desc: "NAS storage system management, access control policies, data integrity assurance, and confidential business data protection. Maintaining compliance across multi-branch IT environments.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <FadeIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Services</span>
            <h2 className={styles.heading}>What I do</h2>
          </div>
        </FadeIn>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={styles.card}>
                <span className={styles.num}>{s.num}</span>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
                <div className={styles.cardLine} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
