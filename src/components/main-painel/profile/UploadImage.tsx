import { Pencil } from 'phosphor-react'
import Dropzone from 'react-dropzone'

interface UploadImageProps {
  updateImgSrc: (source: string) => void
}

export default function UploadImage({ updateImgSrc }: UploadImageProps) {
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
          <Pencil
            size={24}
            className=" h-10 w-10 cursor-pointer rounded-full border-2 border-solid border-white bg-[#5200AB] p-2 text-white"
          />
        </label>
      )}
    </Dropzone>
  )
}
