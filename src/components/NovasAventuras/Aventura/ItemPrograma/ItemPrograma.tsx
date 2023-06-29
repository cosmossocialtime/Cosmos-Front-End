import Link from 'next/link'
import { Calendar, Clock } from 'phosphor-react'

import { Container, Content, Footer, Header, Main } from './style'

interface ItemProgramaProps {
  Nome: string
  Descricao: string
}

export function ItemPrograma({ Nome, Descricao }: ItemProgramaProps) {
  return (
    <Container>
      <Content>
        <Header>
          <h2>{Nome}</h2>
        </Header>
        <Main>
          <p>{Descricao}</p>
          <Link href="/novasaventuras">...Saiba Mais</Link>
        </Main>
        <Footer>
          <div>
            <Calendar />
            <p>
              De dd/mm/aaaa
              <br />
              Até dd/mm/aaaa
            </p>
          </div>
          <div>
            <Clock />
            <p>
              X horas de dedicação
              <br />
              por semana
            </p>
          </div>
        </Footer>
      </Content>
    </Container>
  )
}
