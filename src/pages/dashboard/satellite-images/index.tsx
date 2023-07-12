import * as Dialog from '@radix-ui/react-dialog'
import ItemSatelite from '../../../components/dashboard/satellite-images/ItemSatelite'
import Image from 'next/image'
import SideBar from '../sideBar'
import ModalSatelite from '../../../components/dashboard/satellite-images/modalSatelite'
import { DatasPlanets } from '../../../data/datasPlanets'
import ModalInstitute from '../../../components/dashboard/satellite-images/modalInstitute'
import useFetch from '../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api'

interface User {
  user: {
    id: string
    companyId: number
  }
}
interface SateliteInfo {
  name: string
  state?: string
  totalColaborator?: number
}
interface SectorProps {
  sectors: [
    {
      ranking?: number
      currentlyWorking?: string
      effectiveness?: string
    },
  ]
}

const SatelitesPage = () => {
  const [company, setCompany] = useState<SateliteInfo>()
  const [sectors, setSectors] = useState<SectorProps>()
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

  console.log(sectors)

  return (
    <div className="flex overflow-x-hidden">
      <SideBar />
      <div className="flex h-screen w-full flex-col items-center gap-16 bg-bgsatelites bg-cover bg-center px-20 pt-10 lg:overflow-y-auto">
        <h3 className="text-center text-2xl font-semibold text-white">
          Clique sobre a Estrela e os planetas para conhecer mais sobre a
          <br />
          instituição que você irá mentorar
        </h3>
        <div className="flex w-full justify-around">
          <div className="flex items-end">
            <Dialog.Root>
              <ItemSatelite className="h-32 w-32">
                <h1>Teste</h1>
                <ModalSatelite />
              </ItemSatelite>
            </Dialog.Root>
          </div>
          <div>
            <Dialog.Root>
              <ItemSatelite>
                <h1>Teste</h1>
                <ModalSatelite name="teste" />
              </ItemSatelite>
            </Dialog.Root>
          </div>
          <div>
            <Dialog.Root>
              <ItemSatelite>
                <h1>Teste</h1>
                <ModalSatelite name="teste" />
              </ItemSatelite>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SatelitesPage
