import Link from "next/link";
import styled from "styled-components";





export const Container = styled.div`
  /* margin-top: auto; */
  display: grid;
  place-items: center;
  /* margin-bottom: 2rem; */


  div {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--purple-500);
    font-weight: bolder;
  }
`;

interface LinkButtonForwardsProps {
  disable?: number;
}

export const LinkButtonForwards = styled(Link)<LinkButtonForwardsProps>`
  cursor: ${(props) => !props.disable && "not-allowed"};
  display: flex;
  background: ${(props) =>
    !props.disable ? "var(--gray-400)" : "var(--purple-500)"};

  padding: 1rem;
  border-radius: 100%;
  transition: background 0.2s;
  :hover {
    background: ${(props) => (props.disable ? "#642bbb" : "var(--gray-400)")};
  }

  svg {
    font-size: 1.5rem;
    font-weight: bolder;
    color: #fff;
  }
`;

export const LinkButtonBackward = styled(LinkButtonForwards)`
  cursor: pointer;
  background: var(--gray-400);
  :hover {
    background: var(--gray-500);
  }
`;
