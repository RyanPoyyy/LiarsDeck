/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      letterSpacing: {
        tighter: "-0.1em",
      },
      screens: {
        mobile: "460px",
      },
    },
  },
  plugins: [],
};
