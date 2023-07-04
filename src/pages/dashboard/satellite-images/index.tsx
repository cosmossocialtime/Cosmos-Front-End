import * as Dialog from '@radix-ui/react-dialog'
import ItemSatelite from '../../../components/dashboard/satellite-images/ItemSatelite'
import Image from 'next/image'
import SideBar from '../sideBar'
import ModalSatelite from '../../../components/dashboard/satellite-images/modalSatelite'
import { DatasPlanets } from '../../../data/datasPlanets'
import ModalInstitute from '../../../components/dashboard/satellite-images/modalInstitute'
import useFetch from '../../../hooks/useFetch'

interface User {
  user: {
    id: string
    socialOrganizationId: string
  }
}
interface SateliteInfo {
  name: string
  state?: string
  totalColaborator?: number
}

const SatelitesPage = () => {
  const { data } = useFetch<User>(
    'https://cosmos-social.cyclic.app/api/dashboard',
  )
  const socialOrganizationId = data?.user.socialOrganizationId
  console.log(data)

  const responseSatelite = useFetch<SateliteInfo>(
    `https://cosmos-social.cyclic.app/api/socialOrganization/${2}/satellite`,
  )

  console.log(responseSatelite.data)

  return (
    <div className="flex overflow-x-hidden">
      <SideBar />
      <div className="flex h-screen w-auto flex-col items-center gap-16 bg-bgsatelites bg-cover bg-center px-20 pt-10 lg:overflow-y-auto">
        <h3 className="text-center text-2xl font-semibold text-white">
          Clique sobre a Estrela e os planetas para conhecer mais sobre a
          <br />
          instituição que você irá mentorar
        </h3>
        <div>
          <div className="flex justify-center gap-2 lg:grid lg:grid-cols-12 lg:grid-rows-6">
            {DatasPlanets.map((planet) => {
              if (planet.id === 6) {
                return (
                  <Dialog.Root key={planet.id}>
                    <div className={planet.style}>
                      <ItemSatelite className="h-full w-full">
                        <Image
                          src={planet.imageUrl}
                          width={planet.size}
                          height={planet.size}
                          alt="Images "
                        />
                        <h1>{responseSatelite.data?.name}</h1>
                      </ItemSatelite>
                      <ModalInstitute name={planet.name} />
                    </div>
                  </Dialog.Root>
                )
              }
              return (
                <Dialog.Root key={planet.id}>
                  <div className={planet.style}>
                    <ItemSatelite className="h-full w-full">
                      <Image
                        src={planet.imageUrl}
                        width={planet.size}
                        height={planet.size}
                        alt="Images "
                      />
                      <h1>{planet.name}</h1>
                    </ItemSatelite>

                    <ModalSatelite name={planet.name} />
                  </div>
                </Dialog.Root>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SatelitesPage
