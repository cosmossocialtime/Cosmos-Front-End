import styled from "styled-components";
import { transparentize } from "polished";
import Link from "next/link";

type SideProps = {
  showside: boolean;
};

export const Container = styled.aside<SideProps>`
  background: #22255d;
  width: ${(props) => (props.showside ? "80px" : "304px")};
  min-height: 100vh;
  /* z-index: 10; */

  transition: 0.2s;
`;

export const Content = styled.div<SideProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88%;
  img {
    margin: ${(props) => (props.showside ? "1.27rem 0" : "1.7rem 0")};
  }
`;

type SideBarItemProps = {
  showside: boolean;
  isselected: string;
  name: string;
};

export const SideBarItem = styled(Link)<SideBarItemProps>`
  background: ${transparentize(0.9, "#A2ABCC")};
  background: ${(props) => props.isselected != props.name && "transparent"};
  width: 95%;
  height: 72px;
  margin: 0 0;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  transition: all 0.2s;

  padding: 0 0.5rem;
  color: #fff;
  strong {
    font-size: .9rem;
    width: ${(props) => (props.showside ? "0px" : "180px")};
    font-weight: 400;
    overflow: hidden;
  }

  span {
    font-size: 1.5rem;
    background: ${transparentize(0.9, "#A2ABCC")};

    background: ${(props) =>
      props.isselected === props.name && "var(--purple-500)"};
    padding: 1rem;
    border-radius: 50%;
    display: flex;
  }
`;

export const BackButton = styled.div<SideProps>`
  margin: auto 0;
  z-index: 0;

  button {
    padding: 1rem 0rem;
    border-radius: 0 5px 5px 0;
    background: #22255d;
    svg {
      transform: rotate(${(props) => (props.showside ? "180" : "0")}deg);
      transition: 0.2s;

      font-size: 1.4rem;
      color: #fff;
      margin-right: 0.1rem;
    }
  }
`;

export const HelpSection = styled.div`
  background: #0e1040;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: 12%;
  font-size: 0.85rem;
  color: #fff;
  a {
    width: fit-content;

    :last-child {
      font-size: 1rem;
      font-weight: bold;
      color: #0890f7;
    }
  }
`;
