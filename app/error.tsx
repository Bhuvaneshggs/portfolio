"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      color: "#f5f0ea",
      textAlign: "center",
      padding: "2rem",
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.75rem",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#e8702a",
        marginBottom: "1.5rem",
        display: "block",
      }}>
        Error 500
      </span>

      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(6rem, 20vw, 14rem)",
        lineHeight: 0.85,
        background: "linear-gradient(135deg, #f5f0ea 0%, #ff9a56 50%, #e8702a 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: "1.5rem",
      }}>
        500
      </h1>

      <p style={{
        fontSize: "1.1rem",
        fontWeight: 300,
        color: "rgba(245,240,234,0.6)",
        maxWidth: "420px",
        lineHeight: 1.7,
        marginBottom: "2.5rem",
      }}>
        Something went wrong on our end. You can try again or head back home.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "0.85rem 2.2rem",
            background: "#e8702a",
            color: "#080808",
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
            borderRadius: "2px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
        <Link href="/" style={{
          padding: "0.85rem 2.2rem",
          background: "rgba(255,255,255,0.06)",
          color: "#f5f0ea",
          fontWeight: 400,
          fontSize: "0.9rem",
          letterSpacing: "0.05em",
          borderRadius: "2px",
          border: "1px solid rgba(255,255,255,0.1)",
          textDecoration: "none",
        }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(232,112,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,112,42,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        zIndex: -1,
        pointerEvents: "none",
      }} />
    </main>
  );
}
