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
              No Cosmos, pessoas e organizações se unem para aprender e fazer o
              bem, por meio de programas de voluntariado
            </p>

            <p>
              Antes de começarmos, precisamos saber um pouco mais sobre você
            </p>

            <Link href={"/usuario/genero"}>
              <button className="cBtn">Começar</button>
            </Link>
          </div>
          <img src="/images/satelite.png" alt="Imagem de um satélite" />
        </Content>
      </Container>
    </>
  );
}
