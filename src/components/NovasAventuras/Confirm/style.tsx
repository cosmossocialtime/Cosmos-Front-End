import styled from "styled-components";

export const Container = styled.section`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 9rem);
  justify-content: space-between;

  h2 {
    font-size: 1.25rem;
    font-weight: 400;
    max-width: 970px;
    text-align: center;
  }

  footer {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
    }
  }


`;

export const Form = styled.form`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;

  div {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0;
    align-items: center;
    gap: 2.5rem;

    div {
      width: 170px;
    }
  }
`;
