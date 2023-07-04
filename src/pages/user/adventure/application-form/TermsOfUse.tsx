import { useState } from 'react'
import { CheckInput } from '../../../../components/CheckInput'

export default function TermsOfUse() {
  const [onCheck, setOnCheck] = useState(false)

  return (
    <div className="py-16 px-44">
      <h2 className="mb-14 text-center text-2xl font-semibold text-gray-800">
        Coloque seu capacete, ajuste seu traje e se prepare para uma aventura!
      </h2>

      <div className="mb-14 text-gray-800">
        <p className="mb-4">
          Antes de iniciar nossa missão, precisamos de mais algumas informações
          para conseguir compor a tripulação e ajustar as funçõesde cada pessoa
          voluntária.
        </p>
        <p>
          É importante que você esteja ciente de que suas respostas poderão ser
          compartilhadas com: a organização do programa, profissionais da
          instituição mentorada e colegas de equipe.
        </p>
      </div>

      <p>
        Para mais informações sobre como as suas informações serão tratadas,
        acesse o<a href="">Termo de Consentimento ao Tratamento de Dados.</a>
      </p>
      <CheckInput
        className="mt-11"
        content="Aceito que minhas respostas sejam compartilhadas"
        onChangeChecked={setOnCheck}
        checked={onCheck}
      />
    </div>
  )
}
