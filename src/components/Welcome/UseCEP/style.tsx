import styled from "styled-components";


export const Container = styled.div`
  min-height: 100vh;
  background-image: url("/images/bgNave.png");
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  color: #fff;
  padding: 1rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const Content = styled.div`
  background: #00000034;
  backdrop-filter: blur(10px);
  border-radius: 5px;
  padding: 2rem;
  height: 311px;
  width: min(448px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 15%;
  left: 15%;
  gap: 2rem;

  @media (max-width: 768px) {
    position: static;
    
  }

  strong {
    font-size: 24px;
    font-weight: 100;
    max-width: 250px;
    text-align: center;
  }
`;

export const Input = styled.div`
  width: min(384px, 100%);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  input {
    width: 100%;
    height: 3rem;
    border-radius: 0.3rem;
    padding: 0.5rem;
    color: #000;
    font-size: 1rem;
    background: #fff;
  }

  label {
    font-size: 0.95rem;
    font-weight: 100;
  }
`;
