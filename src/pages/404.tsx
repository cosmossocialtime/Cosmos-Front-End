import Image from 'next/image'
import Logo from '../assets/logotipoCosmos.svg'
import LostAstronalt from '../assets/lost-astronaut.png'
import { Button } from '../components/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Image
        className="absolute left-6 top-6"
        src={Logo}
        alt="Logo cosmos"
        height={24}
        quality={100}
      />
      <span className="text-xl text-gray-500">ERRO 404</span>
      <h1 className="text-[40px] font-semibold leading-[120%] text-violet-800">
        Página não encontrada
      </h1>
      <p className="text-lg text-gray-800 ">
        Desculpe, a página que está procurando não existe ou foi removida.
      </p>

      <Image
        className=""
        src={LostAstronalt}
        alt="Astronalta perdido"
        quality={100}
      />
      <Link href={'/user/painel'}>
        <Button.Primary className="px-6 py-2">
          Voltar ao painel principal
        </Button.Primary>
      </Link>
    </div>
  )
}
