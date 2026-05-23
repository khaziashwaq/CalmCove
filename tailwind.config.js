/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Steel Blue - primary actions & nav
        steel: {
          50: "#f0f5fa",
          100: "#dce8f4",
          200: "#b9d1e9",
          300: "#8db5da",
          400: "#6198c8",
          500: "#437DB7",
          600: "#366499",
          700: "#2c5180",
          800: "#264468",
          900: "#1e3754",
        },
        // Cream/Beige - backgrounds & surfaces
        sand: {
          50: "#fffcf5",
          100: "#fef8ea",
          200: "#FDF1DB",
          300: "#fae5b8",
          400: "#f6d48e",
          500: "#f0bf5e",
          600: "#dba033",
          700: "#b57f24",
          800: "#926422",
          900: "#785320",
        },
        // Golden Yellow - warm accents & highlights
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#F2B100",
          500: "#d99e00",
          600: "#b37e00",
          700: "#8c6200",
          800: "#6d4c00",
          900: "#5a3f00",
        },
        // Muted Green - nature & growth
        sage: {
          50: "#f0f8f2",
          100: "#dcf0e1",
          200: "#b8e0c3",
          300: "#88ca9a",
          400: "#4C925E",
          500: "#3d7a4e",
          600: "#316340",
          700: "#294f35",
          800: "#23402d",
          900: "#1d3526",
        },
        // Soft Pink - gentle accents
        rose: {
          50: "#fef5f4",
          100: "#fde8e5",
          200: "#fbd4cf",
          300: "#F1A79D",
          400: "#e8847a",
          500: "#db6358",
          600: "#c44a40",
          700: "#a43b33",
          800: "#87332d",
          900: "#702e29",
        },
        cream: {
          50: "#fffdf7",
          100: "#fef9ec",
          200: "#FDF1DB",
          300: "#fae5b8",
          400: "#f6d48e",
          500: "#f0bf5e",
          600: "#dba033",
          700: "#b57f24",
          800: "#926422",
          900: "#785320",
        },
      },
      fontFamily: {
        sans: ["var(--font-mono)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        journal: ["'Virgil'", "cursive"],
        serif: ["'Georgia'", "'Times New Roman'", "serif"],
        mono: ["var(--font-mono)"],
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
        breathe: "breathe 8s ease-in-out infinite",
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
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar-hide")],
};
