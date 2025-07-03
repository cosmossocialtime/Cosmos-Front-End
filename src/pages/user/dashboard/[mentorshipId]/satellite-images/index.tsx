import * as Dialog from '@radix-ui/react-dialog'
import ItemSatelite from '../../../../../components/dashboard/satellite-images/ItemSatelite'
import Image from 'next/image'
import SideBar from '../sideBar'
import ModalSatelite from '../../../../../components/dashboard/satellite-images/modalSatelite'
import { DatasPlanets } from '../../../../../data/datasPlanets'
import ModalInstitute from '../../../../../components/dashboard/satellite-images/modalInstitute'
import { useEffect, useMemo, useState } from 'react'
import { useDashboard } from '../../../../../hooks/useDashboard'
import { MentorshipProps } from '../../../../../types/mentorship'
import { SectorProps } from '../../../../../types/sector'
import { useRouter } from 'next/router'
import { invokeLambda } from '../../../../../lib/aws/invokeLambda'
import dayjs from 'dayjs'
import { Option } from '../../../../../types/MultiselectCombobox'
import axios from 'axios'
import { SocialOrganizationProps } from '../../../../../types/socialOrganization'

interface User {
  user: {
    id: string
    companyId: number
  }
}
interface SateliteInfo {
  name?: string
  creationDate?: string
  totalCollaborators?: number
  beneficiaries?: string
  annualRevenue?: number
  city?: string
  mainChallenges?: string
  socialImpact?: string
  history?: string
  causes?: [string]
  state?: string
}
interface cityProps {
  id: number
  nome: string
}
interface stateProps extends cityProps {
  sigla: string
}

const SatelitesPage = () => {
  const [company, setCompany] = useState<SateliteInfo>()
  const [sectors, setSectors] = useState<SectorProps[]>([])
  const { dashboard } = useDashboard(null)
  const router = useRouter()
  const mentorshipId = useMemo(
    () => String(router.query.mentorshipId || ''),
    [router.query.mentorshipId]
  )

  async function findCity(
    socialOrganization: SocialOrganizationProps
  ): Promise<string | undefined> {
    try {
      const { data: estados } = await axios.get<stateProps[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      )

      const estadoEncontrado = estados.find(
        (e) => e.sigla === String(socialOrganization.state)
      )

      if (!estadoEncontrado || !socialOrganization.city) return

      const { data: cidades } = await axios.get<cityProps[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoEncontrado.id}/municipios`
      )

      const cidadeEncontrado = cidades.find(
        (c) => c.id === Number(socialOrganization.city)
      )

      return cidadeEncontrado?.nome
    } catch (err) {
      console.error('Erro ao buscar cidade:', err)
      return
    }
  }

  useEffect(() => {
    async function loadData() {
      if (!mentorshipId || !dashboard) return

      const currentMentorship = dashboard.currentMentorships.find(
        (mentorship: MentorshipProps) =>
          String(mentorship.mentorshipId) === mentorshipId
      )

      if (!currentMentorship) return

      const payload = {
        socialOrganizationId: currentMentorship.socialOrganizationId,
      }

      try {
        const response = await invokeLambda<
          typeof payload,
          { statusCode: number; body: string }
        >('social-organization-select-lambda', payload)

        if (response.statusCode === 200) {
          const parsed = JSON.parse(response.body).socialOrganization
          const cidade = await findCity(parsed)

          setCompany({
            name: parsed.name,
            creationDate: parsed.creationDate
              ? dayjs(parsed.creationDate).format('DD/MM/YYYY')
              : undefined,
            totalCollaborators: parsed.collaborators,
            beneficiaries: parsed.beneficiaries,
            annualRevenue: parsed.annualRevenue,
            city: cidade,
            mainChallenges: parsed.mainChallenges,
            socialImpact: parsed.socialImpact,
            history: parsed.history,
            causes: parsed.causes && parsed.causes.map((c: Option) => c.label),
            state: parsed.state,
          })

          setSectors(parsed.sectors)
        }
      } catch (err) {
        console.error('Erro ao buscar dados da organização:', err)
      }
    }

    loadData()
  }, [mentorshipId, dashboard])

  return (
    <div className="flex overflow-x-hidden">
      <SideBar />
      <div className="flex h-screen w-full flex-col items-center gap-16 bg-bgsatelites bg-cover bg-center  pt-10 lg:overflow-y-auto">
        <h3 className="text-center text-2xl font-semibold text-white">
          Clique sobre a Estrela e os planetas para conhecer mais sobre a
          <br />
          instituição que você irá mentorar
        </h3>
        <div className="flex justify-center gap-2 lg:grid lg:grid-cols-12 lg:grid-rows-6">
          {sectors &&
            sectors.map((sector) => {
              const planets = DatasPlanets.find(
                (planet) => planet.id === Number(sector.sectorId)
              )

              return (
                <Dialog.Root key={sector.id}>
                  <div className={planets?.style}>
                    <ItemSatelite className="h-full w-full">
                      <Image
                        src={planets ? planets.imageUrl : ''}
                        width={planets?.size}
                        height={planets?.size}
                        alt="Images "
                      />
                      <h1>{planets?.name}</h1>
                    </ItemSatelite>
                    <ModalSatelite
                      name={planets?.name}
                      effectiveness={sector.effectiveness}
                      ranking={sector.ranking}
                      currentlyWorking={sector.currentlyWorking}
                    />
                  </div>
                </Dialog.Root>
              )
            })}
          <Dialog.Root>
            <div className="Intituto">
              <ItemSatelite className="h-full w-full">
                <Image
                  src="/images/satelites/instituto.png"
                  width={200}
                  height={200}
                  alt="Images "
                />
                <h1>{company ? company.name : ''}</h1>
              </ItemSatelite>

              <ModalInstitute
                name={company?.name}
                totalCollaborators={company?.totalCollaborators}
                annualRevenue={company?.annualRevenue}
                beneficiaries={company?.beneficiaries}
                city={company?.city}
                creationDate={company?.creationDate}
                history={company?.history}
                mainChallenges={company?.mainChallenges}
                socialImpact={company?.socialImpact}
                state={company?.state}
                causes={company?.causes}
              />
            </div>
          </Dialog.Root>
        </div>
      </div>
    </div>
  )
}

export default SatelitesPage
