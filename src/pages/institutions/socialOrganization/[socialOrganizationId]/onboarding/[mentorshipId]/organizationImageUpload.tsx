import { ArrowLeft, Camera, UploadSimple } from 'phosphor-react'
import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import Router, { useRouter } from 'next/router'
import { Button } from '../../../../../../components/Button/ButtonSubmit'
import { useDashboard } from '../../../../../../hooks/useDashboard'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useState } from 'react'
import UploadImage from '../../../../../../components/Crop/UploadImage'
import { DialogCrop } from '../../../../../../components/Crop/DialogCrop'
import SettingCropArea from '../../../../../../components/Crop/SettingCropArea'
import { MentorshipProps } from '../../../../../../types/mentorship'
import { ScreenshotWrapper } from '../../../../../../components/main-painel/institutions/ScreenshotWrapper'
import { api } from '../../../../../../services/api'

export default function OrganizationImageUpload() {
  const router = useRouter()
  const { socialOrganizationId, mentorshipId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const mentorId = Number(mentorshipId || '0')
  const { dashboard, updateSocialOrganizationLogo } =
    useDashboard(organizationId)
  const socialOrganization = dashboard?.socialOrganization
  const mentorship = dashboard?.currentMentorships.find(
    (m: MentorshipProps) => m.mentorshipId === mentorId
  )

  const [selectedImg, setSelectedImg] = useState('')
  const [onDialog, setOnDialog] = useState(false)

  function receiveImg(source: string) {
    setSelectedImg(source)
    setOnDialog(true)
  }

  async function handleImg(image: string) {
    const key = `social-organization/${socialOrganization?.id || 0}/logo.jpg`
    const storageId = await updateImgServer(image, key, 'logo.jpg')
    updateSocialOrganizationLogo({
      storageId: storageId || 0,
      socialOrganizationId: socialOrganization?.id || 0,
    })
    setOnDialog(false)
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

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <DynamicHeader />
      <div className="relative flex flex-1 flex-col bg-bgFuturisticPedestal bg-cover bg-center bg-no-repeat text-white">
        <header className="absolute left-0 right-0 top-0 z-10 backdrop-blur-xl">
          <div className="flex h-20 flex-col items-center justify-between py-4">
            <div className="absolute left-10 z-10 mt-2 items-center">
              <ArrowLeft
                className="mt-2 cursor-pointer text-white"
                onClick={() =>
                  Router.push(
                    `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/organizationUploadImageAdvisor`
                  )
                }
                size={24}
              />
            </div>
            <div className="mt-4 flex items-center text-center text-base text-white">
              Baixe a imagem da sua conquista e compartilhe nas redes sociais
            </div>
            <div className="absolute right-10 w-[240px]">
              <ScreenshotWrapper
                organizationName={socialOrganization?.name || ''}
                mentorshipName={mentorship?.name || ''}
                logoUrl={socialOrganization?.logo}
                mentorshipLogoUrl={mentorship?.logo || ''}
              />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-4 md:px-8">
          <main className="flex flex-col items-center">
            <div className="gradient-border-card flex w-full flex-col items-center rounded-xl md:flex-row">
              <div className="logo-container">
                <div className="logo-white-background"></div>
                <div className="logo-gradient-border"></div>
                <div className="logo-content">
                  <UploadImage updateImgSrc={receiveImg}>
                    {socialOrganization?.logo !== null ? (
                      <div className="group relative h-[194.43px] w-[194.43px] rounded-md">
                        <Image
                          className="rounded-md"
                          alt="Logo da organização"
                          src={socialOrganization?.logo}
                          width={194.43}
                          height={194.43}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-[10px] bg-black opacity-0 transition-opacity group-hover:opacity-30">
                          <Camera size={56} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="m-5 flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-400 bg-gray-200">
                        <UploadSimple size={32} className="text-gray-600" />
                        <span className="text-center text-sm text-gray-600">
                          Insira a logo da organização aqui
                        </span>
                      </div>
                    )}
                  </UploadImage>
                  <DialogCrop onDialog={onDialog} setOnDialog={setOnDialog}>
                    <SettingCropArea
                      selectedImgSrc={selectedImg}
                      handleImg={handleImg}
                      aspectRatio={1 / 1}
                      cropShape={'rect'}
                    />
                  </DialogCrop>
                </div>
              </div>

              <div className="ml-4 h-[176px] w-[235px] text-left">
                <h2 className="text-3xl font-semibold text-white">
                  {socialOrganization?.name}
                </h2>
                <br />
                <span className="text-base text-white">
                  Uma das organizações
                  <br />
                  selecionadas para o programa
                  <br />
                  <span className="text-base font-semibold text-white">
                    {mentorship?.name}
                  </span>
                  .
                </span>
              </div>
            </div>

            <div className="mt-10 flex h-[54px] w-[291px] items-end gap-6">
              {mentorship?.logo && (
                <Image
                  width={122}
                  height={54}
                  src={mentorship?.logo || ''}
                  alt={`Logo ${mentorship?.companyName}`}
                />
              )}
              <Image
                width={138}
                height={28}
                src="/images/logoCosmosBranco.svg"
                alt="Logo Cosmos"
              />
            </div>
          </main>
        </div>

        <footer className="absolute bottom-0 left-0 right-0 z-10 mb-4 px-4 pb-6 md:px-8">
          <div className="mx-auto w-full max-w-xs">
            <Button
              text="Continuar"
              onClick={() =>
                Router.push(
                  `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/finalization`
                )
              }
            />
          </div>
        </footer>
      </div>
    </div>
  )
}
