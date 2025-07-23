import { DownloadSimple } from 'phosphor-react'

interface ButtonProps {
  text: string
  disabled?: boolean
  isLoading?: boolean
  printImage?: string
  organizationName?: string
  onClick: () => void
}

export function DownloadButton({
  text,
  disabled,
  printImage,
  organizationName,
  onClick,
}: ButtonProps) {
  const handleDownload = async () => {
    if (!printImage) {
      await onClick()
    }

    const link = document.createElement('a')
    link.href = printImage || ''
    link.download = 'Post de divulgação ' + organizationName + ' e Cosmos.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#0A84FF] px-4 text-base font-semibold text-white transition hover:bg-[#006FE0] ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
      onClick={handleDownload}
      disabled={disabled}
    >
      <DownloadSimple size={18} weight="bold" />
      {text}
    </button>
  )
}
