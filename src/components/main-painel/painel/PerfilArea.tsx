import Image from 'next/image'
import Link from 'next/link'
import { Camera } from 'phosphor-react'
import bannerPerfilDefault from '../../../assets/default-banner-perfil.png'

type perfilProps = {
  bannerPicture: string | null
  profilePicture: string | null
  name: string
}

export default function PerfilArea({
  bannerPicture,
  profilePicture,
  name,
}: perfilProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden rounded-lg bg-[#1E2543] py-11 pb-7">
      <Image
        className="absolute top-0 h-24 w-full object-cover"
        src={bannerPicture || bannerPerfilDefault}
        alt="background do perfil"
        width={1000}
        height={96}
        // quality={100}
      />

      <div className="z-10 mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-solid border-gray-300 bg-gray-600">
        {profilePicture ? (
          <Image
            src={profilePicture}
            width={128}
            height={128}
            alt="Foto de perfil"
          />
        ) : (
          <Camera size={64} className="text-gray-200" />
        )}
      </div>

      <span className="mb-1 text-xl font-semibold text-gray-200">{name}</span>
      <Link href={'profile'} className="text-sm font-semibold text-blue-300">
        visitar perfil
      </Link>
    </div>
  )
}
