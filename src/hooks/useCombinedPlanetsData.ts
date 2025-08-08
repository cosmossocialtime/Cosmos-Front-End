import { useEffect, useState } from 'react'
import { SocialOrganizationProps } from '../types/socialOrganization'
import { PlanetItemProps } from '../components/instituition/painel/solarSystem/planetItem'
import { Option } from '../types/MultiselectCombobox'
import { SectorProps } from '../types/sector'

export function useCombinedPlanetsData(
  sectors: Option[] | undefined,
  socialOrganization: SocialOrganizationProps | null
) {
  const [leftPlanets, setLeftPlanets] = useState<(PlanetItemProps | null)[]>([])
  const [rightPlanets, setRightPlanets] = useState<(PlanetItemProps | null)[]>(
    []
  )

  useEffect(() => {
    if (!sectors || !socialOrganization) return

    // Configuração base dos planetas
    const baseLeftPlanets: (PlanetItemProps | null)[] = [
      {
        imageSrc: '/images/satelites/recursos.png',
        name: 'Captação de recursos',
        id: 7,
      },
      null,
      {
        imageSrc: '/images/satelites/financas.png',
        name: 'Finanças',
        id: 2,
      },
      null,
      {
        imageSrc: '/images/satelites/marketing.png',
        name: 'Marketing',
        id: 3,
      },
      null,
      {
        imageSrc: '/images/satelites/projetos.png',
        name: 'Gestão de projetos',
        id: 5,
      },
      null,
      {
        imageSrc: '/images/satelites/sustentabilidade.png',
        name: 'Sustentabilidade',
        id: 6,
      },
    ]

    const baseRightPlanets: (PlanetItemProps | null)[] = [
      {
        imageSrc: '/images/satelites/pessoas.png',
        name: 'Gestão de Pessoas',
        id: 1,
      },
      null,
      {
        imageSrc: '/images/satelites/juridico.png',
        name: 'Jurídico',
        id: 4,
      },
      null,
      {
        imageSrc: '/images/satelites/impacto.png',
        name: 'Avaliação de Impacto',
        id: 9,
      },
      null,
      {
        imageSrc: '/images/satelites/estrategia.png',
        name: 'Estratégia',
        id: 8,
      },
      null,
      {
        imageSrc: '/images/satelites/lideranca.png',
        name: 'Liderança',
        id: 10,
      },
    ]

    // Função para enriquecer os dados dos planetas
    const enrichPlanetData = (planet: PlanetItemProps | null) => {
      if (!planet) return null

      const sectorData = sectors.find((s) => Number(s.value) === planet.id)
      const organizationData = socialOrganization.sectors?.find(
        (s: SectorProps) => s.sectorId === planet.id
      )

      return {
        ...planet,
        title: planet.name,
        sectorData,
        organizationData,
        socialOrganizationId: socialOrganization.id,
        isFilled: organizationData !== undefined,
      }
    }

    setLeftPlanets(baseLeftPlanets.map(enrichPlanetData))
    setRightPlanets(baseRightPlanets.map(enrichPlanetData))
  }, [sectors, socialOrganization])

  return { leftPlanets, rightPlanets }
}
