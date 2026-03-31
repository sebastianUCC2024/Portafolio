import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F14", // dark elegante (no negro puro)
        foreground: "#E6EDF3",

        primary: "#00E0A4", // verde elegante
        primarySoft: "#00c896",

        card: "#121821",
        border: "#1F2933",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;