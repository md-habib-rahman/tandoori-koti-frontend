/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0B0F12", // Base canvas background
          darker: "#070A0C", // Deep background for navbars & footers
          card: "#12171C", // Elevated container background
          gold: "#C5A880", // Primary accent gold
          goldLight: "#DFCAAD", // Hover gold
          goldDark: "#9E825D", // Borders & filigree lines
          cream: "#F4F1EA", // Primary typography
          muted: "#8A949E", // Subtitle / muted text
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
