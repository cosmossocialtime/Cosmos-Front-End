import { Button } from '../../../../../components/Button'
import LogoCosmos from '../../../../../../public/images/logoCosmosBranco.svg'
import Image from 'next/image'

export default function YourRole() {
  return (
    <div className="h-screen w-screen bg-bgAstronautaDeFrente bg-cover bg-center">
      <Image
        className="absolute top-16 left-16"
        alt="Logo Cosmos"
        src={LogoCosmos}
      />

      <div className="absolute left-1/2 bottom-20 -translate-x-1/2 rounded-lg bg-blue-800/10 py-10 px-14 text-center backdrop-blur-lg">
        <p className="text-xl font-semibold text-gray-100">
          Seu papel na equipe será o de Comandante. Nesta função, você será
          responsável por organizar o time, delegando as tarefas a serem
          realizadas.
        </p>

        <Button.Primary className="mt-8 py-3 px-28">
          Aquecer os motores
        </Button.Primary>
      </div>

      <Button.ArrowLeft
        position="center"
        className="bg-blue-800/10 text-white backdrop-blur-lg hover:bg-blue-700"
      />
      <Button.ArrowRight
        position="center"
        className="bg-blue-800/10 text-white backdrop-blur-lg hover:bg-blue-700"
      />
    </div>
  )
}
