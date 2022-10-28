import styled from "styled-components";



export const Container = styled.main`
  min-height: 100vh;
  background-image: url("/images/bgCadastro.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  min-height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5rem;
  gap: 10%;

  div {
    width: min(448px, 100%);
    height: 100%;
    border-radius: 5px;
    padding: 2rem;
    background-color: #00000022;
    backdrop-filter: blur(8px);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    strong {
      font-size: 1.5rem;
    }

    p {
      font-size: 1.2rem;
    }

    form {
      width: min(384px, 100%);
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      label {
        font-size: 0.85rem;
        margin-right: auto;
      }
      input {
        height: 3rem;
        border-radius: 0.2rem;
        padding: 0.5rem;
        color: #000;
        background: #fff;
      }
    }

    button{
      
    }
  }

  img {
    width: min(250px, 30%);
    max-height: fit-content;
    align-self: flex-end;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    padding: 6rem 1rem 0 1rem;
    flex-direction: column;
    margin: 0;
    img {
      align-self: center;
      margin-top: -2rem;
      z-index: 10;
    }
  }
`;
