import { ArrowLeft } from 'phosphor-react'
import Image from 'next/image'
import Star from '../../../../../../assets/star.svg'
import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import Router, { useRouter } from 'next/router'
import { Button } from '../../../../../../components/Button/ButtonSubmit'
import { useState } from 'react'
import InstitutionInfoModal from '../../../../../../components/instituition/modal/InstitutionInfo'
import Link from 'next/link'
import { useDashboard } from '../../../../../../hooks/useDashboard'

export default function OrganizationInfo() {
  const router = useRouter()
  const { socialOrganizationId, mentorshipId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const mentorId = Number(mentorshipId || '0')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { dashboard } = useDashboard(organizationId)
  const socialOrganization = dashboard?.socialOrganization

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      {/* Header fixo */}
      <DynamicHeader />

      {isModalOpen && (
        <InstitutionInfoModal
          socialOrganization={socialOrganization}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Conteúdo com fundo */}
      <div className="relative flex flex-1 flex-col items-center justify-center bg-bgSpaceInstitution bg-cover bg-center px-6 py-10 text-white">
        <div className="absolute left-10 top-8 z-10">
          <ArrowLeft
            className="cursor-pointer text-white"
            onClick={() =>
              Router.push(
                `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/welcome`
              )
            }
            size={24}
          />
        </div>

        {/* Conteúdo central */}
        <div className="max-w-8xl flex w-full flex-col items-center justify-center gap-10 md:flex-row md:gap-20">
          {/* Texto à esquerda */}
          <div className="max-w-3xl p-14 text-center backdrop-blur-xl md:text-left">
            <h1 className="mb-6 text-3xl font-semibold leading-tight md:text-4xl">
              Na Cosmos, cada organização social é uma Estrela que gera um
              impacto positivo no universo.
            </h1>

            <p className="mb-6 text-xl text-gray-300">
              Neste programa, você será a(o) Guia de uma das estrelas mais
              brilhantes da galáxia, a organização {socialOrganization?.name}!
            </p>

            <p className="text-xl text-gray-300">
              <span className="text-xl text-white">
                Clique sobre a estrela ao lado
              </span>{' '}
              para visualizar informações sobre ela.
            </p>
          </div>

          {/* Card da estrela à direita */}
          <button onClick={() => setIsModalOpen(true)}>
            <div className="gradient-border group flex cursor-pointer flex-col items-center p-12 backdrop-blur-xl">
              <div className="flex h-60 w-60 items-center justify-center transition-transform hover:scale-110">
                <Image
                  width={200}
                  height={200}
                  src={Star}
                  alt="Estrela"
                  className="drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                />
              </div>
              <span className="mt-4 text-xl font-medium text-white">
                {socialOrganization?.name}
              </span>
            </div>
          </button>
        </div>

        <div className="mt-12 w-full max-w-xs">
          <Button
            text="Continuar"
            onClick={() =>
              Router.push(
                `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/organizationUploadImageAdvisor`
              )
            }
          />
        </div>
      </div>
    </div>
  )
}
