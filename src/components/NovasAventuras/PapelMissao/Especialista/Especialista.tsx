import { CardContent, OpCard } from './style'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Dots } from '../Cards/Dots'
import { Container, MobileLink } from '../Piloto/style'
import Link from 'next/link'
import Image from 'next/image'

export default function Especialista() {
  return (
    <>
      <Container>
        <Link href="/cards/comandante">
          <CaretLeft />
        </Link>

        <OpCard>
          <Image
            src="/images/papelMissao/especialista.png"
            alt=""
            width={200}
            height={200}
          />

          <CardContent>
            <div>
              <h3>Especialista </h3>
              <p>
                tem conhecimento sobre alguma área que será importante ao longo
                da jornada.
                <br />
                <br />
                Ao vestir a camisa de Especialista, você terá a oportunidade de
                compartilhar os seus conhecimentos e de vê-los sendo aplicados
                de forma integrada para solucionar problemas complexos.
              </p>
            </div>
            <Dots />
          </CardContent>
        </OpCard>

        <Link href="/usuario/aventuras/piloto">
          <CaretRight />
        </Link>

        <MobileLink>
          <Link href="/usuario/aventuras/comandante">
            <CaretLeft />
          </Link>

          <Link href="/usuario/aventuras/piloto">
            <CaretRight />
          </Link>
        </MobileLink>
      </Container>
    </>
  )
}
