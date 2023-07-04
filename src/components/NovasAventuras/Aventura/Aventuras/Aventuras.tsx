import { ArrowLeft, CaretLeft, CaretRight } from 'phosphor-react'
import { useRef } from 'react'
import { ItemPrograma } from '../ItemPrograma/ItemPrograma'
import { BackButton, Container, NavButton, Programas } from './style'

export default function Aventuras() {
  const refProgramas = useRef<HTMLDivElement>(null)

  const Programada = [
    { id: 1, ProgramaNome: 'nome 1', Descricao: 'descricao 1' },
    { id: 2, ProgramaNome: 'nome 2', Descricao: 'descricao 2' },
    { id: 3, ProgramaNome: 'nome 3', Descricao: 'descricao 3' },
    { id: 4, ProgramaNome: 'nome 4', Descricao: 'descricao 4' },
    { id: 5, ProgramaNome: 'nome 5', Descricao: 'descricao 5' },
    { id: 6, ProgramaNome: 'nome 6', Descricao: 'descricao 6' },
    { id: 7, ProgramaNome: 'nome 7', Descricao: 'descricao 7' },
    { id: 8, ProgramaNome: 'nome 8', Descricao: 'descricao 8' },
    { id: 9, ProgramaNome: 'nome 9', Descricao: 'descricao 9' },
  ]

  // function handleRightClick(){
  //   console.log(refProgramas.current.children[0].scrollWidth);
  //   refProgramas.current.scrollLeft += refProgramas.current.children[0].scrollWidth;
  // }

  // function handleLeftClick(){
  //   console.log(refProgramas.current.children[0].scrollWidth);
  //   refProgramas.current.scrollLeft -= refProgramas.current.children[0].scrollWidth;
  // }

  return (
    <Container>
      <BackButton>
        <ArrowLeft weight="bold" />
      </BackButton>
      <header>
        <div>
          <h2>Novas Aventuras</h2>
          <p>Programas de voluntariado em que você pode se inscrever</p>
        </div>
      </header>
      <Programas ref={refProgramas}>
        {Programada.map((item) => (
          <ItemPrograma
            key={item.id}
            Nome={item.ProgramaNome}
            Descricao={item.Descricao}
          />
        ))}
        <NavButton NavSide="right">
          <button>
            <CaretRight />
          </button>
        </NavButton>
        <NavButton NavSide="left">
          <button>
            <CaretLeft />
          </button>
        </NavButton>
      </Programas>
    </Container>
  )
}
