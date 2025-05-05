import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Router from 'next/router'
import { invokeLambda } from '../../lib/aws/invokeLambda'
import { UserProps } from '../../types/user'
import { SocialOrganizationProps } from '../../types/socialOrganization'
import { ProgramProps } from '../../types/program'
import { MentorshipApplicantProps } from '../../types/mentorshipApplicant'
import { FocalPointProps } from '../../types/focalPoint'

type OnboardingInstitutionContextProps = {
  user: UserProps | null
  socialOrganization: SocialOrganizationProps | null
  mentorshipApplicant: MentorshipApplicantProps | null
  focalPoint: FocalPointProps | null
  program: ProgramProps | null
  onboardingMember: boolean
  changeUser: (updatedUser: UserProps) => void
  changeSocialOrganization: (
    updatedOrganization: SocialOrganizationProps
  ) => void
  changeMentorshipApplicant: (
    updatedMentorship: MentorshipApplicantProps
  ) => void
  changeFocalPoint: (updatedFocalPoint: FocalPointProps) => void
  changeProgram: (updatedProgram: ProgramProps) => void
  saveOnboarding: (user: UserProps) => void
  saveOnboardingMember: (updatedUser: UserProps) => void
  saveMentorshipApplicant: (updatedMentorship: MentorshipApplicantProps) => void
  setOnboardingMember: (onboarding: boolean) => void
  setNewFocalPoint: () => void
  setNewMentorshipApplicant: () => void
}

const OnboardingInstitutionContext =
  createContext<OnboardingInstitutionContextProps>(
    {} as OnboardingInstitutionContextProps
  )

const OnboardingInstitutionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [socialOrganization, setSocialOrganization] =
    useState<SocialOrganizationProps | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)
  const [mentorshipApplicant, setMentorshipApplicant] =
    useState<MentorshipApplicantProps | null>(null)
  const [focalPoint, setFocalPoint] = useState<FocalPointProps | null>(null)
  const [program, setProgram] = useState<ProgramProps | null>(null)
  const [onboardingMember, setOnboardingMember] = useState<boolean>(false)

  function setNewFocalPoint() {
    setFocalPoint(null)
  }

  function setNewMentorshipApplicant() {
    setMentorshipApplicant(null)
  }

  function changeSocialOrganization(
    updatedOrganization: SocialOrganizationProps
  ) {
    setSocialOrganization((prev) => ({ ...prev, ...updatedOrganization }))
  }

  function changeUser(updatedUser: UserProps) {
    setUser((prev) => ({ ...prev, ...updatedUser }))
  }

  function changeMentorshipApplicant(
    updatedMentorship: MentorshipApplicantProps
  ) {
    setMentorshipApplicant((prev) => ({ ...prev, ...updatedMentorship }))
  }

  function changeFocalPoint(updatedProgram: FocalPointProps) {
    setFocalPoint((prev) => ({ ...prev, ...updatedProgram }))
  }

  function changeProgram(updatedFocalPoint: ProgramProps) {
    setProgram((prev) => ({ ...prev, ...updatedFocalPoint }))
  }

  async function saveOnboarding(updatedUser: UserProps) {
    try {
      const causas: number[] =
        (socialOrganization &&
          socialOrganization.causes.map((c) => {
            return Number(c.value)
          })) ||
        []
      const payload = {
        socialOrganizationName:
          socialOrganization !== null ? socialOrganization.name : '',
        causes: causas,
        fullName: (updatedUser && updatedUser.fullName) || '',
        phone: (updatedUser && updatedUser.phone) || '',
        professionalSector:
          (updatedUser && updatedUser.professionalSector) || '',
        professionalRole: (updatedUser && updatedUser.professionalRole) || '',
      }

      const response = await invokeLambda<
        {
          socialOrganizationName: string
          causes: number[]
          fullName: string
          phone: string
          professionalSector: string
          professionalRole: string
        },
        { statusCode: number; body: string }
      >('onboarding-create-lambda', payload)

      if (response.statusCode == 201) {
        toast.success('Cadastro concluído!')
        Router.push('/institutions/painel')
      }
    } catch (error) {
      throw error
    }
  }

  async function saveOnboardingMember(updatedUser: UserProps) {
    try {
      const payload = {
        fullName: (updatedUser && updatedUser.fullName) || '',
        phone: (updatedUser && updatedUser.phone) || '',
        professionalSector:
          (updatedUser && updatedUser.professionalSector) || '',
        professionalRole: (updatedUser && updatedUser.professionalRole) || '',
      }

      const response = await invokeLambda<
        {
          fullName: string
          phone: string
          professionalSector: string
          professionalRole: string
        },
        { statusCode: number; body: string }
      >('onboarding-member-create-lambda', payload)

      if (response.statusCode == 201) {
        toast.success('Cadastro concluído!')
        Router.push('/institutions/painel')
      }
    } catch (error) {
      throw error
    }
  }

  async function saveMentorshipApplicant(
    updatedMentorship: MentorshipApplicantProps
  ) {
    try {
      if (
        socialOrganization !== null &&
        focalPoint !== null &&
        program !== null
      ) {
        updatedMentorship.completed = true
        const payload = {
          socialOrganization: socialOrganization,
          focalPoint: focalPoint,
          mentorshipApplicant: updatedMentorship,
          program: program,
        }

        const response = await invokeLambda<
          {
            socialOrganization: SocialOrganizationProps
            focalPoint: FocalPointProps
            mentorshipApplicant: MentorshipApplicantProps
            program: ProgramProps
          },
          { statusCode: number; body: string }
        >('onboardingProgram-create-lambda', payload)
        if (response.statusCode == 201) {
          toast.success('Cadastro concluído!')
          Router.push(`/institutions/adventure/${program?.id}/subscribe/thanks`)
        }
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <OnboardingInstitutionContext.Provider
      value={{
        user,
        socialOrganization,
        mentorshipApplicant,
        focalPoint,
        program,
        onboardingMember,
        changeUser,
        changeSocialOrganization,
        changeMentorshipApplicant,
        changeFocalPoint,
        changeProgram,
        saveOnboarding,
        saveOnboardingMember,
        saveMentorshipApplicant,
        setOnboardingMember,
        setNewFocalPoint,
        setNewMentorshipApplicant,
      }}
    >
      {children}
    </OnboardingInstitutionContext.Provider>
  )
}

const useOnboardingInstitution = () => {
  const context = useContext(OnboardingInstitutionContext)

  return context
}

export {
  OnboardingInstitutionProvider,
  OnboardingInstitutionContext,
  useOnboardingInstitution,
}
