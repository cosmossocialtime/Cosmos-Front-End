import { CardContent, OpCard } from "./style";
import { CaretLeft, CaretRight } from "phosphor-react";
import { Dots } from "../Cards/Dots";
import { Container, MobileLink } from "../Piloto/style";
import Link from "next/link";
import Image from "next/image";

export default function Comandante() {
  return (
    <>
      <Container>
        <Link href="/missao">
          <CaretLeft />
        </Link>

        <OpCard>
          <Image src="/images/papelMissao/comandante.png" alt="" />
          <CardContent>
            <div>
              <h3>Comandante</h3>
              <p>
                é a pessoa que irá liderar a Tripulação. Seu papel é engajar e
                desenvolver o time, buscando com que todos deem o seu melhor
                para concluir a missão.
                <br />
                <br />
                Ao vestir a camisa de Comandante, você irá desenvolver
                habilidades de liderança, como: união da equipe, delegação de
                tarefas, e tomada de decisões.
              </p>
            </div>
            <Dots />
          </CardContent>
        </OpCard>

        <Link href="/cards/especialista">
          <CaretRight />
        </Link>

        <MobileLink>
          <Link href="/missao">
            <CaretLeft />
          </Link>

          <Link href="/cards/especialista">
            <CaretRight />
          </Link>
        </MobileLink>
      </Container>
    </>
  );
}
