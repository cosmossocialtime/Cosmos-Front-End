import Image from 'next/image'
import { useState } from 'react'
import defaultBannerPerfil from '../../../assets/default-banner-perfil.png'

import { Camera, Pencil } from 'phosphor-react'

import Header from '../../../components/header/Header'
import UploadImage from '../../../components/Crop/UploadImage'
import FormUserData from '../../../components/main-painel/profile/FormUserData'
import SettingCropArea from '../../../components/Crop/SettingCropArea'
import { DialogCrop } from '../../../components/Crop/DialogCrop'
import { Loading } from '../../../components/Loading'
import { useProfile } from '../../../hooks/useProfile'
import { toast } from 'react-toastify'
import { api } from '../../../services/api'

export default function Perfil() {
  const { user, isLoadingUser, updateUserImage } = useProfile()
  const [selectedImgSrc, setSelectedImgSrc] = useState('')
  const [cropType, setCroptType] = useState<'profile' | 'banner'>('profile')
  const [onDialog, setOnDialog] = useState(false)

  if (!user) {
    return <Loading />
  }

  async function updateImgServer(
    base64Image: string,
    key: string,
    fileName: string
  ) {
    const blob = await fetch(base64Image).then((response) => response.blob())
    try {
      // Requisição da Presigned URL para upload do arquivo
      const res = await fetch('/api/get-presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: fileName,
          fileType: blob.type,
          key,
        }),
      })

      if (!res.ok) throw new Error('Erro ao obter Presigned URL')

      const { uploadUrl } = await res.json()

      // Upload para S3
      const upload = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': blob.type },
        body: blob,
      })

      if (!upload.ok) throw new Error('Erro ao enviar o arquivo para o S3')

      // Invoca Lambda para salvar metadados
      const payload = {
        bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        directoryPath: key,
        mime: blob.type,
      }

      const response = await api.post('/storage', payload)

      if (response.status === 201) {
        const { storageId } = response.data
        return Number(storageId)
      } else {
        toast.error('Erro ao salvar metadados no storage')
        return null
      }
    } catch (err) {
      toast.error('Erro ao salvar metadados no storage')
      return null
    }
  }

  function updateProfileSrc(source: string) {
    setSelectedImgSrc(source)
    setCroptType('profile')
    setOnDialog(true)
  }
  function updateBannerSrc(source: string) {
    setSelectedImgSrc(source)
    setCroptType('banner')
    setOnDialog(true)
  }

  async function handleProfileImg(image: string) {
    const storageId = await updateImgServer(
      image,
      `user/${user.id || 0}/profile.jpg`,
      'profile.jpg'
    )
    updateUserImage({ storageId: storageId || 0, imageType: 'profile' })
    setOnDialog(false)
  }

  async function handleBannerImg(image: string) {
    const storageId = await updateImgServer(
      image,
      `user/${user.id || 0}/banner.jpg`,
      'banner.jpg'
    )
    updateUserImage({ storageId: storageId || 0, imageType: 'banner' })
    setOnDialog(false)
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />

      <div className="relative flex h-28 items-center gap-9 pl-40">
        <Image
          draggable="false"
          className="absolute left-0 h-28 w-full object-cover"
          src={user.banner ? user.banner : defaultBannerPerfil}
          width={1500}
          height={112}
          quality={100}
          alt=""
        />
        <div className="absolute -bottom-4 right-5">
          <UploadImage updateImgSrc={updateBannerSrc}>
            <Pencil
              size={24}
              className=" h-10 w-10 cursor-pointer rounded-full border-2 border-solid border-white bg-[#5200AB] p-2 text-white"
            />
          </UploadImage>
        </div>

        <div className="relative top-10 flex h-32 w-32 items-center justify-center rounded-full border-4 border-solid border-white bg-slate-400">
          {user.profilePicture ? (
            <Image
              className="rounded-full"
              src={user.profilePicture}
              alt="foto do usuario"
              width={128}
              height={128}
              quality={100}
            />
          ) : (
            <Camera size={64} className="text-gray-200" />
          )}

          <div className="absolute -bottom-2 right-0 ">
            <UploadImage updateImgSrc={updateProfileSrc}>
              <Pencil
                size={24}
                className=" h-10 w-10 cursor-pointer rounded-full border-2 border-solid border-white bg-[#5200AB] p-2 text-white"
              />
            </UploadImage>
          </div>

          <DialogCrop onDialog={onDialog} setOnDialog={setOnDialog}>
            {cropType === 'profile' && (
              <SettingCropArea
                selectedImgSrc={selectedImgSrc}
                handleImg={handleProfileImg}
                aspectRatio={1 / 1}
                cropShape={'round'}
              />
            )}
            {cropType === 'banner' && (
              <SettingCropArea
                selectedImgSrc={selectedImgSrc}
                handleImg={handleBannerImg}
                aspectRatio={10 / 1}
                cropShape={'rect'}
              />
            )}
          </DialogCrop>
        </div>
      </div>

      <FormUserData userData={user} />
    </div>
  )
}
