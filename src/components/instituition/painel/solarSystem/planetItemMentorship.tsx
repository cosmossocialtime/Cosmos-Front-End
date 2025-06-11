import Image from 'next/image'
import { useState } from 'react'
import { Option } from '../../../../types/MultiselectCombobox'
import { MentorshipSectorProps } from '../../../../types/mentorshipSector'
import { SectorFormMentorship } from './sectorFormMentorship'

export interface PlanetItemMentorshipProps {
  imageSrc: string
  name: string
  id: number
  isFilled?: boolean
  sectorData?: Option
  organizationData?: MentorshipSectorProps
  mentorshipSocialOrganizationId?: number
  socialOrganizationId?: number
  mentorshipId?: number
  completedOnboarding?: boolean
}

export function PlanetItemMentorship({
  imageSrc,
  name,
  isFilled = false,
  sectorData,
  organizationData,
  mentorshipSocialOrganizationId,
  socialOrganizationId,
  mentorshipId,
  completedOnboarding,
}: PlanetItemMentorshipProps) {
  const [isOpenSector, setIsOpenSector] = useState(false)
  const closeModalSector = () => setIsOpenSector(false)

  return (
    <div className="flex flex-col items-center justify-center">
      {isOpenSector && (
        <SectorFormMentorship
          closeModal={closeModalSector}
          isFilled={isFilled}
          name={name}
          image={imageSrc}
          mentorshipSocialOrganizationId={mentorshipSocialOrganizationId}
          sector={sectorData}
          mentorshipSector={organizationData}
          mentorshipId={mentorshipId}
          socialOrganizationId={socialOrganizationId}
          completedOnboarding={completedOnboarding}
        />
      )}
      <Image
        className={isFilled ? '' : 'grayscale filter'}
        width={47}
        height={53}
        src={imageSrc}
        alt={name}
      />
      <h4 className="text-center text-base  text-white">{name}</h4>
      <button
        onClick={() => setIsOpenSector(true)}
        className="text-sm text-blue-300"
      >
        {isFilled ? 'Visualizar' : 'Preencher'}
      </button>
    </div>
  )
}
