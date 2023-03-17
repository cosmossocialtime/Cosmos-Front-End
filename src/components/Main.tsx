/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";


export default function Main() {

  return (
    <Container>
      <img src="/images/image_aside_login.png" alt="" />
    </Container>
  );
}

// STYLED

const Container = styled.main`
  position: relative;
  width: 50%;
  height: 100%;

  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .logo{
    width: 50px;
    height: 50px;
    background-size: cover;
  }
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const CosmoIMG = styled.div`
  background: url("/images/bgEspaco.png");
  flex: 60%;
  max-width: 790px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  img {
    width: min(448px, 100%);
    background: #00000034;
    padding: 7%;
    border-radius: 20px;
    backdrop-filter: blur(5px);
  }
`;