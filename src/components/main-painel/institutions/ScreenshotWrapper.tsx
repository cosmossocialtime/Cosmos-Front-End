import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { ScreenshotCard } from './ScreenshotCard'
import { DownloadSimple } from 'phosphor-react'

interface ScreenshotWrapperProps {
  organizationName: string
  mentorshipName: string
  logoUrl: string
  mentorshipLogoUrl?: string
}

export function ScreenshotWrapper({
  organizationName,
  mentorshipName,
  logoUrl,
  mentorshipLogoUrl,
}: ScreenshotWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleScreenshot = async () => {
    if (!ref.current) return

    await document.fonts.ready

    html2canvas(ref.current, {
      useCORS: true,
      scale: 1.5,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/jpeg', 1.0)
      const link = document.createElement('a')
      link.href = dataUrl || ''
      link.download = 'Post de divulgação ' + organizationName + ' e Cosmos.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  return (
    <div>
      <div className="absolute -top-[3000px] left-0" ref={ref}>
        <ScreenshotCard
          organizationName={organizationName}
          mentorshipName={mentorshipName}
          logoUrl={logoUrl}
          mentorshipLogoUrl={mentorshipLogoUrl}
        />
      </div>
      <button
        className={`flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#0A84FF] px-4 text-base font-semibold text-white transition hover:bg-[#006FE0] ${
          logoUrl || logoUrl !== '' ? '' : 'cursor-not-allowed opacity-50'
        }`}
        onClick={handleScreenshot}
        disabled={logoUrl || logoUrl !== '' ? false : true}
      >
        <DownloadSimple size={18} weight="bold" />
        Baixar imagem
      </button>
    </div>
  )
}
