import * as Popover from '@radix-ui/react-popover'
import DatePicker from 'react-datepicker'

import { Calendar, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'
import { api } from '../../../services/api'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { InputAttendees } from './InputAttendees'
import { useCalendar } from '../../../context/CalendarProvider'
import { EventProps } from '../../../types/event'

const schema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  link: z.string().nonempty(),
  startTime: z.string().nonempty(),
  endTime: z.string().nonempty(),
  eventAt: z.date(),
  attendees: z.array(
    z.object({
      id: z.number(),
    }),
  ),
})

type formProps = z.infer<typeof schema>

interface MeetingDataProps {
  event: EventProps | null
  currentDay?: Date
}

export default function PopoverCreateEvent({
  event,
  currentDay,
}: MeetingDataProps) {
  const { getEvents, users, currentMentorship, changeVisiblePopover } =
    useCalendar()

  const { control, handleSubmit, register } = useForm<formProps>()
  const mentorshipId = currentMentorship.programId
  const attendeesId = event?.attendees.map((attendee) => ({ id: attendee.id }))

  function submitForm({
    title,
    description,
    link,
    eventAt,
    attendees,
    startTime,
    endTime,
  }: formProps) {
    if (
      title.trim() === '' ||
      description.trim() === '' ||
      link.trim() === '' ||
      startTime.trim() === '' ||
      endTime.trim() === ''
    ) {
      toast.error('Preencha todos os campos!')
      return
    }

    api
      .post(`/mentorship/${mentorshipId}/event`, {
        title,
        description,
        link,
        eventAt,
        attendees,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success('Evento criado com sucesso!')
          changeVisiblePopover(null)
          getEvents()
        }
      })
      .catch((error) => {
        toast.error(
          'Não foi possível marcar a reunião. Tente novamente mais tarde!',
        )
        console.error(error)
      })
  }

  return (
    <Popover.Portal>
      <Popover.Content
        side={'right'}
        className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 px-6 pb-10 pt-14 text-white 2xl:w-[32rem]"
      >
        <Popover.Close className="absolute right-4 top-4">
          <X size={24} />
        </Popover.Close>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(submitForm)}
        >
          <label htmlFor="title" className="absolute h-0 w-0 opacity-0">
            Adicionar Título
          </label>
          <input
            id="title"
            type="text"
            defaultValue={event?.title}
            placeholder="Adicionar título"
            className="w-full rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-1 outline-none placeholder:text-white placeholder:text-white/40 focus:border-white"
            {...register('title')}
          />
          <div className="group flex items-center gap-3 rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-1 focus-within:border-white focus:border-white">
            <Calendar size={24} />
            <Controller
              name="eventAt"
              control={control}
              defaultValue={currentDay || new Date()}
              render={({ field }) => (
                <DatePicker
                  className="outline-none"
                  selected={field.value}
                  onChange={(option) => field.onChange(option)}
                  dateFormat={'dd/MM/yyyy'}
                />
              )}
            />
          </div>

          <div className="flex w-full items-center gap-3">
            <label htmlFor="startTime" className="absolute h-0 w-0 opacity-0">
              Horario de inicio da reunião
            </label>
            <input
              type="time"
              id="startTime"
              defaultValue={'19:00'}
              className="flex-1 rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-1 outline-none focus:border-white"
              {...register('startTime')}
            />

            <span className="font-semibold">até</span>

            <label htmlFor="endTime" className="absolute h-0 w-0 opacity-0">
              Horario de fim da reunião
            </label>
            <input
              type="time"
              id="endTime"
              defaultValue={'21:00'}
              className="flex-1 rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-1 outline-none focus:border-white"
              {...register('endTime')}
            />
          </div>

          <Controller
            name="attendees"
            control={control}
            defaultValue={attendeesId}
            render={({ field }) => (
              <InputAttendees
                users={users}
                attendees={field.value}
                changeAttendees={(attendees) => field.onChange(attendees)}
              />
            )}
          />
          <textarea
            placeholder="Adicionar uma descrição"
            defaultValue={event?.description}
            className="h-20 w-full resize-none rounded-lg border border-solid border-white/40 bg-violet-600/50 px-4 py-2 outline-none placeholder:text-white/40 focus:border-white"
            {...register('description')}
          />

          <label htmlFor="url" className="absolute h-0 w-0 opacity-0">
            Link da reunião
          </label>
          <input
            type="url"
            id="url"
            defaultValue={event?.link}
            placeholder="https://calendar.google.com"
            className="w-full rounded-lg border border-solid border-white/40 bg-violet-600/50 px-4 py-2 outline-none placeholder:text-white/40 focus:border-white"
            pattern="https://.*"
            {...register('link')}
          />

          <button className="mx-auto max-w-max rounded-lg border border-solid border-white bg-white px-20 py-2 font-semibold text-violet-500 transition-all hover:bg-violet-600 hover:text-white">
            Salvar
          </button>
        </form>
      </Popover.Content>
    </Popover.Portal>
  )
}
