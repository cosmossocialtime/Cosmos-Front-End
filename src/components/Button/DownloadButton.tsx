import { Upload } from 'phosphor-react'

interface ButtonProps {
  text: string
  disabled?: boolean
  isLoading?: boolean
  printImage?: string
}

export function DownloadButton({ text, disabled, printImage }: ButtonProps) {
  return (
    <a
      className={`flex h-12 items-center justify-center gap-2 rounded-md border border-solid border-white px-4 text-sm font-semibold text-white transition hover:bg-white hover:text-black ${
        disabled ? 'disabled cursor-not-allowed opacity-50' : ''
      }`}
      href={printImage}
      download
      onClick={(e) => {
        !printImage && e.preventDefault()
      }}
    >
      <Upload size={16} weight="bold" />
      {text}
    </a>
  )
}
