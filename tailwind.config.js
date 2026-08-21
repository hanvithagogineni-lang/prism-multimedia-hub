/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prismOrange: "#FF5722",
        prismOrangeHover: "#E64A19",
        darkBg: "#0a0a0d",
        cardBg: "#121217",
        cardBorder: "rgba(255, 255, 255, 0.08)",
      }
    },
  },
  plugins: [],
}
