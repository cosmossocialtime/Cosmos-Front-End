import Image from 'next/image'
import Star from '../../../../assets/star.svg'
import { useState } from 'react'
import { AboutInstitutionModal } from '../../modal/AboutInstitution'
import { SocialOrganizationProps } from '../../../../types/socialOrganization'

interface CentralStarProps {
  socialOrganization: SocialOrganizationProps
  isFilled: boolean
}

export function CentralStar({
  socialOrganization,
  isFilled,
}: CentralStarProps) {
  const [isOpenAboutInstitution, setIsOpenAboutInstitution] = useState(false)
  const closeModalAboutInstitution = () => setIsOpenAboutInstitution(false)

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {isOpenAboutInstitution && (
        <AboutInstitutionModal
          closeModal={closeModalAboutInstitution}
          socialOrganization={socialOrganization}
          isFilled={isFilled}
        />
      )}
      <Image
        className={isFilled ? '' : 'opacity-70 grayscale'}
        width={198}
        height={200}
        src={Star}
        alt=""
      />
      <h4 className="text-xl text-white">{socialOrganization.name}</h4>
      <button
        className="text-m text-blue-300"
        onClick={() => setIsOpenAboutInstitution(true)}
      >
        {isFilled ? 'Visualizar' : 'Preencher'}
      </button>
    </div>
  )
}
