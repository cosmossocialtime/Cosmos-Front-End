import { useState } from 'react'

import { HeaderMissao } from '../HeaderMissao'
import { CardOp, Container, Content, Footer } from './style'

import { Card } from './Card'
import { CaretLeft } from 'phosphor-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Cards = [
  { Name: 'Comandante', img: '/images/papelMissao/cards/comandante.png' },
  { Name: 'Especialista', img: '/images/papelMissao/cards/especialista.png' },
  { Name: 'Piloto', img: '/images/papelMissao/cards/piloto.png' },
]

export function OptionSelect() {
  const router = useRouter()

  const [option, setOption] = useState('')

  const [firstOption, setFirstOption] = useState('')
  const [secondOption, setSecondOption] = useState('')
  const [thirdOption, setThirdOption] = useState('')
  const [third, setThird] = useState(['Comandante', 'Especialista', 'Piloto'])

  function setFirstOp() {
    setFirstOption(option)
    setThird((prev) => prev.filter((op) => op !== option))
    setOption('')
  }

  async function setSecondOp() {
    await setSecondOption(option)
    await setThird((prev) => prev.filter((op) => op !== option))
    await setThirdOption(third[0])
    router.push('/confirm')
  }

  const Options = {
    firstOption,
    secondOption,
    thirdOption,
  }
  return (
    <>
      <HeaderMissao closeVisibility={+true} />
      <Container>
        <h2>
          Agora que você já conheceu todos os papéis, escolha aquele que mais
          gostaria de exercer ao longo da jornada:
        </h2>

        <Content>
          {Cards.map((card) => (
            <CardOp
              disabled={firstOption === card.Name}
              key={card.Name}
              onClick={() => setOption(card.Name)}
            >
              <Card
                firstOption={firstOption}
                Name={card.Name}
                img={card.img}
                cardSelected={option}
              />
            </CardOp>
          ))}
        </Content>

        <Footer>
          <Link href="/cards/piloto">
            <CaretLeft />
          </Link>
          <button
            disabled={option === ''}
            className="cBtn"
            onClick={firstOption === '' ? setFirstOp : setSecondOp}
          >
            {firstOption === '' ? 'Confirmar 1ª opção' : 'Confirmar 2ª opção'}
          </button>
        </Footer>
      </Container>
    </>
  )
}
