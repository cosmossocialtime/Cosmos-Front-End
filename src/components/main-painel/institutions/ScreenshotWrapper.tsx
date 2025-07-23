import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { ScreenshotCard } from './ScreenshotCard'
import { DownloadButton } from '../../Button/DownloadButton'

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
  const [printImage, setPrintImage] = useState('')

  const handleScreenshot = async () => {
    if (!ref.current) return

    await document.fonts.ready

    html2canvas(ref.current, {
      useCORS: true,
      scale: 1.5,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/jpeg', 1.0)
      setPrintImage(dataUrl)
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

      <DownloadButton
        text="Baixar imagem"
        printImage={printImage}
        organizationName={organizationName}
        onClick={handleScreenshot}
        disabled={logoUrl || logoUrl !== '' ? false : true}
      />
    </div>
  )
}
