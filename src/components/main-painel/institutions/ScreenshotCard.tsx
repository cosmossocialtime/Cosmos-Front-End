import Image from 'next/image'

interface ScreenshotCardProps {
  organizationName: string
  mentorshipName: string
  logoUrl: string
  mentorshipLogoUrl?: string
}

export function ScreenshotCard({
  organizationName,
  mentorshipName,
  logoUrl,
  mentorshipLogoUrl,
}: ScreenshotCardProps) {
  return (
    <div className="relative flex h-[1080px] w-[1080px] flex-1 flex-col bg-bgFuturisticPedestalPrint bg-cover bg-center bg-no-repeat text-white">
      <div className="flex flex-1 flex-col items-center justify-center px-4 md:px-8">
        <main className="flex flex-col items-center">
          <div className="absolute left-[140px] top-[177px] flex w-full flex-col items-center gap-10  rounded-xl p-8 md:flex-row">
            <div className="relative left-[19px] h-[197.43px] w-[197.43px]"></div>
            <div className="absolute left-[52px] top-[31px] z-[3]">
              <img
                src={logoUrl}
                alt="Logo da organização"
                className="h-[293.43px] w-[293.43px] rounded-xl object-contain"
                crossOrigin="anonymous"
              />
            </div>

            <div className="ml-32 h-[176px] w-[290px] text-left">
              <h2 className="mb-2 text-4xl font-semibold text-white">
                {organizationName}
              </h2>
              <br />
              <span className="text-xl text-white">
                Uma das organizações
                <br />
                selecionadas para o programa
                <br />
                <span className="text-xl font-semibold text-white">
                  {mentorshipName}
                </span>
                .
              </span>
            </div>
          </div>

          <div className="absolute left-[330px] top-[580px]">
            <div className="mt-10 flex items-end gap-8">
              {mentorshipLogoUrl && (
                <img
                  src={mentorshipLogoUrl}
                  alt={`Logo ${mentorshipName}`}
                  className="h-[80px] w-[200px] object-contain"
                  crossOrigin="anonymous"
                />
              )}
              <Image
                width={200}
                height={80}
                src="/images/logoCosmosBranco.svg"
                alt="Logo Cosmos"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
