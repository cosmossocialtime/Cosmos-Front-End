import Image from 'next/image'
import LogoCosmos from '../../../../public/images/cosmos-logo-white.png'

interface ScreenshotBannerCardProps {
  socialOrganization: string
  byname: string
  role: string
  profilePhoto: string
  mentorshipLogoUrl?: string
}

export function ScreenshotBannerCard({
  socialOrganization,
  byname,
  role,
  profilePhoto,
  mentorshipLogoUrl,
}: ScreenshotBannerCardProps) {
  return (
    <div className="flex h-[1080px] w-[1080px] flex-col items-center gap-5 bg-bgNaveDeFundo bg-cover bg-center py-28">
      <div className="w-80 rounded-[20px] border-2 border-solid border-blue-900 bg-blue-800/90 p-5">
        <div className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-[10px] border-2 border-solid border-blue-700 bg-gray-100">
          <img
            src={profilePhoto}
            alt="Foto de usuário"
            className="h-[320px] w-[320px] rounded-[10px] object-contain"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 w-full bg-gradient-to-b from-transparent to-gray-900 " />
        </div>

        <h1 className="mx-3 mb-5 mt-2 text-4xl font-semibold text-gray-100">
          {byname}
        </h1>

        <p className="mx-3 text-gray-100">
          {role} em uma jornada para mentorar a organização social{' '}
          {socialOrganization}
        </p>
      </div>

      <div className="mt-5 flex w-80 items-end justify-between px-4">
        {mentorshipLogoUrl && (
          <img
            src={mentorshipLogoUrl}
            alt="Logo da empresa"
            className="h-[56px] max-h-14 w-[100px] w-auto object-contain"
            crossOrigin="anonymous"
          />
        )}
        <Image className="h-7 w-auto" alt="Logo Cosmos" src={LogoCosmos} />
      </div>
    </div>
  )
}
