import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import styled from "styled-components";

const BackButtonContainer = styled.div`
  button {
    position: fixed;
    color: #fff;
    top: 10%;
    left: 5%;
    padding: 0.8rem;
    background: #0000002b;
    backdrop-filter: blur(10px);
    border-radius: 50%;
    font-size: 1.5rem;
    transition: background 0.3s;
    :hover,
    :focus {
      background: var(--purple-500);
    }

    @media (max-width: 768px) {
      top: 5%;
      left: 5%;
    }
  }
`;

interface BackButtonProps {
  link: string;
}

export function BackButton({ link }: BackButtonProps) {
  return (
    <BackButtonContainer>
      <Link href={link}>
        <button>
          <ArrowLeft weight="bold" />
        </button>
      </Link>
    </BackButtonContainer>
  );
}
