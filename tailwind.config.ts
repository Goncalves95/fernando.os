import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#FF4500",
          dim: "#cc3700",
          glow: "#ff6a33",
        },
        surface: {
          DEFAULT: "#0d0d0d",
          raised: "#111111",
          panel: "#1a1a1a",
          border: "#2a2a2a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        blink: "blink 1s steps(2, start) infinite",
        "fade-in": "fade-in 0.4s ease-out forwards",
        scanline: "scanline 8s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 69, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
