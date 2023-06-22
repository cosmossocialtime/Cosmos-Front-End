import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { HeaderMissao } from '../PapelMissao/HeaderMissao'
import { ForwardArrow } from '../SobreVoce/ForwardArrow/ForwardArrow'
import { SelectInput } from './SelectInput/SelectInput'
import { Container, DoubleInput, FormContainer } from './style'

export default function FormInscricao() {
  const router = useRouter()

  const experienciaOptions = [
    { value: 'Menos de 2 anos' },
    { value: 'Entre 2 e 5 anos' },
    { value: 'Entre 5 e 10 anos' },
    { value: 'Mais de 10 anos' },
  ]
  const cargoOptions = [
    { value: 'Analista Júnior' },
    { value: 'Analista Pleno(a)' },
    { value: 'Analista Sênior' },
    { value: 'Aprendiz' },
    { value: 'Assistente' },
    { value: 'Auxiliar' },
    { value: 'Consultor(a)' },
    { value: 'Diretor(a)' },
    { value: 'Especialista' },
    { value: 'Estagiário(a)' },
    { value: 'Gerente / Coordenador(a)' },
    { value: 'Presidente' },
    { value: 'Superintendente / Gerente geral' },
    { value: 'Supervisor' },
    { value: 'Trainee' },
    { value: 'Vendedor(a)' },
    { value: 'Vice-presidente' },
  ]
  const setorOptions = [
    { value: 'Administrativo' },
    { value: 'Comercial' },
    { value: 'Finanças' },
    { value: 'Gestão de pessoas' },
    { value: 'Logística' },
    { value: 'Marketing e comunicação' },
    { value: 'Produção' },
  ]
  const tempoDisponivelOptions = [
    { value: 'Menos de 2 horas por mês' },
    { value: '2 horas por mês' },
    { value: '4 horas por mês' },
    { value: '8 horas por mês' },
    { value: 'Mais de 8 horas por mês' },
  ]

  const [experiencia, setExperiencia] = useState('')
  const [cargo, setCargo] = useState('')
  const [setor, setSetor] = useState('')
  const [tempoDisponivel, setTempoDisponivel] = useState('')
  const [linkedin, setLinkedin] = useState('')

  function submitFormInscricao(e: FormEvent) {
    e.preventDefault()

    // const formData = new FormData(e.target as HTMLFormElement);
    // const data = Object.fromEntries(formData);
    const data = { experiencia, cargo, setor, tempoDisponivel, linkedin }
    console.log(data)

    if ((experiencia && setor && cargo && tempoDisponivel && linkedin) === '') {
      alert('Please enter')
    } else {
      router.push('/sobrevoce/1')
    }
  }

  return (
    <>
      <HeaderMissao />
      <Container>
        <FormContainer>
          <form id="formInscricao" onSubmit={submitFormInscricao}>
            <div>
              <p>Quanto tempo de experiência profissional você possui?</p>
              <SelectInput
                options={experienciaOptions}
                onChangeSelect={(value) => setExperiencia(value)}
              />
            </div>

            <div>
              <p>Em que cargo e em que setor você atua?</p>
              <DoubleInput>
                <SelectInput
                  options={cargoOptions}
                  name="cargo"
                  onChangeSelect={(value) => setCargo(value)}
                />

                <SelectInput
                  options={setorOptions}
                  name="setor"
                  onChangeSelect={(value) => setSetor(value)}
                />
              </DoubleInput>
            </div>

            <div>
              <p>
                Quanto tempo você tem disponível para participar do programa?
              </p>
              <SelectInput
                options={tempoDisponivelOptions}
                name="tempo disponivel"
                onChangeSelect={(value) => setTempoDisponivel(value)}
              />
            </div>

            <div>
              <p>Link para LinkedIn (opcional)</p>
              <input
                name="linkedin"
                placeholder="https://linkedin.com/in/usuario"
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </form>
        </FormContainer>
      </Container>

      <ForwardArrow
        back="/termos"
        to="#"
        page={1}
        isActive={+true}
        onClickForward={submitFormInscricao}
      />
    </>
  )
}
