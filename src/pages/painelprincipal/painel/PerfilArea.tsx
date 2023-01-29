import Image from "next/image"
import Link from "next/link"
import { Camera } from "phosphor-react"
import { userData } from "../data/userData"

export function PerfilArea() {

  return (
    <div className="relative py-11 pb-7 bg-[#1E2543] flex flex-col items-center rounded-lg overflow-hidden">
      <Image
        className="absolute top-0 max-h-24 w-full object-cover"
        src={userData.backgroundPicture}
        alt="background do perfil"
      />
      <div className="z-10 mb-4 w-32 h-32 rounded-full border-2 border-gray-300 bg-gray-600 flex items-center justify-center overflow-hidden">
        {userData.profilePicture ? (
          <Image src={userData.profilePicture} alt="Foto de perfil" />
        ) : (
          <Camera size={32} className="text-gray-200" />
        )}
      </div>
      <span className="mb-1 font-semibold text-xl text-gray-200">{userData.name}</span>
      <Link href={"perfil"} className="font-semibold text-sm text-blue-300">visitar perfil</Link>
    </div>
  )
}