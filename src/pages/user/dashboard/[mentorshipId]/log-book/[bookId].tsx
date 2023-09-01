import { X } from 'phosphor-react'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { api } from '../../../../../services/api'
import { Input } from '../../../../../components/Input'
import { Button } from '../../../../../components/Button'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDashboard } from '../../../../../hooks/useDashboard'
import { EventProps } from '../../../../../types/event'
import Link from 'next/link'
import { DashboardLoading } from '../../../../../components/dashboard/DashboardLoading'
import SideBar from '../sideBar'

const schema = z.object({
  meetingAccomplishments: z.string(),
  nextMeetingGoals: z.string(),
})

type formProps = z.infer<typeof schema>

export default function Book() {
  const router = useRouter()
  const { bookId, mentorshipId } = router.query

  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship) => String(mentorship.mentorshipId) === mentorshipId,
  )

  const [event, setEvent] = useState<EventProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentMentorship || !bookId) {
      return
    }

    api
      .get(`/mentorship/${currentMentorship?.programId}/calendar`)
      .then((response) => {
        if (response.status === 200) {
          const events: EventProps[] = response.data
          const eventFound = events.find((event) => String(event.id) === bookId)

          setEvent(eventFound || null)
        }
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [currentMentorship, bookId])

  const { handleSubmit, control } = useForm<formProps>()

  function submitForm({ meetingAccomplishments, nextMeetingGoals }: formProps) {
    api
      .post(`mentorship/event/${event?.id}/logbook`, {
        meetingAccomplishments,
        nextMeetingGoals,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Os dados foram salvos com sucesso!')
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possivel salvar os dados. Tente novamente mais tarde!',
        )
      })
  }

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
