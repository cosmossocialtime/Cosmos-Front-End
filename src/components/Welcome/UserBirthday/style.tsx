import styled from "styled-components";



export const Container = styled.div`
  min-height: 100vh;
  background-image: url("/images/bgTerra.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Content = styled.div`
  background: #00000047;
  backdrop-filter: blur(8px);
  border-radius: 5px;
  padding: 2rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  width: 800px;
  min-height: 420px;
  strong {
    font-size: 1.5rem;
  }
  p {
    font-size: 1.25rem;
  }

  form {
    display: flex;
    gap: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: min(176px, 100%);
  align-items: center;

  @media (max-width: 768px) {
    
  width: min(384px, 100%);
  }

  label {
    margin-right: auto;
  }

  select {
    color: #000;
    height: 3rem;
    border-radius: 0.2rem;
    padding: 0.5rem;
    width: 100%;
  }
`;
