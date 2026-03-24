import { ArrowLeft } from 'phosphor-react'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { Input } from '../../../../../../../components/Input'
import Router, { useRouter } from 'next/router'
import { EventProps } from '../../../../../../../types/event'
import Link from 'next/link'
import SideBar from '../sideBar'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../../../../../../components/Button/ButtonSubmit'
import { queryClient } from '../../../../../../../services/queryClient'
import DashboardLoadingInstitution from '../DashboardLoadingInstitution'
import { api } from '../../../../../../../services/api'

const schema = z.object({
  meetingAccomplishments: z.string(),
  nextMeetingGoals: z.string(),
})

type formProps = z.infer<typeof schema>

export default function Book() {
  const router = useRouter()
  const { bookId, mentorshipId, socialOrganizationId } = router.query

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
        Router.push(
          `/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/log-book`
        )
      } else {
        toast.error('Erro ao salvar informações!')
      }
    } catch (error) {
      toast.error('Erro ao salvar informações!')
    }
  }

  if (isLoading) {
    return <DashboardLoadingInstitution />
  }

  const event = events?.find((event: EventProps) => String(event.id) === bookId)

  if (!event) {
    return (
      <div className="min-h-screen overflow-y-auto bg-gray-200 text-gray-800">
        <DynamicHeader />
        <div className="flex h-[calc(100vh-68px)] overflow-hidden">
          <SideBar />
          <div className="flex h-screen flex-1 items-center justify-center overflow-y-auto">
            <h1>Evento não encontrado!</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-200 text-gray-800">
      <DynamicHeader />
      <div className="flex h-[calc(100vh-68px)] overflow-hidden">
        <SideBar />
        <div className="flex flex-1 flex-col overflow-hidden px-6 py-6">
          <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md">
            <div className="overflow-y-auto px-6 py-6">
              <header className="flex flex min-h-[7rem] flex-col px-6">
                <div className="py-6">
                  <Link
                    href={`/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/log-book`}
                  >
                    <ArrowLeft size={24} className="cursor-pointer" />
                  </Link>
                </div>
                <div className="py-2">
                  <span className="text-base text-gray-500">
                    {dayjs(event.startAt).format('DD/MM/YYYY')}
                  </span>
                  <h1 className="max-w-[20ch] truncate text-[2.5rem] font-semibold leading-[120%] text-gray-600">
                    {event.title}
                  </h1>
                </div>
              </header>

              <form
                onSubmit={handleSubmit(submitForm)}
                className="flex flex-1 flex-col gap-10 px-6 py-6"
              >
                <label
                  htmlFor=""
                  className="w-full flex-1 text-base text-gray-600"
                >
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
                        placeholder="Digite aqui"
                      />
                    )}
                  />
                </label>

                <label
                  htmlFor=""
                  className="w-full flex-1 text-base text-gray-600"
                >
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
                        placeholder="Digite aqui"
                      />
                    )}
                  />
                </label>
                <div className="w-[250px]">
                  <Button text="Salvar informações" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
