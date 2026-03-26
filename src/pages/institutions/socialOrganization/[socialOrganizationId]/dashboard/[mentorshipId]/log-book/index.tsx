import { useRouter } from 'next/router'
import { ListOfEventsDay } from '../../../../../../../components/dashboard/log-book/ListOfEventsDay'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'
import SideBar from '../sideBar'
import { useQuery } from '@tanstack/react-query'
import { EventProps } from '../../../../../../../types/event'
import DashboardLoadingInstitution from '../DashboardLoadingInstitution'
import StarFour from '../../../../../../../assets/star-four.svg'
import Image from 'next/image'
import { api } from '../../../../../../../services/api'

export default function LogBook() {
  const route = useRouter()
  const { mentorshipId } = route.query
  const { socialOrganizationId } = route.query

  async function getEvents() {
    try {
      const payload = { mentorshipId: Number(mentorshipId || '0') }
      const response = await api.get('/mentorship/calendar', {
        params: payload,
      })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar eventos!')
      throw error
    }
  }

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery<EventProps[]>({
    queryKey: ['events', mentorshipId],
    queryFn: getEvents,
    enabled: !!mentorshipId,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  })

  if (isLoading) return <DashboardLoadingInstitution />

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-200 text-gray-800">
      <DynamicHeader />
      <div className="flex h-[calc(100vh-68px)] overflow-hidden">
        <SideBar />
        <div className="flex flex-1 flex-col overflow-hidden px-6 py-6">
          {events && events.length > 0 ? (
            <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md">
              <div className="overflow-y-auto px-8 py-6">
                <ListOfEventsDay events={events} source="socialOrganization" />
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-200 text-center">
              <div className="mb-12">
                <Image
                  src={StarFour}
                  alt="Estrela de quatro pontas"
                  className="h-20"
                />
              </div>
              <h2 className="mb-2 text-xl font-medium text-gray-500">
                Ainda não há diários de bordo disponíveis
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-base text-gray-500">
                Os diários de bordo aparecerão aqui após sua equipe marcar um
                encontro com a tripulação.
              </p>
              <p className="mx-auto mb-12 max-w-xl text-base text-gray-500">
                Você pode usar o Calendário de Eventos para marcar encontros com
                a equipe ou esperar que a pessoa responsável marque os
                encontros!
              </p>
              <button
                className="h-[48px] w-[221px] rounded-md border border-solid border-gray-300 bg-white px-6 py-3 font-semibold text-blue-400 transition-colors hover:bg-blue-50"
                onClick={() =>
                  route.push(
                    `/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/events-calendar`
                  )
                }
              >
                Marcar um encontro
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
