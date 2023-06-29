import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import defaultBannerPerfil from '../../../assets/default-banner-perfil.png'

import { api } from '../../../services/api'
import { userProps } from '../../../types/user'
import { Camera } from 'phosphor-react'

import Header from '../../../components/main-painel/Header'
import UploadImage from '../../../components/main-painel/profile/UploadImage'
import FormUserData from '../../../components/main-painel/profile/FormUserData'
import SettingCropArea from '../../../components/main-painel/profile/SettingCropArea'
import { companyProps } from '../../../types/company'

export default function Perfil() {
  const [user, setUser] = useState<userProps | null>(null)
  const [company, setCompany] = useState<companyProps | null>(null)
  const [selectedImgSrc, setSelectedImgSrc] = useState('')
  const [cropType, setCroptType] = useState<'profile' | 'banner'>('profile')
  const [onDialog, setOnDialog] = useState(false)

  useEffect(() => {
    api
      .get('/dashboard')
      .then((response) => {
        setUser(response.data.user)
        setCompany(response.data.company)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (!user || !company) {
    return (
      <div className='h-screen w-screen bg-zinc-900 text-zinc-50 flex items-center justify-center'>
        <h1 className='text-lg'>Carregando...</h1>
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

  function updateUserData(newUser: userProps) {
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
    <div className='h-screen flex flex-col'>
      <Header />

      <div className="relative flex h-28 items-center gap-9 pl-40">
        <Image
          draggable="false"
          className="absolute left-0 h-28 w-full object-cover"
          src={user.banner ? user.banner : defaultBannerPerfil}
          width={2000}
          height={112}
          quality={100}
          alt=""
        />
        <div className="absolute right-5 -bottom-4">
          <UploadImage updateImgSrc={updateBannerSrc} />
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

          <div className="absolute right-0 -bottom-2 ">
            <UploadImage updateImgSrc={updateProfileSrc} />
          </div>

          <Dialog.Root open={onDialog}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed top-0 left-0 z-10 h-screen w-screen bg-black/40" />
              <Dialog.Content className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
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
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <span className="z-[1] text-3xl font-semibold text-white">
          {user.byname}
        </span>
      </div>

      <FormUserData
        userData={user}
        updateUserData={updateUserData}
      />
    </div>
  )
}
