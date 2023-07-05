import { ArrowLeft, Check } from 'phosphor-react'
import FormatText from '../../../utils/FormatText'
import Link from 'next/link'
import { useState } from 'react'
import { Header } from '../../../components/adventure/Header'

export default function Adventure() {
  const [isRegistered, setIsRegistered] = useState(false)
  const text = `No Programa Mentoria 1, você atuará como mentor(a) voluntário(a) de uma organização social que atua na causa da educação ou da saúde.
  Você trabalhará em equipe com outros voluntários da Empresa X para apoiar o desenvolvimento da instituição e contribuir para aumentar o seu impacto social.
  Serão realizados encontros semanais de mentoria, em que a equipe de mentores aconselhará os líderes da organização mentorada em temas relacionados à gestão, como finanças, marketing, recursos humanos, estratégia, entre outros.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus ornare dignissim. Mauris et consectetur nibh. Sed nec sem ante. Phasellus faucibus scelerisque eleifend. Pellentesque sapien sem, elementum et blandit id, aliquet id ex. Para se inscrever, clique no botão a seguir.
  No Programa Mentoria 1, você atuará como mentor(a) voluntário(a) de uma organização social que atua na causa da educação ou da saúde.
  Você trabalhará em equipe com outros voluntários da Empresa X para apoiar o desenvolvimento da instituição e contribuir para aumentar o seu impacto social.
  Serão realizados encontros semanais de mentoria, em que a equipe de mentores aconselhará os líderes da organização mentorada em temas relacionados à gestão, como finanças, marketing, recursos humanos, estratégia, entre outros.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus ornare dignissim. Mauris et consectetur nibh. Sed nec sem ante. Phasellus faucibus scelerisque eleifend. Pellentesque sapien sem, elementum et blandit id, aliquet id ex. Para se inscrever, clique no botão a seguir.
  `

  return (
    <div>
      <Header />

      <div className="my-16 ml-40 mr-16 flex h-[17rem] flex-col gap-4 overflow-y-auto pr-24 text-justify text-lg text-gray-800">
        <FormatText text={text} />
      </div>

      <div className="relative mb-14 flex justify-center">
        <Link href="/main-painel/painel">
          <ArrowLeft
            size={64}
            className="absolute left-36 cursor-pointer rounded-full bg-gray-400/10 p-4 text-blue-800 transition-colors hover:bg-violet-600 hover:text-white"
          />
        </Link>

        {isRegistered ? (
          <div className="flex items-center gap-4 rounded border border-solid border-gray-300 p-4">
            <Check
              size={56}
              className="rounded-full bg-green-300 p-4 text-gray-100"
            />
            <div>
              <strong className="mb-2 font-semibold text-gray-600">
                Você ja se inscreve nesta aventura!
              </strong>
              <p className="text-gray-500">
                O processo de seleção será feito pela empresa [Nome da Empresa].
                <br /> O resultado será divulgado por e-mail até o dia dd/mm/aa.
              </p>
            </div>
          </div>
        ) : (
          <Link href="adventure/TermsOfUse">
            <button className="rounded-lg bg-violet-500 px-20 py-4 text-lg font-semibold text-white transition-colors hover:bg-violet-600">
              Embarcar nessa jornada
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
