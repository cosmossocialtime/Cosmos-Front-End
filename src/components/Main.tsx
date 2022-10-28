
import Image from "next/image";
import styled from "styled-components";


export default function Main() {

  return (
      <CosmoIMG>
        <img src="/images/logoCosmos.svg" alt="Logo Cosmos"/>
      </CosmoIMG>
  );
}

// STYLED

const Container = styled.main`
  height: 100vh;
  display: flex;
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