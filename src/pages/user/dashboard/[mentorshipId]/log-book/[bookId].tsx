import { X } from 'phosphor-react'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { Input } from '../../../../../components/Input'
import { Button } from '../../../../../components/Button'
import Router, { useRouter } from 'next/router'
import { EventProps } from '../../../../../types/event'
import Link from 'next/link'
import { DashboardLoading } from '../../../../../components/dashboard/DashboardLoading'
import SideBar from '../sideBar'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../../../../../services/queryClient'
import { api } from '../../../../../services/api'

const schema = z.object({
  meetingAccomplishments: z.string(),
  nextMeetingGoals: z.string(),
})

type formProps = z.infer<typeof schema>

export default function Book() {
  const router = useRouter()
  const { bookId, mentorshipId } = router.query

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
  })

  const { handleSubmit, control } = useForm<formProps>()

  async function submitForm({
    meetingAccomplishments,
    nextMeetingGoals,
  }: formProps) {
    try {
      const payload = {
        bookId: bookId,
        meetingAccomplishments: meetingAccomplishments,
        nextMeetingGoals: nextMeetingGoals,
      }

      const response = await api.patch(
        'mentorship-event-logbook-upsert',
        payload
      )
      if (response.data.statusCode == 201) {
        queryClient.invalidateQueries(['events', mentorshipId])
        toast.success('Informações salvas com sucesso!')
        Router.push(`/user/dashboard/${mentorshipId}/log-book`)
      } else {
        toast.error('Erro ao salvar informações!')
      }
    } catch (error) {
      toast.error('Erro ao salvar informações!')
    }
  }

  if (isLoading) {
    return <DashboardLoading />
  }

  const event = events?.find((event: EventProps) => String(event.id) === bookId)

  if (isLoading) {
    return <DashboardLoading />
  }

  if (!event) {
    return (
      <div className="max-w-screen flex h-screen overflow-hidden">
        <SideBar />
        <div className="flex h-screen flex-1 items-center justify-center overflow-y-auto">
          <h1>Evento não encontrado!</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-screen flex h-screen overflow-hidden">
      <SideBar />

      <div className="flex h-screen flex-1 flex-col overflow-y-auto">
        <header className="flex min-h-[7rem] items-center justify-between px-20 shadow-lg">
          <div>
            <span className="text-lg text-gray-500">
              {dayjs(event.startAt).format('DD/MM/YYYY')}
            </span>
            <h1 className="max-w-[20ch] truncate text-[2.5rem] font-semibold leading-[120%] text-gray-600">
              {event.title}
            </h1>
          </div>
          <Link href={`/user/dashboard/${mentorshipId}/log-book`}>
            <X size={24} className="cursor-pointer" />
          </Link>
        </header>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-1 flex-col items-center gap-10 px-36 py-8"
        >
          <label htmlFor="" className="w-full flex-1 text-lg text-gray-600">
            O que foi feito neste encontro?
            <Controller
              name="meetingAccomplishments"
              control={control}
              defaultValue={event.logbook?.meetingAccomplishments}
              render={({ field }) => (
                <Input.TextArea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-4 h-40"
                />
              )}
            />
          </label>

          <label htmlFor="" className="w-full flex-1 text-lg text-gray-600">
            O que foi definido para o próximo encontro?
            <Controller
              name="nextMeetingGoals"
              control={control}
              defaultValue={event.logbook?.nextMeetingGoals}
              render={({ field }) => (
                <Input.TextArea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-4 h-40"
                />
              )}
            />
          </label>
          <Button.Primary className="max-w-max px-40 py-3">
            Salvar
          </Button.Primary>
        </form>
      </div>
    </div>
  )
}
