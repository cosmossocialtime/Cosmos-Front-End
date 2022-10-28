import Link from "next/link";
import { Calendar, Clock, X } from "phosphor-react";
import styled from "styled-components";

interface HeaderAventuraProps {
  closeVisibility?: number;
  title?: string;
}

export function HeaderAventura({
  closeVisibility,
  title,
}: HeaderAventuraProps) {
  return (
    <>
      <Header>
        <div>
          <h2>[Nome do Programa]</h2>
        </div>
        <Datas>
          <Calendar weight="light" />
          <div>
            <p>De dd/mm/aaaa</p>
            <p>Até dd/mm/aaaa</p>
          </div>
        </Datas>
        <Datas>
          <Clock weight="light" />
          <div>
            <p>X horas de dedicação por semana</p>
          </div>
        </Datas>
        <CloseButton href="/aventuras" visibility={closeVisibility || +true}>
          <X weight="bold" />
        </CloseButton>
      </Header>
      <Separador />
    </>
  );
}

const Header = styled.div`
  padding: 2rem 0 0 5%;
  margin: 0 0 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7em;
  flex-wrap: wrap;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #363f63;
  }
  p {
    color: var(--gray-500);
  }
`;

interface CloseButtonProps {
  visibility: number;
}

const CloseButton = styled(Link)<CloseButtonProps>`
  display: ${(props) => (props.visibility ? "block" : "none")};
  margin-right: 5%;
  margin-left: auto;
  font-size: 1.2rem;
  color: #363f63;
`;

const Separador = styled.div`
  background: linear-gradient(
    90deg,
    rgba(101, 186, 250, 1) 0%,
    rgba(157, 55, 242, 1) 100%
  );
  height: 0.4rem;
  width: 100%;
`;

const Datas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  p {
    max-width: 170px;
    font-size: .9rem;

  }

  svg {
    display: flex;
    width: 2.5rem;
    height: fit-content;
  }
`;
