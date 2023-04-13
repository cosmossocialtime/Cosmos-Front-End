/* eslint-disable @next/next/no-img-element */
import { Container, Content } from "./style";
import Link from "next/link";

export function Welcome() {
  return (
    <>
      <Container>
        <Content>
          <div>
            <h2>Bem-vindo(a), Cosmonauta!</h2>
            <p>
              Antes de começarmos, precisamos saber um pouco mais sobre você
            </p>
            <Link href={"/usuario/genero"}>
              Começar
            </Link>
          </div>
          <img src="/images/satelite.png" alt="Imagem de um satélite" />
        </Content>
      </Container>
    </>
  );
}
