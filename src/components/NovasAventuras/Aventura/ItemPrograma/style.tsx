import styled from "styled-components";

export const Container = styled.div`
  
  min-width: 32rem;
`;

export const Content = styled.div`
  width: 30rem;
  height: 21rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  flex: none;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
`

export const Header = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--purple-500);
  }
`;

export const Main = styled.div`

  position: relative;
  p {
    color: var(--gray-500);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  a{
    color: var(--blue-300);
    position: absolute;
    bottom: 0;
    right: 0;
    background: #fff;
  }
`;

export const Footer = styled.div`
  display: flex;
  gap: 1.5rem;
  div {
    color: var(--gray-600);
    display: flex;
    gap: 0.5rem;
    img {
      width: 2rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;
