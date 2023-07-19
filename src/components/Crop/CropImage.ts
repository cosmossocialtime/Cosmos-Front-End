import { Area } from 'react-easy-crop'

export default function CropImage(
  { width, height, x, y }: Area,
  source: string,
) {
  const canvas = document.createElement('canvas')

  const image = new Image()
  image.src = source

  canvas.width = image.width
  canvas.height = image.height

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return console.error('ctx not create')
  }

  ctx.drawImage(image, 0, 0)

  const croppedImg = ctx.getImageData(x, y, width, height)

  canvas.width = width
  canvas.height = height

  ctx?.putImageData(croppedImg, 0, 0)

  const base64Image = canvas.toDataURL('image/jpeg')

  return base64Image
}
