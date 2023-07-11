import { Button } from '../../../../../components/Button'

export default function takeOff() {
  return (
    <div className="h-screen w-screen bg-bgAstronaltaDeLado bg-cover bg-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-blue-800/10 px-12 py-16 text-center text-xl font-semibold text-gray-100 backdrop-blur-lg">
        <p>
          A partir de agora, sua equipe irá viajar rumo a uma estrela distante
          chamada [Nome da Instituição].
        </p>
        <p className="mt-6">
          O objetivo de vocês é unir forças com os líderes da Estrela para
          fazê-la brilhar ainda mais!
        </p>

        <Button.Primary className="mt-12 py-3 px-20">
          Preparar para a decolagem
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
