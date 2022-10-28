// styled

import styled from "styled-components";


  export const Container = styled.main`
    min-height: 100vh;
    background-image: url("/images/bgCadastro.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  
  export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    min-height: 100vh;
    padding: 1rem 1rem 0rem 1rem;
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
      padding: 1rem;
    }
  
    img {
      height: fit-content;
      width: 45%;
      align-self: flex-end;
      @media (max-width: 768px){
        align-self: center;
        width: 60%;
      }
    }
  
    div {
      padding: 1rem;
      width: min(448px, 90%);
      height: 473px;
      background: #0000001c;
      backdrop-filter: blur(10px);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      border-radius: 2%;
      @media (max-width: 768px){
        height: 100%;
      }
  
      h2 {
        font-size: 1.5rem;
        font-weight: bold;
        width: min(270px, 100%);
      }
      p {
        font-size: 1.2rem;
        width: min(360px, 100%);
      }
    }
  `;
  
  export const RadioBox = styled.button`
    background: var(--purple-500);
    color: #fff;
    font-weight: bold;
    width: min(384px, 100%);
    height: 3rem;
    border-radius: 0.5rem;
    transition: background 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    :hover {
      background: #642bbb;
    }
    :disabled{
      background: #6F5597;
      cursor: not-allowed;
    }
  `;
  
  export const OtherGender = styled.span`
    display: flex;
    color: #fff;
    font-weight: bold;
    width: min(384px, 100%);
    height: 3rem;
    transition: background 0.2s;
    gap: 2%;
  
    input {
      height: 100%;
      width: 80%;
      color: #000;
      padding: 0.5rem;
      border-radius: 0.2rem;
    }
  
    button {
      height: 100%;
      width: 23%;
      background: var(--purple-500);
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 2rem;
  
      transition: background 0.2s;
      :hover {
        background: #642bbb;
      }
    }
  `;
  