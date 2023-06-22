import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.section`
  color: var(--gray-600);
  height: 84vh;
  width: 95%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 50%;
  h2 {
    font-size: 3rem;
    font-weight: 800;
    align-self: start;
  }
  p {
    font-size: 1.25rem;
    max-width: 540px;
    line-height: 1.7rem;
  }

  a {
    align-self: center;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Header = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  img {
    max-width: 100%;
    height: fit-content;
    margin-top: -10%;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    img {
      margin-top: 0;
      max-width: 300px;
      order: 2;
    }
  }
`

export const BackButton = styled.button`
  font-size: 1.5rem;
  color: #fff;
  padding: 1rem;
  background: var(--gray-400);
  border-radius: 50%;
  transition: 0.2s;
  margin-left: 8%;

  :hover {
    background: ${darken(0.1, '#D0D5E5')};
  }

  @media (max-width: 768px) {
    order: 1;
    align-self: start;
    margin-left: 0;
  }
`
