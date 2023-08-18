/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["League Spartan", "sans-serif"],
      },
      colors: {
        "clr-desaturated-cyan": "hsl(180, 29%, 50%)",
        "clr-grayish-cyan-100": "hsl(180, 52%, 96%)",
        "clr-grayish-cyan-200": "hsl(180, 31%, 95%)",
        "clr-grayish-cyan-600": "hsl(180, 8%, 52%)",
        "clr-grayish-cyan-700": "hsl(180, 14%, 20%)",
      },
    },
  },
  plugins: [],
}
