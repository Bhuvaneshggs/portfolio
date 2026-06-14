import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Bhuvanesh Gopal — IT Engineer & DevOps",
  description:
    "IT Infrastructure Engineer specializing in network management, system administration, and DevOps. Based in Vellore, Tamil Nadu.",
  keywords: [
    "IT Engineer",
    "DevOps",
    "Network Engineer",
    "AWS",
    "Docker",
    "Kubernetes",
    "Bhuvanesh Gopal",
  ],
  openGraph: {
    title: "Bhuvanesh Gopal — IT Engineer & DevOps",
    description: "IT Infrastructure & DevOps Engineer based in Tamil Nadu, India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
