import { useCallback, useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import CropImage from '../../../utils/CropImage'

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
    <div className="flex flex-col items-center justify-center gap-6 py-8 px-4">
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

      <button
        className="rounded bg-violet-400 p-4 text-white transition-colors hover:bg-violet-600"
        onClick={() => cropImg()}
      >
        Cortar imagem
      </button>
    </div>
  )
}
