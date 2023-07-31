import Image from 'next/image'
import { useEffect, useState } from 'react'
import defaultBannerPerfil from '../../../assets/default-banner-perfil.png'

import { api } from '../../../services/api'
import { UserProps } from '../../../types/user'
import { Camera, Pencil } from 'phosphor-react'

import Header from '../../../components/main-painel/Header'
import UploadImage from '../../../components/Crop/UploadImage'
import FormUserData from '../../../components/main-painel/profile/FormUserData'
import SettingCropArea from '../../../components/Crop/SettingCropArea'
import { DialogCrop } from '../../../components/Crop/DialogCrop'

export default function Perfil() {
  const [user, setUser] = useState<UserProps | null>(null)
  const [selectedImgSrc, setSelectedImgSrc] = useState('')
  const [cropType, setCroptType] = useState<'profile' | 'banner'>('profile')
  const [onDialog, setOnDialog] = useState(false)

  useEffect(() => {
    api
      .get('/user')
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (!user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-900 text-zinc-50">
        <h1 className="text-lg">Carregando...</h1>
      </div>
    )
  }

  async function updateImgServer(base64Image: string, route: string) {
    const blob = await fetch(base64Image).then((response) => response.blob())

    const formData = new FormData()
    formData.append('file', blob, 'image.jpg')

    api.patch(route, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  function updateUserData(newUser: UserProps) {
    setUser(newUser)
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

  function handleProfileImg(image: string) {
    if (user) {
      setUser({ ...user, profilePicture: image })
    }

    updateImgServer(image, '/user/picture/profile')

    setOnDialog(false)
  }
  function handleBannerImg(image: string) {
    if (user) {
      setUser({ ...user, banner: image })
    }

    updateImgServer(image, '/user/picture/banner')

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

        <span className="z-[1] text-3xl font-semibold text-white">
          {user.byname}
        </span>
      </div>

      <FormUserData userData={user} updateUserData={updateUserData} />
    </div>
  )
}
