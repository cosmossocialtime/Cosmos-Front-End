import { useState } from 'react'
import { Header } from '../../../../../components/adventure/Header'
import { BackButton } from '../../../../../components/adventure/BackButton'
import { NextButton } from '../../../../../components/adventure/NextButton'
import { Input } from '../../../../../components/Input'

export default function TermsOfUse() {
  const [isAcceptTerms, setIsAcceptTerms] = useState(false)

  return (
    <div>
      <Header title="Vo colocar dps" />
      <div className="py-16 px-44">
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
            <a href="" className="font-semibold text-blue-400">
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
      <BackButton href="./" />
      <NextButton href="application-form" disabled={!isAcceptTerms} />
    </div>
  )
}
