/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "440px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    function ({ addVariant }) {
      addVariant("hover-div", "&:hover > div");
    },
  ],
};
