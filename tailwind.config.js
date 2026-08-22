// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Mono", "Geist", "monospace"],
        sans: ["Space Mono", "Geist", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
