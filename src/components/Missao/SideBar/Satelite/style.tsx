import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    align-items: center;

  background: url("/images/satelites/bgSatelite.png") center / cover no-repeat;
  padding: 1rem 0;
  min-height: 100%;
  color: #fff;

  h3 {
    font-size: 1.25rem;
    font-weight: 400;
    max-width: 590px;
    text-align: center;
  }
`;

export const Content = styled.div`

  display: flex;
  flex-wrap: wrap;
  gap: 0px 14%;
  max-width: 1000px;

  justify-content: center;
  align-items: center;


  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-auto-rows: auto; */
`;
