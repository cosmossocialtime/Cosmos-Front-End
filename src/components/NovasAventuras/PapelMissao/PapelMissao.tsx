import { ArrowLeft } from "phosphor-react";
import { BackButton, Container, Header, Main } from "./style";
import { HeaderMissao } from "./HeaderMissao";
import Link from "next/link";

export function PapelMissao() {
  return (
    <>
      <HeaderMissao />
      <Container>
        <Header>
          <img src="/images/tripulantes.png" alt="Tripulantes" />

          <Link href="/sobrevoce/2">
            <BackButton>
              <ArrowLeft />
            </BackButton>
          </Link>
        </Header>
        <Main>
          <h2>Olá Tripulante!</h2>
          <p>
            Ao longo do programa de mentoria, cada pessoa da equipe de
            voluntariado exercerá um papel similar àqueles que existem em
            missões espaciais de verdade! <br /> <br />A seguir você terá uma
            introdução sobre cada um deles. Leia com atenção e, ao final,
            escolha por ordem de prioridade qual papel você mais gostaria de
            exercer.
          </p>
          <Link href="/cards/comandante">
            <button className="cBtn">Vamos lá!</button>
          </Link>
        </Main>
      </Container>
    </>
  );
}
