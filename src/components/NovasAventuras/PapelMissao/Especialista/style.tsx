import styled from 'styled-components'

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
    background: var(--green-500);
    border-radius: 35px;
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
      color: #535353;
    }
  }
`
