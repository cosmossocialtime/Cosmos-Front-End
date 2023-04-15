/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";

export default function Main() {

  return (
    <div className="h-screen relative">
      <img className="bg-cover bg-no-repeat relative h-full" src="/images/background-login.png" alt="" />
      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-14 bg-black/20 rounded-2xl backdrop-blur-md"
        src="/images/logo.png"
        alt="Logo" />
    </div>
  );
}

// STYLED

const Container = styled.main`
  height: 100vh;

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