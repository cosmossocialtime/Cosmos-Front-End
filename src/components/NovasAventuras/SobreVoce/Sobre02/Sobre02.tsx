import { useRouter } from 'next/router'
import { useState } from 'react'
import { ForwardArrow } from '../ForwardArrow/ForwardArrow'
import { Container, TextArea } from '../style'

export function Sobre02() {
  const router = useRouter()

  const [motivacao, setMotivacao] = useState('')
  const [jaMentorou, setJaMentorou] = useState('')

  function handleSubmit() {
    const data = { motivacao, jaMentorou }
    const expLength = motivacao.length
    const compLength = jaMentorou.length

    if ((expLength && compLength) < 100 || (expLength && compLength) > 300) {
      alert('termine2')
    } else {
      console.log(data)
      router.push('/missao')
    }
  }

  return (
    <>
      <Container>
        <div>
          <label htmlFor="experiencias">
            O que motiva você a querer participar do programa?
          </label>
          <TextArea>
            <textarea
              id="experiencias"
              onChange={(e) => setMotivacao(e.target.value)}
            />
            <div>
              <p>{motivacao.length} caracteres</p>
              <p>mín. 100 máx. 300 caracteres</p>
            </div>
          </TextArea>
        </div>

        <div>
          <label htmlFor="jaMentorou">
            Você já mentorou alguma pessoa ou organização antes? Se sim, como
            foi esta experiência? Se não, deixe em branco.
          </label>
          <TextArea>
            <textarea
              id="jaMentorou"
              onChange={(e) => setJaMentorou(e.target.value)}
            />
            <div>
              <p>{jaMentorou.length} caracteres</p>
              <p>mín. 100 máx. 300 caracteres</p>
            </div>
          </TextArea>
        </div>
      </Container>
      <ForwardArrow
        back="/sobrevoce/1"
        to="/missao"
        page={3}
        isActive={+true}
        onClickForward={handleSubmit}
      />
    </>
  )
}
