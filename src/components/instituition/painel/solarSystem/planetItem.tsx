import Image from 'next/image'
import { useState } from 'react'
import { SectorForm } from './SectorForm'
import { Option } from '../../../../types/MultiselectCombobox'
import { SectorProps } from '../../../../types/sector'

export interface PlanetItemProps {
  imageSrc: string
  name: string
  id: number
  isFilled?: boolean
  sectorData?: Option
  organizationData?: SectorProps
  socialOrganizationId?: number
}

export function PlanetItem({
  imageSrc,
  name,
  isFilled = false,
  sectorData,
  organizationData,
  socialOrganizationId,
}: PlanetItemProps) {
  const [isOpenSector, setIsOpenSector] = useState(false)
  const closeModalSector = () => setIsOpenSector(false)

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {isOpenSector && (
        <SectorForm
          closeModal={closeModalSector}
          isFilled={isFilled}
          name={name}
          image={imageSrc}
          socialOrganizationId={socialOrganizationId}
          sector={sectorData}
          organizationSector={organizationData}
        />
      )}
      <Image
        className={isFilled ? '' : 'grayscale filter'}
        width={40}
        height={40}
        src={imageSrc}
        alt={name}
      />
      <h4 className="text-sm text-white">{name}</h4>
      <button
        onClick={() => setIsOpenSector(true)}
        className="text-[12px] text-blue-300"
      >
        {isFilled ? 'Visualizar' : 'Preencher'}
      </button>
    </div>
  )
}
