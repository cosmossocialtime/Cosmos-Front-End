/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx",
    "./node_modules/tailwind-datepicker-react/dist/**/*.tsx"],

  theme: {

    extend: {

      screens: {
        "medium": { "min": "1601", "max": "1680" }
      },

      fontFamily: {
        sans: "Inter, sans-serif",
      },
      colors: {
        gray: {
          100: "#FDFDFF",
          200: "#EFF1F5",
          300: "#D0D5E5",
          400: "#A2ABCC",
          500: "#727CA3",
          600: "#363F63",
          700: "#575757",
          800: "#1B2031",
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
        },
        violet: {
          400: "#9D37F2",
          500: "#7A40D3",
          600: "#642BBB",
          700: "#6F5597",
          800: "#603C97",
          900: "#22255D",
        },
        red: {
          400: "#EB3D66"
        },
        blue: {
          200: "#9CD3FC",
          300: "#65BAFA",
          400: "#0890F7",
          600: "#3662D3",
          700: "#2C418C",
          800: "#141E59",
          900: "#0B1340",
        },
        red: {
          500: "#EB3D66",
        }
      },
      backgroundImage: {
        "bgnave": "url('/images/bgOnboarding.png')",
        "bgsatelites": "url('/images/satelites/bgSatelite.png')",
        "art-board": "url(/images/background-art-board.png)",
        "currentMission": "url(/images/bg-current-mission.png)",
        "espaco": "url(/images/bgEspaco.png)",
        "bgCadastro": "url(/images/bgCadastro.png)",
        "bgTerra": "url(/images/bgTerra.png)",
        "little-nave": "url(/images/bgNave.png)"
      },
    },
    plugins: [
      require('tailwind-scrollbar')({ nocompatible: true }),
    ],
  }
}