import { useRouter } from 'next/router'
import { ListOfEventsDay } from '../../../../../../../components/dashboard/log-book/ListOfEventsDay'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'
import SideBar from '../sideBar'
import { useQuery } from '@tanstack/react-query'
import { invokeLambda } from '../../../../../../../lib/aws/invokeLambda'
import { EventProps } from '../../../../../../../types/event'
import DashboardLoadingInstitution from '../DashboardLoadingInstitution'

export default function LogBook() {
  const route = useRouter()
  const { mentorshipId } = route.query

  async function getEvents() {
    try {
      const payload = { mentorshipId: Number(mentorshipId || '0') }
      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('mentorship-calendar-select-lambda', payload)
      return JSON.parse(response.body)
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
  if (isError) return <p>Erro ao carregar eventos.</p>
  if (!events || events.length === 0) return <p>Nenhum evento encontrado.</p>

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-200 text-gray-800">
      <DynamicHeader />
      <div className="flex h-[calc(100vh-68px)] overflow-hidden">
        <SideBar />
        <div className="flex flex-1 flex-col overflow-hidden px-6 py-6">
          <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md">
            <div className="overflow-y-auto px-8 py-6">
              <ListOfEventsDay events={events} source="socialOrganization" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
