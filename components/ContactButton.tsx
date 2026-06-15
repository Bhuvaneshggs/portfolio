import styles from "./ContactButton.module.css";

interface ContactButtonProps {
  href: string;
  label: string;
  external?: boolean;
}

export default function ContactButton({ href, label, external = false }: ContactButtonProps) {
  return (
    <a
      href={href}
      className={styles.btn}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {label}
      <span className={styles.arrow}>→</span>
    </a>
  );
}
