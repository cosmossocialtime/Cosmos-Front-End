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

  .cBtn{
    background: var(--purple-500);
    color: #fff;
    font-weight: bold;
    height: 3.5rem;
    border-radius: .5rem;
    transition: background .2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    :hover {
      background: #642BBB;
    }
    :disabled{
      background: #6F5597;
      cursor: not-allowed;
    }
  }
`
