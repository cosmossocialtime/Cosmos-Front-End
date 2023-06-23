import { CardContent, Container, MobileLink, OpCard } from "./style";
import { CaretLeft, CaretRight } from "phosphor-react";
import { Dots } from "../Cards/Dots";
import Link from "next/link";
import Image from "next/image";

export default function Piloto() {
  const Popup =
    "O Mapa da Navegação é o plano de objetivos e atividades que serão desenvolvidos ao longo do projeto. Ele será criado em conjunto com a equipe da instituição mentorada";

  return (
    <>
      <Container>
        <Link href="/cards/especialista">
          <CaretLeft />
        </Link>
        <OpCard>
          <Image src="/images/papelMissao/piloto.png" alt="" width={200} height={200}/>

          <CardContent>
            <div>
              <h3>Piloto(a)</h3>
              <p>
                é a pessoa que irá garantir que as etapas do projeto e o{" "}
                <b>
                  Mapa da Navegação
                  <span>{Popup}</span>
                </b>{" "}
                serão seguidos. Seu papel é guiar a equipe ao longo da missão.
                <br />
                <br />
                Vestindo a camisa de Piloto(a), você desenvolverá habilidades
                como organização, foco e adaptação a mudanças.
              </p>
            </div>{" "}
            <Dots />
          </CardContent>
        </OpCard>

        <Link href="/usuario/aventuras/especialista">
          <CaretRight />
        </Link>

        <MobileLink>
          <Link href="/usuario/aventuras/especialista">
            <CaretLeft />
          </Link>

          <Link href="/usuario/aventuras/comandante">
            <CaretRight />
          </Link>
        </MobileLink>
      </Container>
    </>
  );
}
