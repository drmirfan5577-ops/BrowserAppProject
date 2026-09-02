import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
        orbitron: ["Orbitron", "monospace"],
        urdu: ["Noto Nastaliq Urdu", "Urdu Typesetting", "Arial Unicode MS", "sans-serif"],
      },
      colors: {
        "bg-primary": "hsl(var(--bg-primary))",
        "bg-secondary": "hsl(var(--bg-secondary))",
        "glass-bg": "hsl(var(--glass-bg))",
        "glass-border": "hsl(var(--glass-border))",
        "accent-primary": "hsl(var(--accent-primary))",
        "accent-secondary": "hsl(var(--accent-secondary))",
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-muted": "hsl(var(--text-muted))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "ticker": "ticker-scroll 30s linear infinite",
        "ticker-rtl": "ticker-scroll-rtl 35s linear infinite",
        "rotate-sphere": "rotate-sphere 8s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-ring": "spin-ring 4s linear infinite",
        "counter-spin": "counter-spin 6s linear infinite",
      },
      backdropBlur: {
        "xs": "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
