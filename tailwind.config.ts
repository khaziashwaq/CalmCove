import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  plugins: [
    require("flowbite/plugin"),
  ],
  theme: {
    extend: {
      colors: {
        // Warm neutral palette
        sand: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#ebe0d0",
          300: "#dcc9b0",
          400: "#c9a882",
          500: "#b8905e",
          600: "#a07a4e",
          700: "#866441",
          800: "#6d523a",
          900: "#5a4432",
        },
        // Dusty rose
        rose: {
          50: "#fdf2f4",
          100: "#fce7eb",
          200: "#f9d0d9",
          300: "#f4aabb",
          400: "#ed7d99",
          500: "#e05479",
          600: "#cc3462",
          700: "#ab2652",
          800: "#8f2349",
          900: "#7a2143",
        },
        // Muted lavender
        lavender: {
          50: "#f2f7f4",
          100: "#e0ede4",
          200: "#c2dbc9",
          300: "#96c2a3",
          400: "#64a578",
          500: "#438c5a",
          600: "#327046",
          700: "#295a3a",
          800: "#234830",
          900: "#1e3b28",
        },
        // Faded sage
        sage: {
          50: "#f4f7f4",
          100: "#e6ede6",
          200: "#cedacd",
          300: "#a9bea8",
          400: "#7d9c7b",
          500: "#5c7f5a",
          600: "#486646",
          700: "#3b5239",
          800: "#324331",
          900: "#2a382a",
        },
        // Soft cream
        cream: {
          50: "#fffdf7",
          100: "#fef9ec",
          200: "#fdf2d4",
          300: "#fbe8b3",
          400: "#f7d680",
          500: "#f3c14d",
          600: "#e5a323",
          700: "#bf821a",
          800: "#98661c",
          900: "#7c541b",
        },
        // Blue gray (calm muted blue)
        calm: {
          50: "#f5f7fa",
          100: "#ebeef3",
          200: "#d3dae5",
          300: "#acbace",
          400: "#7f95b3",
          500: "#5f789a",
          600: "#4b6080",
          700: "#3e4f68",
          800: "#364458",
          900: "#313b4b",
        },
        // Deep teal (primary accent)
        teal: {
          50: "#f0faf7",
          100: "#d4f1e8",
          200: "#a9e3d1",
          300: "#72cdb4",
          400: "#3fb093",
          500: "#269078",
          600: "#1b7462",
          700: "#175e50",
          800: "#154b41",
          900: "#1a3f37",
          950: "#0a2621",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        journal: ["'Virgil'", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-calm":
          "linear-gradient(135deg, #faf8f5 0%, #f5f0e8 25%, #f6f4fb 50%, #f4f7f4 75%, #faf8f5 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 10px 20px -2px rgba(0, 0, 0, 0.02)",
        glow: "0 0 40px -10px rgba(67, 140, 90, 0.2)",
        warm: "0 4px 30px -5px rgba(220, 201, 176, 0.25)",
        inner: "inset 0 2px 10px 0 rgba(0, 0, 0, 0.03)",
      },
      animation: {
        "float-slow": "float 20s ease-in-out infinite",
        "float-slower": "float 30s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "breathe": "breathe 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-20px) translateX(10px)" },
          "66%": { transform: "translateY(10px) translateX(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.05)" },
        },
      },
    },
  },
};
export default config;

