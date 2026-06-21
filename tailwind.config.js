/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color: "var(--color)",
      },
      fontFamily: {
        heading: ["Cabinet Grotesk", "General Sans", "sans-serif"],
        body: ["General Sans", "Satoshi", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      fontSize: {
        "hero-heading": ["72px", { lineHeight: "1.05", fontWeight: "700" }],
        h2: ["48px", { lineHeight: "1.15", fontWeight: "700" }],
        h3: ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-large": ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["18px", { lineHeight: "1.7", fontWeight: "400" }],
        small: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        caption: ["14px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      maxWidth: {
        hero: "900px",
      },
    },
  },
  plugins: [],
};
