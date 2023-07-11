import { Button } from '../../../../../components/Button'
import { Header } from '../../../../../components/adventure/Header'
import AstronautCommander from '../../../../../../../public/images/mission-role/commander.png'
import Image from 'next/image'

export default function Commander() {
  return (
    <div className="flex h-screen flex-col">
      <Header title="Seu papel na missão" subtitle="Formulário de Inscrição">
        <span className="mr-24 flex-1 text-end font-semibold text-violet-600">
          Introdução para quarta etapa
        </span>
      </Header>
      <div className="mt-28 flex flex-col items-center justify-center">
        <div className="relative w-[660px] rounded-[36px] bg-[#FFD743] py-10 pr-9 pl-28">
          <div className="absolute -top-24 -left-44 h-64 w-64 rounded-full bg-white" />
          <Image
            className="absolute -top-20 -left-44"
            alt="comandante"
            src={AstronautCommander}
          />
          <h2 className="mb-3 text-4xl font-black text-gray-100">Comandante</h2>
          <p className="mb-7 text-xl text-gray-800">
            Lidera a tripulação. Seu papel consiste em engajar, organizar e
            desenvolver o time, de forma que todos deem o seu melhor para
            concluir a missão.
          </p>
          <p className="text-xl text-gray-800">
            Ao vestir a camisa de Comandante, você irá aprimorar habilidades de
            liderança, tais como: união da equipe, delegação de tarefas e tomada
            de decisões.
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <div className="h-3 w-3 rounded-full bg-[#FFD743]"></div>
          <div className="h-3 w-3 rounded-full bg-[#AEDF55]"></div>
          <div className="h-3 w-3 rounded-full bg-[#FD6062]"></div>
        </div>
      </div>

      <Button.ArrowLeft position="center" />
      <Button.ArrowRight position="center" />
    </div>
  )
}
