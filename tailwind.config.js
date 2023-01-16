/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
      },
      colors: {
        gray: {
          100: "#FDFDFF"
        },
        indigo: {
          200: "#727CA3",
          500: "#363F63",
        },
        cian: {
          300: "#18A6AC",
          500: "#0890F7"
        },
        "c-blue": {
          300: "#65BAFA",
          500: "#0890F7",
          700: "#2C2D66",
          800: "#22245d",
          900: "#141E59",
          950: "#0e1040"
        }
      },
      backgroundImage: {
        "bgnave": "url('/images/bgOnboarding.png')",
        "bgsatelites": "url('/images/satelites/bgSatelite.png')",
      },
    },
  },
  plugins: [],
}
