
import styled from "styled-components";



export const Container = styled.main`
    height: 100vh;
    background-image: url("/images/bgEspaco.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  `;

export const Content = styled.div`
    display: flex;
    img {
      height: fit-content;
      width: 45%;
      z-index: 1;
      margin-left: -10rem;
    }

    a{
      margin-top: 1rem;
      padding: .5rem 10rem;
      border-radius: 8px;
      background-color: #7A40D3;
      font-size: 18px;
      transition: all .1s ease-in;

      :hover{
        background-color: #7B61FF;
      }
    }
  
    div {
      width: 800px;
      height: 580px;
      padding: 1rem;
      background: #00000055;
      backdrop-filter: blur(10px);
      border-radius: 1.5%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 2rem;
  
      h2 {
        font-size: 2.5rem;
        font-weight: bold;
      }
  
      p {
        width: min(400px, 100%);
        font-size: 1.25rem;
        font-weight: 100;
      }
    }
  
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      div {
          width: 90%;
          height: fit-content;
      }
  
      img{
          width: 70%;
          margin: 0 auto;
          margin-top: -2rem;
      }
    }
  `;
