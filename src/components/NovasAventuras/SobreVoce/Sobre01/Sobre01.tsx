import { useRouter } from 'next/router'
import { useState } from 'react'
import { ForwardArrow } from '../ForwardArrow/ForwardArrow'
import { Container, TextArea } from '../style'

export function Sobre01() {
  const router = useRouter()

  const [principaisExperiencias, setPrincipaisExperiencias] = useState('')
  const [competencias, setCompetencias] = useState('')

  function handleSubmit() {
    const data = { principaisExperiencias, competencias }
    const expLength = principaisExperiencias.length
    const compLength = competencias.length

    if ((expLength && compLength) < 100 || (expLength && compLength) > 300) {
      alert('termine')
    } else {
      console.log(data)
      router.push('/sobrevoce/2')
    }
  }

  return (
    <>
      <Container>
        <div>
          <label htmlFor="experiencias">
            Quais foram as suas principais experiências profissionais até agora?
          </label>
          <TextArea>
            <textarea
              id="experiencias"
              onChange={(e) => setPrincipaisExperiencias(e.target.value)}
            />
            <div>
              <p>{principaisExperiencias.length} caracteres</p>
              <p>mín. 100 máx. 300 caracteres</p>
            </div>
          </TextArea>
        </div>

        <div>
          <label htmlFor="competencias">
            Que competências você considera que são os seus pontos fortes?
          </label>
          <TextArea>
            <textarea
              id="competencias"
              onChange={(e) => setCompetencias(e.target.value)}
            />
            <div>
              <p>{competencias.length} caracteres</p>
              <p>mín. 100 máx. 300 caracteres</p>
            </div>
          </TextArea>
        </div>
      </Container>
      <ForwardArrow
        back="/forminscricao"
        to="/sobrevoce/2"
        page={2}
        isActive={+true}
        onClickForward={handleSubmit}
      />
    </>
  )
}
