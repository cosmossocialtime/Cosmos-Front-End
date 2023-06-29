import styled from 'styled-components'

export const Container = styled.section`
  color: var(--gray-600);
  padding: 0 1rem;
  height: 60vh;
`

export const FormContainer = styled.div`
  margin: 0 auto;
  font-family: 'inter';
  max-width: 450px;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    div {
      p {
        margin-bottom: 0.3rem;
        white-space: nowrap;

        @media (max-width: 640px) {
          white-space: normal;
        }
      }
    }
  }

  input {
    border: 1px solid var(--gray-500);
    border-radius: 4px;
    width: 100%;
    padding: 0.75rem;
  }
`

export const DoubleInput = styled.div`
  display: flex;
  gap: 0.75rem;
`
