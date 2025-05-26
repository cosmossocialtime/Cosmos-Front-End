import { ArrowLeft } from 'phosphor-react'
import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import Router, { useRouter } from 'next/router'
import { Button } from '../../../../../../components/Button/ButtonSubmit'

export default function OrganizationUploadImageAdvisor() {
  const router = useRouter()
  const { socialOrganizationId, mentorshipId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const mentorId = Number(mentorshipId || '0')

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <DynamicHeader />

      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-bgTerra bg-cover bg-center text-white">
        <div className="absolute left-6 top-6 z-10">
          <ArrowLeft
            className="cursor-pointer text-white"
            onClick={() =>
              Router.push(
                `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/organizationInfo`
              )
            }
            size={30}
          />
        </div>

        <div className="flex w-full max-w-6xl items-center px-4">
          <div className="max-w-4xl rounded-lg p-8 backdrop-blur-xl">
            <h1 className="mb-4 text-4xl">
              Na próxima tela, você poderá fazer o upload da logo da sua
              organização e compartilhar esta conquista nas redes sociais
            </h1>
            <p className="mb-10 text-xl text-gray-300">
              Após compartilhar, clique em Continuar para avançar na jornada.
            </p>
            <div className="h-[48px] w-[453px]">
              <Button
                text="Continuar"
                onClick={() =>
                  Router.push(
                    `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/organizationImageUpload`
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
