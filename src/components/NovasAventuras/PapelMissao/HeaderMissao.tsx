import Link from "next/link";
import { X } from "phosphor-react";
import styled from "styled-components";

interface HeaderMissaoProps {
  closeVisibility?: number;
  title?: string;
}

export function HeaderMissao({ closeVisibility, title }: HeaderMissaoProps) {
  return (
    <Header>
      <div>
        <p>Formulário de Inscrição</p>
        <h2>{title || "Seu papel na missão"}</h2>
      </div>
      <Link href="/aventuras">
        <CloseButton visibility={closeVisibility || +true}>
          <X weight="bold" />
        </CloseButton>
      </Link>

      <Separador />
    </Header>
  );
}

const Header = styled.div`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5em;
  flex-wrap: wrap;

  div {
    padding-left: 5%;
  }
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

const CloseButton = styled.button<CloseButtonProps>`
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
