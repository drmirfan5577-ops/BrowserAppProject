import React from "react";
import { useBrowser } from "@/contexts/BrowserContext";
import esbLogo from "@/assets/esb-logo.png";

interface RotatingLogoProps {
  size?: "sm" | "md" | "lg";
}

export function RotatingLogo({ size = "md" }: RotatingLogoProps) {
  const { theme } = useBrowser();
  
  const sizes = {
    sm: { outer: 60, inner: 40, ring1: 54, ring2: 48 },
    md: { outer: 80, inner: 56, ring1: 72, ring2: 64 },
    lg: { outer: 120, inner: 84, ring1: 108, ring2: 96 },
  };

  const s = sizes[size];

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: s.outer, height: s.outer }}
    >
      {/* Outer spinning ring */}
      <div
        className="absolute rounded-full border-2 opacity-40"
        style={{
          width: s.ring1,
          height: s.ring1,
          borderColor: "hsl(var(--accent-primary))",
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          animation: "spin-ring 4s linear infinite",
        }}
      />
      {/* Inner counter-spinning ring */}
      <div
        className="absolute rounded-full border opacity-30"
        style={{
          width: s.ring2,
          height: s.ring2,
          borderColor: "hsl(var(--accent-secondary))",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
          animation: "counter-spin 6s linear infinite",
        }}
      />
      {/* Glow core */}
      <div
        className="absolute rounded-full pulse-glow"
        style={{
          width: s.inner,
          height: s.inner,
          background: "radial-gradient(circle, hsl(var(--accent-primary)/0.3) 0%, transparent 70%)",
        }}
      />
      {/* Logo image */}
      <img
        src={esbLogo}
        alt="ESB Logo"
        className="relative z-10 rounded-full object-cover"
        style={{ width: s.inner - 8, height: s.inner - 8 }}
      />
    </div>
  );
}
