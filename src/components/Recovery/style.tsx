import styled from "styled-components";

export const RecoveryContainer = styled.div`
  flex: 40%;
  background: var(--gray-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  gap: 2em;

  a:nth-child(3) {
    margin: 2rem 0 1rem 0;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--purple-400);
    text-align: center;
  }

  h3 {
    color: var(--purple-400);
    font-size: 1rem;
    font-weight: 400;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const EditPasswordContainer = styled.div`
  flex: 40%;
  background: var(--gray-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  gap: 2em;

  a:nth-child(3) {
    margin: 2rem 0 1rem 0;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--purple-400);
    text-align: center;
  }

  h3 {
    color: var(--purple-400);
    font-size: 1rem;
    font-weight: 400;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;
export const Input = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(384px, 100%);
  position: relative;

  label {
    margin-right: auto;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
  button {
    font-size: 1.5rem;
    color: var(--gray-500); 
  }

  div:nth-child(2) {
    width: min(384px, 100%);
    display: flex;
    border-radius: 0.2rem;
    border: 1px solid var(--gray-500);
    height: 3rem;
    padding: 0.5rem;
    input {
      width: 100%;
      outline: none;
    }
  }
`;

