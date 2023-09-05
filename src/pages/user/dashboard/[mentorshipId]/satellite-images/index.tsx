import * as Dialog from '@radix-ui/react-dialog'
import ItemSatelite from '../../../../../components/dashboard/satellite-images/ItemSatelite'
import Image from 'next/image'
import SideBar from '../sideBar'
import ModalSatelite from '../../../../../components/dashboard/satellite-images/modalSatelite'
import { DatasPlanets } from '../../../../../data/datasPlanets'
import ModalInstitute from '../../../../../components/dashboard/satellite-images/modalInstitute'
import useFetch from '../../../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api'

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
interface SectorProps {
  id: string
  ranking?: number
  currentlyWorking?: string
  effectiveness?: string
}

const SatelitesPage = () => {
  const [company, setCompany] = useState<SateliteInfo>()
  const [sectors, setSectors] = useState<SectorProps[]>([])
  const { data } = useFetch<User>(
    'https://api.cosmossocial.com.br/api/dashboard',
  )
  const socialOrganizationId = data?.user.companyId

  useEffect(() => {
    if (socialOrganizationId) {
      api
        .get(`/socialOrganization/${socialOrganizationId}/satellite`)
        .then((response) => {
          setCompany(response.data)
          setSectors(response.data.sectors)
        })
    }
  }, [socialOrganizationId])

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
                (planet) => planet.id === Number(sector.id),
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
