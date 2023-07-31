import { useEffect, useState } from 'react'
import { Header } from '../../../../../components/adventure/Header'
import { Input } from '../../../../../components/Input'
import Link from 'next/link'
import { Button } from '../../../../../components/Button'
import Router from 'next/router'
import { api } from '../../../../../services/api'
import { Loading } from '../../../../../components/Loading'
import { toast } from 'react-toastify'
import { useSubscribe } from '../../../../../hooks/useSubscribe'

export default function TermsOfUse() {
  const { program, programId } = useSubscribe()
  const [isAcceptTerms, setIsAcceptTerms] = useState(false)

  useEffect(() => {
    setIsAcceptTerms(Boolean(program?.volunteerApplicationId))
  }, [program])

  if (!program) {
    return <Loading />
  }

  function appliedProgram() {
    if (!isAcceptTerms) {
      toast.error('Aceite os termos de uso antes de continuar!')
      return
    }
    if (program?.volunteerApplicationId) {
      Router.push(`/user/adventure/${programId}/subscribe/application-form`)
      return
    }

    api
      .post('/volunteer/apply', {
        agreed: isAcceptTerms,
        agreedAt: new Date(),
        programId: Number(programId),
      })
      .then((response) => {
        if (response.status === 201) {
          Router.push(`/user/adventure/${programId}/subscribe/application-form`)
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível enviar os dados. Tente novamente mais tarde!',
        )
      })
  }

  return (
    <div>
      <Header title={program.name} subtitle="Formulário de Inscrição" />
      <div className="px-44 py-16">
        <h2 className="mb-14 text-center text-2xl font-semibold text-gray-800">
          Coloque seu capacete, ajuste seu traje e se prepare para uma aventura!
        </h2>

        <div className="mb-14 flex flex-col gap-4 text-gray-800">
          <p>
            Antes de iniciar nossa missão, precisamos de mais algumas
            informações para conseguir compor a tripulação e ajustar as
            funçõesde cada pessoa voluntária.
          </p>
          <p>
            É importante que você esteja ciente de que suas respostas poderão
            ser compartilhadas com: a organização do programa, profissionais da
            instituição mentorada e colegas de equipe.
          </p>
          <p>
            Para mais informações sobre como as suas informações serão tratadas,
            acesse o{' '}
            <a href="" className="font-semibold text-blue-400 hover:underline">
              Termo de Consentimento ao Tratamento de Dados.
            </a>
          </p>
        </div>
        <Input.CheckBox
          className="mt-11"
          content="Aceito que minhas respostas sejam compartilhadas"
          checked={isAcceptTerms}
          onChangeChecked={setIsAcceptTerms}
        />
      </div>
      <Link href={`/user/adventure/${programId}/subscribe`}>
        <Button.ArrowLeft />
      </Link>

      <Button.ArrowRight onClick={appliedProgram} />
    </div>
  )
}
