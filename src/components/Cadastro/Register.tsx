import { Outlet } from "react-router-dom";
import styled from "styled-components";
import bgEspaco from "../../../assets/bgEspaco.png";

import CosmosLogo from "../../../assets/logoCosmos.svg";

export function Main() {


  return (
    <Container>
      <CosmoIMG>
        <img src={CosmosLogo} alt="Logo Cosmos" />
      </CosmoIMG>
      <Outlet/>

    </Container>
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
  background: url(${bgEspaco});
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