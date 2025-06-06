import 'react-toastify/dist/ReactToastify.css'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root{
        --purple-400:#68459E;
        --purple-500:#7A40D3;

        --gray-50:#F9FAFF;
        --gray-200:#f1f1f1;
        --gray-300:#dfdfdf;
        --gray-400:#D0D5E5;
        --gray-500:#6B78AE;
        --gray-600:#363F63;
        --gray-700:#443F4D;
        
        --blue-300:#65BAFA;
        --blue-500:#0890F7;
        --blue-900:#141E59;

        --yellow-500: #FFD743;
        --yellow-900: #624F09;

        --green-500: #AEDF55;

        --red-500: #FD6062;

    }

    body{
      
        font-family:'Inter', sans-serif;
        -webkit-font-smoothing: antialiased!important;
        font-weight: lighter;
        color: #363F63;
    }

    svg{
      display: flex;
    }

    button{
      background: none;
      cursor: pointer;
    }

    input{
      font-family: inherit;
      background-color:inherit;
    }

    *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    text-decoration: none;
    border: none;
    }

    html  {
    @media(max-width: 1080px) {
      font-size: 93.75%;
    }
    @media(max-width: 768px) {
      font-size: 80%
    }
    @media(max-width: 480px) {
      font-size: 70%
    }
  }

  .colorButton{
    background: var(--purple-500);
    color: #fff;
    font-weight: 600;
    height: 3rem;
    border-radius: .5rem;
    transition: background .2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    :hover {
      background: #7A40D3;
    }
    :disabled{
      background: #D0D5E5;
      cursor: not-allowed;
    }
  }

  .colorButtonSecondary {
  background-color: #0A84FF; /* azul vibrante */
  color: #ffffff;
  font-weight: regular;
  height: 3rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.colorButtonSecondary:hover {
  background-color: #006FE0; /* azul mais escuro no hover */
}

.colorButtonSecondary:disabled {
  background-color: #D0D5E5;
  cursor: not-allowed;
}
  
.gradient-border {
    position: relative;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background: transparent; /* ou sua cor de fundo */
  }
  
  .gradient-border::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 0.5rem;
    padding: 1.5px;
    background: 
      radial-gradient(46.74% 45.51% at -22.1% 1.95%, rgba(255, 87, 242, 0.49) 0%, rgba(255, 117, 244, 0) 100%),
      radial-gradient(35.51% 31.45% at 69.2% 96.48%, rgba(255, 87, 242, 0.49) 0%, rgba(255, 117, 244, 0) 100%),
      radial-gradient(82.97% 24.11% at 64.49% 43.75%, rgba(87, 174, 255, 0.49) 0%, rgba(255, 117, 244, 0) 100%, rgba(117, 222, 255, 0) 100%),
      radial-gradient(27.54% 23.05% at -25% 96.09%, rgba(87, 174, 255, 0.26) 0%, rgba(255, 117, 244, 0) 100%, rgba(117, 222, 255, 0) 100%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
    
.hide-during-print {
}
`
