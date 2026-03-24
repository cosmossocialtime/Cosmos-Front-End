import Image from 'next/image'
import { useEffect, useState } from 'react'
import defaultBannerPerfil from '../../../../../assets/default-banner-perfil-institution.png'
import { Camera, Pencil } from 'phosphor-react'
import UploadImage from '../../../../../components/Crop/UploadImage'
import SettingCropArea from '../../../../../components/Crop/SettingCropArea'
import { DialogCrop } from '../../../../../components/Crop/DialogCrop'
import { Loading } from '../../../../../components/Loading'
import DynamicHeader from '../../../../../components/header/DynamicHeader'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Lock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { EditButton } from '../../../../../components/Button/EditButton'
import InputField from '../../../../../components/Input/InputField'
import MaskedInputField from '../../../../../components/Input/MaskedInputField'
import SingleSelectComboBox from '../../../../../components/combobox/SingleSelectComboBox'
import { InputEmail } from '../../../../../components/Input/InputEmail'
import { Button } from '../../../../../components/Button/ButtonSubmit'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  emailSchema,
  nameSchema,
  phoneSchema,
} from '../../../../../utils/ValidationSchemas'
import { Option } from '../../../../../types/MultiselectCombobox'
import { InputChangePassword } from '../../../../../components/Input/InputChangePassword'
import { ChangePasswordInstitutionModal } from '../../../../../components/main-painel/profile/ChangePasswordInstitutionModal'
import formatPhone from '../../../../../utils/formatPhone'
import { useProfileInstitution } from '../../../../../hooks/useProfileInstitution'
import { useHeader } from '../../../../../context/HeaderContext'
import { ConfirmPasswordEmailChange } from '../../../../../components/instituition/profile/confirmPasswordEmailChange'
import { api } from '../../../../../services/api'

const schema = z.object({
  fullName: nameSchema,
  socialOrganizationName: nameSchema,
  phone: phoneSchema,
  professionalRole: z
    .string()
    .nonempty('O campo Cargo na Instituição é obrigatório'),
  professionalSector: z
    .string()
    .nonempty('O campo Área de Trabalho é obrigatório'),
  email: emailSchema,
})

type formProps = z.infer<typeof schema>

export default function Profile() {
  const router = useRouter()
  const { setUserName, setProfilePicture } = useHeader()
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const [enableForm, setEnableForm] = useState(false)
  const [selectedImgSrc, setSelectedImgSrc] = useState('')
  const [cropType, setCroptType] = useState<'profile' | 'banner'>('profile')
  const [onDialog, setOnDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedEmail, setSelectedEmail] = useState<string>('')
  const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] =
    useState<boolean>(false)
  const closeModalChangePassword = () => setIsModalChangePasswordOpen(false)
  const [isModalChangeEmailOpen, setIsModalChangeEmailOpen] =
    useState<boolean>(false)
  const closeModalChangeEmail = () => setIsModalChangeEmailOpen(false)
  const { user, isLoadingUser, updateUser, updateUserImage } =
    useProfileInstitution(organizationId)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  async function getSectors() {
    try {
      const response = await api.get('sector-select')
      return JSON.parse(response.data.body)
    } catch (error) {
      console.error('Erro ao buscar setores!')
      throw error
    }
  }

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: getSectors,
  })

  const watchedFields = watch([
    'fullName',
    'socialOrganizationName',
    'phone',
    'professionalSector',
    'professionalRole',
    'email',
  ])

  useEffect(() => {
    setIsDisabled(!isValid)
    setSelectedEmail(watchedFields[5])
  }, [watchedFields, isValid])

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        socialOrganizationName:
          user.socialOrganizations?.[0]?.socialOrganizationName || '',
        phone: user.phone || '',
        professionalSector:
          user.socialOrganizations?.[0]?.professionalSector || '',
        professionalRole: user.socialOrganizations?.[0]?.professionalRole || '',
        email: user.email || '',
      })
      setSelectedOption(user.socialOrganizations?.[0]?.professionalSector || '')
      setProfilePicture(user.profilePicture)
    }
  }, [user])

  const handleChange = (selected: Option | null) => {
    if (selected !== null) {
      setSelectedOption(selected.label)
    }
    setValue('professionalSector', selected?.label || '', {
      shouldValidate: true,
    })
  }

  async function handleForm(data: formProps) {
    if (user.email === data.email) {
      setIsLoading(true)
      updateUser({
        fullname: data.fullName,
        email: data.email,
        phone: data.phone,
        professionalRole: data.professionalRole,
        professionalSector: data.professionalSector,
        socialOrganizationId: organizationId,
      })
      setUserName(data.fullName)
      setEnableForm(false)
      setIsLoading(false)
    } else {
      setIsModalChangeEmailOpen(true)
    }
  }

  if (isLoadingUser || !user) {
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

      const response = await api.post('storage-create', payload)

      if (response.data.statusCode === 201) {
        const { storageId } = JSON.parse(response.data.body)
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
    <div className="min-h-screen overflow-x-hidden bg-gray-200">
      <DynamicHeader />
      <div className="mx-auto p-6">
        <h1 className="mb-6 mt-4 text-xl text-gray-600">Meu perfil</h1>

        <div className="relative min-h-[583px] overflow-hidden rounded-xl bg-white shadow-md">
          <div className="relative overflow-hidden rounded-t-xl bg-transparent shadow-md">
            <Image
              draggable="false"
              className="h-48 w-full object-cover"
              src={user.banner ? user.banner : defaultBannerPerfil}
              width={1500}
              height={256}
              quality={100}
              alt="banner do perfil"
            />
            {enableForm && (
              <div className="absolute right-5 top-5">
                <UploadImage updateImgSrc={updateBannerSrc}>
                  <div className=" flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-solid border-gray-300 bg-white p-2">
                    <Pencil size={24} className="text-blue-400" />
                  </div>
                </UploadImage>
              </div>
            )}
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

          <div className="relative px-8 pb-8 pt-8">
            <div className="absolute -top-8 left-8">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-solid border-gray-300 bg-gray-200">
                {user.profilePicture ? (
                  <Image
                    className="rounded-full object-cover"
                    src={user.profilePicture}
                    alt="foto do usuario"
                    width={128}
                    height={128}
                    quality={100}
                  />
                ) : (
                  <Camera size={40} className="text-gray-400" />
                )}
              </div>
              {enableForm && (
                <div className="absolute -bottom-2 right-0 ">
                  <UploadImage updateImgSrc={updateProfileSrc}>
                    <div className=" flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-solid border-gray-300 bg-white p-2">
                      <Pencil size={24} className="text-blue-400" />
                    </div>
                  </UploadImage>
                </div>
              )}
            </div>
            <div className="mt-4">
              {enableForm ? (
                <>
                  <form
                    id="userData"
                    onSubmit={handleSubmit(handleForm, (formErrors) => {
                      console.error('ERROS DE VALIDAÇÃO:', formErrors)
                    })}
                    noValidate
                  >
                    <div className="grid grid-cols-1 gap-6">
                      <div className="absolute right-10 h-[48px] w-[240px]">
                        <Button text="Salvar alterações" type="submit" />
                      </div>
                    </div>
                    <div className="mt-20 grid max-w-4xl grid-cols-1 gap-6 px-4 text-left sm:grid-cols-2">
                      <div className="max-w-[320px] text-left">
                        <InputField
                          className={`${
                            errors.fullName ? 'border-red-500' : ''
                          }`}
                          label="Nome"
                          name="fullName"
                          placeholder="Ex: Amigos da Cosmos"
                          register={register}
                          error={errors.fullName?.message}
                        />
                      </div>

                      <div className="max-w-[320px] text-left">
                        <InputField
                          className={`${
                            errors.socialOrganizationName
                              ? 'border-red-500'
                              : ''
                          }`}
                          label="Instituição"
                          disabled={true}
                          name="socialOrganizationName"
                          placeholder="Ex: Amigos da Cosmos"
                          register={register}
                          error={errors.socialOrganizationName?.message}
                        />
                      </div>

                      <div className="max-w-[320px] text-left">
                        <InputEmail
                          id="email"
                          label="Email"
                          register={register}
                          error={errors.email?.message}
                          autoFocus
                          placeholder="nome@email.com.br"
                        />
                      </div>

                      <div className="max-w-[320px] text-left">
                        <SingleSelectComboBox
                          options={sectors}
                          onChange={handleChange}
                          value={{
                            value: selectedOption,
                            label: selectedOption,
                          }}
                          label="Área de Trabalho"
                        />
                      </div>

                      <div className="max-w-[320px] text-left">
                        <MaskedInputField
                          className={`${errors.phone ? 'border-red-500' : ''}`}
                          label="Celular"
                          name="phone"
                          placeholder="Ex:(00) 00000-0000"
                          register={register}
                          setValue={setValue}
                          error={errors.phone?.message}
                        />
                      </div>

                      <div className="max-w-[320px] text-left">
                        <InputField
                          className={`${
                            errors.professionalRole ? 'border-red-500' : ''
                          }`}
                          label="Cargo na Instituição"
                          name="professionalRole"
                          placeholder="Ex: Analista financeiro"
                          register={register}
                          error={errors.professionalRole?.message}
                        />
                      </div>
                      {isModalChangePasswordOpen && (
                        <ChangePasswordInstitutionModal
                          closeModal={closeModalChangePassword}
                        />
                      )}
                      {isModalChangeEmailOpen && (
                        <ConfirmPasswordEmailChange
                          closeModal={closeModalChangeEmail}
                          email={selectedEmail}
                        />
                      )}
                      <div className="max-w-[320px] text-left">
                        <InputChangePassword
                          id="password"
                          defaultValue="••••••••"
                          label="Senha"
                          name="password"
                          onChangePassword={() =>
                            setIsModalChangePasswordOpen(true)
                          }
                        />
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="ml-36 text-left">
                      <h2 className="mb-1 text-xl font-semibold text-gray-600">
                        {user.fullName}
                      </h2>
                    </div>
                    <div className="absolute right-10 h-[48px] w-[134px]">
                      <EditButton
                        text="Editar"
                        onClick={() => setEnableForm(!enableForm)}
                        type="submit"
                      />
                    </div>
                  </div>
                  <div className="mt-10 grid max-w-3xl grid-cols-1 gap-6 px-4 text-left sm:grid-cols-2">
                    <div className="text-left">
                      <p className="text-sm text-gray-600">E-mail</p>
                      <p className="text-m text-gray-600">{user.email}</p>
                    </div>

                    <div className="text-left">
                      <p className="text-sm text-gray-600">Instituição</p>
                      <p className="text-m text-gray-600">
                        {user.socialOrganizations &&
                          user.socialOrganizations[0].socialOrganizationName}
                      </p>
                    </div>

                    <div className="text-left">
                      <p className="text-sm text-gray-600">Celular</p>
                      <p className="text-m text-gray-600">
                        {formatPhone(String(user.phone))}
                      </p>
                    </div>

                    <div className="text-left">
                      <p className="text-sm text-gray-600">Área de trabalho</p>
                      <p className="text-m text-gray-600">
                        {user.socialOrganizations &&
                          user.socialOrganizations[0].professionalSector}
                      </p>
                    </div>

                    <div className="text-left">
                      <p className="text-sm text-gray-600">Senha</p>
                      <div className="flex items-center gap-2">
                        <span className="text-m text-gray-600">••••••••</span>
                        <Lock size={18} className="text-gray-600" />
                      </div>
                    </div>

                    <div className="text-left">
                      <p className="text-sm text-gray-600">
                        Cargo na instituição
                      </p>
                      <p className="text-m text-gray-600">
                        {user.socialOrganizations &&
                          user.socialOrganizations[0].professionalRole}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
