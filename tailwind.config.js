/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {

    extend: {
      colors:{
        "c-blue":{
          300:"#65BAFA",
          500:"#0890F7",
          800:"#22245d",
          900:"#141E59",
          950:"#0e1040"
        }
      },
      backgroundImage:{
        "bgnave":"url('/images/bgOnboarding.png')",
        "bgsatelites":"url('/images/satelites/bgSatelite.png')",
      },
    },
  },
  plugins: [],
}
