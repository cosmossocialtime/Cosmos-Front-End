import styled from 'styled-components'

export const Container = styled.section`
  height: 60vh;
  display: flex;
  flex-direction: column;
  padding: 0 10%;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  label {
    font-size: 0.85rem;
  }
`

export const TextArea = styled.div`
  overflow: hidden;
  margin-top: 0.5rem;
  border: 1px solid var(--gray-500);
  height: 120px;
  border-radius: 4px;

  textarea {
    width: 100%;
    height: 70%;
    resize: none;
    padding: 0.5rem;
    color: #000;
    font-size: 1rem;
    font-family: 'inter', 'Helvetica Neue';
    :focus {
      outline: none;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    margin-bottom: auto;
    color: var(--gray-500);
    font-size: 0.9rem;
  }
`
