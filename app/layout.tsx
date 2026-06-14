import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomCursor from "@/components/CustomCursor";
import "../styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover", // handles notched phones (iPhone X+)
};

export const metadata: Metadata = {
  title: "Bhuvanesh Gopal — IT Engineer & DevOps",
  description:
    "IT Infrastructure Engineer specializing in network management, system administration, and DevOps. Based in Vellore, Tamil Nadu.",
  keywords: [
    "IT Engineer", "DevOps", "Network Engineer",
    "AWS", "Docker", "Kubernetes", "Bhuvanesh Gopal",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.png",    sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Bhuvanesh Gopal — IT Engineer & DevOps",
    description: "IT Infrastructure & DevOps Engineer based in Tamil Nadu, India.",
    type: "website",
    images: [{ url: "/icon.png", width: 512, height: 512 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
