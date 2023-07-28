/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './node_modules/tailwind-datepicker-react/dist/**/*.tsx',
  ],
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],

  theme: {
    extend: {
      screens: {
        medium: { min: '1601', max: '1680' },
      },
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
      colors: {
        gray: {
          100: '#FDFDFF',
          200: '#EFF1F5',
          300: '#D0D5E5',
          400: '#A2ABCC',
          500: '#727CA3',
          600: '#363F63',
          700: '#575757',
          800: '#1B2031',
        },
        indigo: {
          200: '#727CA3',
          500: '#363F63',
        },
        cian: {
          300: '#18A6AC',
          500: '#0890F7',
        },
        'c-blue': {
          300: '#65BAFA',
          500: '#0890F7',
          700: '#2C2D66',
          800: '#22245d',
          900: '#141E59',
          950: '#0e1040',
        },
        violet: {
          400: '#9D37F2',
          500: '#7A40D3',
          600: '#642BBB',
          700: '#6F5597',
          800: '#603C97',
          900: '#22255D',
        },
        red: {
          400: '#EB3D66',
        },
        blue: {
          200: '#9CD3FC',
          300: '#65BAFA',
          400: '#0890F7',
          600: '#3662D3',
          700: '#2C418C',
          800: '#141E59',
          900: '#0B1340',
        },
        green: {
          300: '#46CE9D',
        },
      },
      backgroundImage: {
        bgNaveDeFundo: "url('/images/bg-nave-de-fundo.jpg')",
        bgsatelites: "url('/images/satelites/bgSatelite.png')",
        bgArtBoard: 'url(/images/bg-art-board.jpg)',
        currentMission: 'url(/images/bg-current-mission.jpg)',
        espaco: 'url(/images/bg-espaco.jpg)',
        bgCadastro: 'url(/images/bg-cadastro.jpg)',
        bgTerra: 'url(/images/bg-terra.jpg)',
        'little-nave': 'url(/images/bg-nave.jpg)',
        decolar: 'url(/images/bg-decolar.jpg)',
        bgTeletransport: 'url(/images/bg-teletransporte.jpg)',
        bgAstronautaDeFrente: 'url(/images/bg-astronauta-de-frente.jpg)',
        bgAstronaltaDeLado: 'url(/images/bg-astronauta-de-lado.jpg)',
        bgPortal: 'url(/images/bg-portal.jpg)',
        bgEspaço: 'url(/images/bg-espaco.jpg)',
      },
    },
  },
}
