import styled from "styled-components";

export const Container = styled.section`
  background: #fdfdff;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  header {
    position: relative;
    height: 25vh;
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: end;
    justify-content: center;

    div {
      text-align: center;
      h2 {
        font-weight: bolder;
        font-size: 2.5rem;
        color: var(--gray-600);
        font-weight: 600;
        margin-bottom: .3rem;
      }
      p {
        font-size: 1.25rem;
        color: var(--gray-500);
      }
    }

    @media (max-width: 640px) {
      width: 100%;
      flex-wrap: wrap;
      padding: 0 1rem;
    }
  }
`;

export const BackButton = styled.button`
  color: var(--blue-500);
  height: fit-content;
  border-radius: 50%;
  padding: 0.75rem;
  font-size: 1.5rem;
  background-color: var(--gray-200);
  position: absolute;
  z-index: 1000;
  top: 15%;
  left: 5%;
  transition: background 0.3s;

  :hover {
    background-color: var(--gray-300);
  }
  :focus {
    background-color: var(--gray-300);
  }

  @media (max-width: 640px) {
    top: 3%;
    font-size: 1rem;
    padding: 0.5rem;
  }
`;
export const Programas = styled.section`
  position: relative;
  height: 75vh;
  display: flex;
  align-items: center;
  padding-left: 4rem;
  overflow-x: auto;
`;


type NavButtonProps = {
    NavSide: "left" | "right";
}
  
export const NavButton = styled.div<NavButtonProps>`

  position: fixed;
  background: linear-gradient(
    ${props => props.NavSide === "right" ? "90" : "270"}deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255) 100%
  );
  display: flex;
  justify-content: center;
  height: 70%;
  width: 10rem;
  right: ${props => props.NavSide === "right" ? "0" : ""};
  left: ${props => props.NavSide === "left" ? "0" : ""};
  bottom: 0;
`;
