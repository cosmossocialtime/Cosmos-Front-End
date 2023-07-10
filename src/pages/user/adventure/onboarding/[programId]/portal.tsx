import { Button } from '../../../../../components/Button'

export default function Portal() {
  return (
    <div className="h-screen w-screen bg-bgPortal bg-cover bg-center">
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-blue-800/10 py-10 px-14 text-center backdrop-blur-lg">
        <p className="text-xl font-semibold text-gray-100">
          O painel com as etapas da missão já está <br /> disponível para você
          começar, vamos lá?
        </p>

        <Button.Primary className="mt-8 py-3 px-28">
          Dar a partida!
        </Button.Primary>
      </div>

      <Button.ArrowLeft
        position="center"
        className="bg-blue-800/10 text-white backdrop-blur-lg hover:bg-blue-700"
      />
    </div>
  )
}
