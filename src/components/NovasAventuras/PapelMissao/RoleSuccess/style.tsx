import styled from 'styled-components'

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: url('/images/bgEspaco.png');

  div {
    background: #fff;
    border-radius: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    padding: 3rem 1.2rem;

    color: #363f63;

    h2 {
      font-size: 2.5rem;
      max-width: 560px;
      text-align: center;
    }

    p {
      font-size: 1.25rem;
      max-width: 620px;
    }
  }

  span {
    border-radius: 16px;
    border: 5px double transparent;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(140deg, #65bafa, #7a40d3, #65bafa);
    background-origin: border-box;
    background-clip: content-box, border-box;

    width: 70%;
    max-width: 780px;
  }
`
