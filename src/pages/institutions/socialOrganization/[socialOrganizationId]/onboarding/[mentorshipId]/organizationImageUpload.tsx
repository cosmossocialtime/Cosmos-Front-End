import { ArrowLeft, Camera, DownloadSimple, UploadSimple } from 'phosphor-react'
import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import Router, { useRouter } from 'next/router'
import { Button } from '../../../../../../components/Button/ButtonSubmit'
import { useDashboard } from '../../../../../../hooks/useDashboard'
import Image from 'next/image'
import { ButtonSecondary } from '../../../../../../components/Button/ButtonSubmitSecondary'
import { DownloadButton } from '../../../../../../components/Button/DownloadButton'
import { invokeLambda } from '../../../../../../lib/aws/invokeLambda'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import UploadImage from '../../../../../../components/Crop/UploadImage'
import { DialogCrop } from '../../../../../../components/Crop/DialogCrop'
import SettingCropArea from '../../../../../../components/Crop/SettingCropArea'
import html2canvas from 'html2canvas'
import { MentorshipProps } from '../../../../../../types/mentorship'
import { ProgramProps } from '../../../../../../types/program'

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
  const program = dashboard?.programs.find(
    (p: ProgramProps) => p.id === mentorship?.programId
  )
  const [downloadUrl, setDownloadUrl] = useState('')

  const [selectedImg, setSelectedImg] = useState('')
  const [onDialog, setOnDialog] = useState(false)
  const [printImage, setPrintImage] = useState('')

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

      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('storage-create-lambda', payload)

      if (response.statusCode === 201) {
        const { storageId } = JSON.parse(response.body)
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

  async function takeScreenshot() {
    const canvas = await html2canvas(document.querySelector('.card')!)
    const base64Image = canvas.toDataURL('image/jpg')

    setPrintImage(base64Image)
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <DynamicHeader />
      <div className="relative flex flex-1 flex-col bg-bgFuturisticPedestal bg-cover bg-center bg-no-repeat text-white">
        <header className="absolute left-0 right-0 top-0 z-10 flex h-20 items-center justify-between px-6 backdrop-blur-xl">
          <ArrowLeft
            className="cursor-pointer text-white"
            onClick={() =>
              Router.push(
                `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/organizationUploadImageAdvisor`
              )
            }
            size={30}
          />
          <div className="flex gap-4">
            <div className="px-4 py-2">
              <DownloadButton
                text="Baixar imagem"
                printImage={printImage}
                disabled={
                  socialOrganization?.logo || socialOrganization?.logo !== ''
                    ? false
                    : true
                }
              />
            </div>
            <div className="px-4 py-2">
              <ButtonSecondary
                text="Compartilhar imagem"
                onClick={() =>
                  Router.push(
                    `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/organizationUploadImageAdvisor`
                  )
                }
              />
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center px-4 md:px-8">
          <main className="flex flex-col items-center">
            <div className="flex w-full max-w-4xl flex-col items-center gap-10 rounded-xl border border-white/20 p-8 backdrop-blur-2xl md:flex-row">
              <div className="card flex h-48 w-48 items-center justify-center rounded-md bg-white">
                <UploadImage updateImgSrc={receiveImg}>
                  {socialOrganization?.logo !== null ? (
                    <div className="group relative h-[197px] w-[197px]">
                      <Image
                        className="h-full w-full rounded-[10px] object-cover"
                        alt="Logo da organização"
                        onLoad={takeScreenshot}
                        src={socialOrganization.logo}
                        width={197}
                        height={197}
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

              <div className="text-left">
                <h2 className="mb-2 text-2xl font-semibold">
                  {socialOrganization?.name}
                </h2>
                <p className="text-white/80">
                  Uma das organizações selecionadas para o programa <br />
                  <span className="font-semibold">{program?.name}</span>.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <Image
                width={140}
                height={20}
                src={program?.companyLogo || ''}
                alt={`Logo ${program?.companyName}`}
              />
              <Image
                width={140}
                height={20}
                src="/images/logoCosmosBranco.svg"
                alt="Logo Cosmos"
              />
            </div>
          </main>
        </div>

        <footer className="absolute bottom-0 left-0 right-0 z-10 mb-10 px-4 pb-6 md:px-8">
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
