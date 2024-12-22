/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      letterSpacing: {
        tighter: "-0.1em",
      },
      screens: {
        // mobile: "460px",
        mobile: "800px",

        desktop: "1400px",
      },
      backgroundImage: {
        "custom-bg": "url('/img/background.png')",
      },
    },
  },
  plugins: [],
};
