import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  gap: 5%;
  margin-top: 3rem;

  a {
    background: var(--gray-200);
    color: var(--blue-900);
    padding: 1rem;
    border-radius: 50%;
    transition: 0.2s;
    font-size: 1.25rem;

    :hover {
      background: ${darken(0.1, '#f4f4f4')};
    }

    @media (max-width: 480px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

export const OpCard = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 234px;
    height: fit-content;
    margin-right: -4.8rem;
    margin-top: -3rem;
    z-index: 2;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    img {
      margin: 0 0 -2rem 2rem;
    }

    div {
      padding: 1rem;
    }
  }
`

export const CardContent = styled.div`
  div:first-child {
    background: var(--red-500);
    border-radius: 35px;
    width: 100%;
    max-width: 41rem;
    min-height: 23rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 5rem;

    h3 {
      font-size: 2rem;
      font-weight: 900;
      color: #fff;
      margin: 1rem 0;
      margin-left: 1rem;
    }

    p {
      font-size: 1.25rem;
      max-width: 480px;
      margin: 0 auto;
      color: #353434;

      b {
        color: #141e59;
        position: relative;
        span {
          display: none;
          opacity: 0;
          background: #bd5252;
          border-radius: 5px;

          width: 15rem;

          font-size: 0.9rem;
          padding: 0.5rem;
          color: #ececec;
          position: absolute;
          bottom: 1.5rem;
          right: 0;

          transition: 0.2s;
        }

        :hover {
          span {
            display: block;
            opacity: 1;
          }
        }
      }
    }
  }
`

export const MobileLink = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  a {
    display: block;
  }

  @media (min-width: 480px) {
    display: none;
  }
`
