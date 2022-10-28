import styled from "styled-components";

export const Container = styled.div`
  color: var(--gray-600);
  height: 75vh;
  font-size: 1rem;
  padding: 1rem;

  h2 {
    font-size: 2.5rem;
      font-weight: bold;
  }


`;


export const DisplayText = styled.div`
  margin: 0rem auto 2rem auto;
  width: 80%;
  padding: 1rem;
  height: 80%;
  overflow: auto;
  position: relative;
  @media (max-width: 640px) {
    width: 100%;
    height: 45%;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: #ececec;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #65bafa;
    border-radius: 20px;
  }

`;

export const InscricaoBtn = styled.div`
    display: flex;
    justify-content: center;
`;

export const Data = styled.div`
  display: flex;
  flex-wrap: wrap;
`
