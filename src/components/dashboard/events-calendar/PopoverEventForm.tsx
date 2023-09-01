import * as Popover from '@radix-ui/react-popover'
import DatePicker from 'react-datepicker'

import { Calendar, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'
import { api } from '../../../services/api'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { InputAttendees } from './InputAttendees'
import { popovers, useCalendar } from '../../../context/CalendarProvider'
import dayjs from 'dayjs'
import { InputTime } from './InputTime'
import { useState } from 'react'

import MeetIcon from '../../../assets/meet-icon.svg'
import Image from 'next/image'

const schema = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  link: z.string().nonempty(),
  startAt: z.string().nonempty(),
  endAt: z.string().nonempty(),
  eventAt: z.date(),
  attendees: z.array(z.number()),
})

type formProps = z.infer<typeof schema>

export function PopoverEventForm() {
  const [onLinkMeet, setOnLinkMeet] = useState(false)

  const {
    changePopover,
    currentMentorship,
    getEvents,
    selectDay,
    selectedDay,
    selectedEvent,
  } = useCalendar()

  const { control, handleSubmit, register } = useForm<formProps>()
  const attendeesId = selectedEvent?.attendees.map(
    (attendee) => attendee.userId,
  )
  const day = dayjs(selectedDay).toDate()

  function createEvent({
    title,
    description,
    link,
    attendees,
    eventAt,
    startAt,
    endAt,
  }: formProps) {
    const dayEvent = dayjs(eventAt).format('MM/DD/YYYY')
    const startHour = dayjs(`${dayEvent} ${startAt}`)
    const endHour = dayjs(`${dayEvent} ${endAt}`)
    api
      .post(`/mentorship/${currentMentorship.programId}/event`, {
        title,
        description,
        link,
        attendees,
        startAt: startHour,
        endAt: endHour,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success('Evento criado com sucesso!')
          changePopover(popovers.Event)
          selectDay(null)
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

  function updateEvent({
    title,
    description,
    link,
    attendees,
    eventAt,
    startAt,
    endAt,
  }: formProps) {
    const dayEvent = dayjs(eventAt).format('MM/DD/YYYY')
    const startHour = dayjs(`${dayEvent} ${startAt}`)
    const endHour = dayjs(`${dayEvent} ${endAt}`)

    api
      .patch(`/mentorship/event/${selectedEvent?.id}`, {
        title,
        description,
        link,
        attendees,
        startAt: startHour,
        endAt: endHour,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Evento Editado com sucesso!')
          changePopover(popovers.Event)
          selectDay(null)
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

  function submitForm(data: formProps) {
    if (event) {
      updateEvent(data)
    } else {
      createEvent(data)
    }
  }

  return (
    <>
      <Popover.Close className="absolute right-4 top-4">
        <X size={24} />
      </Popover.Close>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="title" className="absolute h-0 w-0 opacity-0">
          Adicionar Título
        </label>
        <input
          id="title"
          type="text"
          defaultValue={selectedEvent?.title}
          placeholder="Adicionar título"
          required
          maxLength={60}
          className="w-full rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-1 outline-none placeholder:text-white placeholder:text-white/40 focus:border-white"
          {...register('title')}
        />
        <div className="group flex items-center gap-3 rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-1 focus-within:border-white focus:border-white">
          <Calendar size={24} />
          <Controller
            name="eventAt"
            control={control}
            defaultValue={day}
            render={({ field }) => (
              <DatePicker
                required
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
          <Controller
            name="startAt"
            control={control}
            defaultValue={
              selectedEvent
                ? dayjs(selectedEvent.startAt).format('HH:mm')
                : '19:00'
            }
            render={({ field }) => (
              <InputTime time={field.value} changeTime={field.onChange} />
            )}
          />

          <span className="font-semibold">até</span>

          <label htmlFor="endTime" className="absolute h-0 w-0 opacity-0">
            Horario de fim da reunião
          </label>
          <Controller
            name="endAt"
            control={control}
            defaultValue={
              selectedEvent
                ? dayjs(selectedEvent.endAt).format('HH:mm')
                : '20:00'
            }
            render={({ field }) => (
              <InputTime time={field.value} changeTime={field.onChange} />
            )}
          />
        </div>

        <Controller
          name="attendees"
          control={control}
          defaultValue={attendeesId}
          render={({ field }) => (
            <InputAttendees
              attendeesId={field.value}
              changeAttendeesId={(attendees) => field.onChange(attendees)}
            />
          )}
        />
        <textarea
          placeholder="Adicionar uma descrição"
          defaultValue={selectedEvent?.description}
          className="h-20 w-full resize-none rounded-lg border border-solid border-white/40 bg-violet-600/50 px-4 py-2 outline-none placeholder:text-white/40 focus:border-white"
          {...register('description')}
        />

        <label htmlFor="url" className="absolute h-0 w-0 opacity-0">
          Link da reunião
        </label>
        <div>
          <input
            type="url"
            id="url"
            defaultValue={selectedEvent?.link}
            placeholder="Adicionar link para videochamada"
            className="w-full rounded-lg border border-solid border-white/40 bg-violet-600/50 px-4 py-2 outline-none placeholder:text-white/40 focus:border-white"
            required
            disabled={onLinkMeet}
            pattern="https://.*"
            {...register('link')}
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              data-meet={onLinkMeet}
              className="group relative flex h-6 w-12 items-center rounded-full border border-solid border-gray-300 data-[meet=true]:border-blue-500 data-[meet=true]:bg-blue-500"
              onClick={() => setOnLinkMeet(!onLinkMeet)}
            >
              <div className=" absolute left-0 m-1 h-4 w-4 rounded-full bg-gray-500 transition-all group-data-[meet=true]:left-6 group-data-[meet=true]:bg-white" />
            </button>
            <Image src={MeetIcon} alt="Logo do google meet" height={20} />
            <span>Usar o Google Meet</span>
          </div>
        </div>

        <button className="mx-auto mt-4 max-w-max rounded-lg border border-solid border-white bg-white px-20 py-2 font-semibold text-violet-500 transition-all hover:bg-violet-600 hover:text-white">
          Salvar
        </button>
      </form>
    </>
  )
}
