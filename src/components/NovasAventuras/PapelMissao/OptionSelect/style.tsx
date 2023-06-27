import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 3rem;

  padding: 0 1rem;

  h2 {
    padding-top: 0.5rem;
    font-size: 1.25rem;
    margin: 0 auto;
    color: #535353;
    font-weight: 400;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;

  button {
    margin: 0 auto;
  }

  a {
    background: #d0d5e5;
    color: #fff;
    padding: 1rem;
    border-radius: 50%;
    transition: 0.2s;
    font-size: 1.25rem;

    top: -45%;
    left: 9%;

    :hover {
      background: ${darken(0.1, '#D0D5E5')};
    }

    @media (max-width: 768px) {
      top: 0%;
      left: 0%;
      margin-right: 1rem;
    }
  }
`

export const CardOp = styled.button`
  width: min(320px, 100%);

  @media (max-width: 768px) {
    width: min(200px, 100%);
  }
`
