import { ReactNode } from 'react'
import Dropzone from 'react-dropzone'

interface UploadImageProps {
  updateImgSrc: (source: string) => void
  children: ReactNode
}

export default function UploadImage({
  updateImgSrc,
  children,
}: UploadImageProps) {
  function handleSelecteFile(acceptedFiles: File[]) {
    const file = acceptedFiles[0]
    updateImgSrc(URL.createObjectURL(file))
  }

  return (
    <Dropzone
      maxFiles={1}
      accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
      onDropAccepted={(acceptedFiles) => {
        handleSelecteFile(acceptedFiles)
      }}
    >
      {({ getInputProps }) => (
        <label>
          <input {...getInputProps()} />
          {children}
        </label>
      )}
    </Dropzone>
  )
}
