import { useRouter } from 'next/router'
import { ListOfEventsDay } from '../../../../../components/dashboard/log-book/ListOfEventsDay'
import SideBar from '../sideBar'
import { useQuery } from '@tanstack/react-query'
import { EventProps } from '../../../../../types/event'
import { DashboardLoading } from '../../../../../components/dashboard/DashboardLoading'
import { api } from '../../../../../services/api'

export default function LogBook() {
  const route = useRouter()
  const { mentorshipId } = route.query

  async function getEvents() {
    try {
      const payload = { mentorshipId: Number(mentorshipId || '0') }
      const response = await api.get('mentorship-calendar-select', {
        params: payload,
      })
      return JSON.parse(response.data.body)
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

  if (isLoading) return <DashboardLoading />
  if (isError) return <p>Erro ao carregar eventos.</p>
  if (!events || events.length === 0) return <p>Nenhum evento encontrado.</p>

  return (
    <div className="max-w-screen flex h-screen overflow-hidden">
      <SideBar />

      <ListOfEventsDay events={events} source="volunteer" />
    </div>
  )
}
