import Image from "next/image"
import Link from "next/link"
import { Camera } from "phosphor-react"
import bannerPerfilDefault from '../../../assets/bg-perfil.png'

type perfilProps = {
  bannerPicture: string | null | undefined,
  profilePicture: string | null | undefined,
  name: string,
}

export default function PerfilArea({ bannerPicture, profilePicture, name }: perfilProps) {
  console.log(profilePicture)
  return (
    <div className="relative py-11 pb-7 bg-[#1E2543] flex-1 flex flex-col items-center rounded-lg overflow-hidden">
      <Image
        className="absolute top-0 max-h-24 w-full object-cover"
        src={bannerPicture ? bannerPicture : bannerPerfilDefault}
        alt="background do perfil"
      />

      <div className="z-10 mb-4 w-32 h-32 rounded-full border-2 border-solid border-gray-300 bg-gray-600 flex items-center justify-center overflow-hidden">
        {profilePicture ? (
          <Image src={profilePicture} alt="Foto de perfil" />
        ) : (
          <Camera size={64} className="text-gray-200" />
        )}
      </div>

      <span className="mb-1 font-semibold text-xl text-gray-200">{name}</span>
      <Link href={"profile"} className="font-semibold text-sm text-blue-300">visitar perfil</Link>
    </div>
  )
}