/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        splash: "740px",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        coastal: {
          bg: "var(--color-bg)",
          alt: "var(--color-bg-alt)",
          ink: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
          line: "var(--color-line)",
          accent: "var(--color-accent)",
          deep: "var(--color-accent-deep)",
        },
      },
    },
  },
  plugins: [],
};
