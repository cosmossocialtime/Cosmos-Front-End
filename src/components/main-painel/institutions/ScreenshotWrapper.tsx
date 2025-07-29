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

    const width = ref.current.offsetWidth
    const height = ref.current.offsetHeight

    html2canvas(ref.current, {
      useCORS: true,
      scale: 1,
      width,
      height,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: null,
    }).then((canvas) => {
      const resizedCanvas = document.createElement('canvas')
      resizedCanvas.width = width
      resizedCanvas.height = height
      const ctx = resizedCanvas.getContext('2d')
      ctx?.drawImage(canvas, 0, 0, width, height)

      const dataUrl = resizedCanvas.toDataURL('image/jpeg', 1.0)
      const link = document.createElement('a')
      link.href = dataUrl || ''
      link.download = `Post de divulgação ${organizationName} e Cosmos.jpg`
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
