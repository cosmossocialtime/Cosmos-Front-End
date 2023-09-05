import { ReactNode } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadImageProps {
  updateImgSrc: (source: string) => void
  children: ReactNode
}

export default function UploadImage({
  updateImgSrc,
  children,
}: UploadImageProps) {
  const { getRootProps } = useDropzone({
    onDrop: (files) => updateImgSrc(URL.createObjectURL(files[0])),
    accept: { 'image/*': ['.png', '.jpeg', '.jpg'] },
    maxFiles: 1,
  })

  return <div {...getRootProps()}>{children}</div>
}
