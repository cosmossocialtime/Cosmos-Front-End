import { useCallback, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import CropImage from './CropImage'
import { Button } from '../Button'

interface SettingCropAreaProps {
  selectedImgSrc: string
  handleImg: (image: string) => void
  aspectRatio: number
  cropShape: 'round' | 'rect'
}

export default function SettingCropArea({
  selectedImgSrc,
  handleImg,
  aspectRatio,
  cropShape,
}: SettingCropAreaProps) {
  const imgFile = new Image()
  imgFile.src = selectedImgSrc

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<Area>()

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels)
    },
    [],
  )

  function cropImg() {
    const imageSrc = CropImage(croppedArea!, selectedImgSrc)
    if (imageSrc) {
      handleImg(imageSrc)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8">
      <div className="relative h-96 w-96">
        <Cropper
          image={selectedImgSrc}
          crop={crop}
          zoom={zoom}
          zoomSpeed={0.1}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape={cropShape}
          showGrid={false}
          objectFit="contain"
        />
      </div>

      <Button.Primary className="p-4 text-base" onClick={() => cropImg()}>
        Cortar imagem
      </Button.Primary>
    </div>
  )
}
