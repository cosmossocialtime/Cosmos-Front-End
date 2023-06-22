import { ArrowLeft, Calendar, Clock, X } from 'phosphor-react'
import FormatText from '../../../utils/FormatText'
import Link from 'next/link'

export default function Aventura() {
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
      <header className="relative flex items-center gap-7 px-20 py-7 shadow-lg after:absolute after:left-0 after:bottom-0 after:h-[6px] after:w-full after:bg-gradient-to-l after:from-violet-400 after:to-blue-300">
        <h1 className="text-3xl font-semibold text-gray-600">
          [Nome do programa]
        </h1>
        <div className="flex items-center gap-2">
          <Calendar size={44} weight="thin" />
          <div className="flex flex-col">
            <span>de dd/mm/aaaa</span>
            <span>de dd/mm/aaaa</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Clock size={44} weight="thin" />
          <span className="w-48">X horas de dedicação por semana</span>
        </div>

        <X size={24} className="cursor-pointer" />
      </header>

      <div className="my-16 ml-40 mr-16 flex h-96 flex-col gap-4 overflow-y-auto pr-24 text-justify text-lg text-gray-800">
        <FormatText text={text} />
      </div>

      <div className="relative mb-14 flex justify-center">
        <Link href="/main-painel/painel">
          <ArrowLeft
            size={64}
            className="absolute left-36 cursor-pointer rounded-full bg-gray-400/10 p-4 text-blue-800 transition-colors hover:bg-violet-600 hover:text-white"
          />
        </Link>
        <Link href="/usuario/adventure/application-form">
          <button className="rounded-lg bg-violet-500 px-20 py-4 text-lg font-semibold text-white transition-colors hover:bg-violet-600">
            Embarcar nessa jornada
          </button>
        </Link>
      </div>
    </div>
  )
}
