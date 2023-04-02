import styled from "styled-components";

export const RegisterContainer = styled.div`
  flex: 40%;
  background: var(--gray-50);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  gap: 2em;
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--purple-400);
    text-align: center;
  }

  h3{
    font-size: 1rem;
    color: var(--purple-400);
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
  gap: 4px;
  align-items: flex-start;
  width: min(384px, 100%);
  position: relative;

  label {
    margin-right: auto;
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  .button-show-password {
    font-size: 1.2rem;
    color: var(--gray-500);
  }
  div{
    display: flex;
    gap: 4px; 
    align-items: center;
    justify-content: center;

  }

`;

export const InputContent = styled.div`
    border: 1px solid #a2abcc;
    width: min(384px, 100%);
    display: flex;
    border-radius: 0.2rem;
    padding: 0.5rem;

    
  input{
        width: 100%;
        :focus{
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        :invalid{
            border: 1px solid red
        }
    }
`
