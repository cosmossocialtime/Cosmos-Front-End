import * as Popover from '@radix-ui/react-popover'
import DatePicker from 'react-datepicker'

import { Calendar, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { InputAttendees } from './InputAttendees'
import { popovers, useCalendar } from '../../../context/CalendarProvider'
import dayjs from 'dayjs'

import { InputTime } from './InputTime'
import { useEffect, useMemo, useState } from 'react'

import MeetIcon from '../../../assets/meet-icon.svg'
import Image from 'next/image'
import SingleSelectComboBoxSecondary from '../../combobox/SingleSelectComboBoxSecondary'
import { Option } from '../../../types/MultiselectCombobox'
import { getRRuleByDate } from '../../../utils/getRRuleByDate'
import { ButtonTertiary } from '../../Button/ButtonSubmitTertiary'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../../services/api'

const createSchema = (onGoogleMeet: boolean, isRecurrence: boolean) =>
  z
    .object({
      title: z.string().nonempty({ message: 'Campo título é obrigatório.' }),
      description: z.string().optional(),
      link: z.string().optional(),
      startAt: z
        .string()
        .nonempty({ message: 'Campo horário de ínicio é obrigatório.' }),
      endAt: z
        .string()
        .nonempty({ message: 'Campo horário de término é obrigatório.' }),
      eventAt: z.date({ message: 'Data do evento é obrigatória.' }),
      repeatUntil: z.date().optional(),
      attendees: z
        .array(z.number())
        .min(1, { message: 'Selecione pelo menos um participante.' })
        .default([]),
      recurrence: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (!onGoogleMeet && (!data.link || data.link.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'Campo link é obrigatório quando o Google Meet não for usado.',
          path: ['link'],
        })
      }

      if (isRecurrence) {
        if (!data.recurrence) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo Frequência é obrigatório em eventos recorrentes.',
            path: ['recurrence'],
          })
        }
        if (!data.repeatUntil) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo Repetir até é obrigatório em eventos recorrentes.',
            path: ['repeatUntil'],
          })
        } else {
          const start = dayjs(data.eventAt)
          const end = dayjs(data.repeatUntil)
          if (!end.isAfter(start, 'day')) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                'A data final da recorrência deve ser posterior à data do evento.',
              path: ['repeatUntil'],
            })
          }
        }
      }
    })

export function PopoverEventForm() {
  const [onLinkMeet, setOnLinkMeet] = useState(false)
  const [onRepeatEvent, setOnRepeatEvent] = useState(false)
  const [updateRecurrency, setUpdateRecurrency] = useState(false)

  const {
    changePopover,
    currentMentorship,
    getEvents,
    selectDay,
    changeSelectedEvent,
    selectedDay,
    selectedEvent,
    users,
    ownerUser,
  } = useCalendar()

  const schema = useMemo(
    () => createSchema(onLinkMeet, onRepeatEvent),
    [onLinkMeet, onRepeatEvent]
  )

  const {
    control,
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<ReturnType<typeof createSchema>>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const attendeesId = selectedEvent?.attendees.map(
    (attendee) => attendee.userId
  )
  const day = dayjs(selectedDay).toDate()
  const [selectedRecurrence, setSelectedRecurrence] = useState<Option | null>(
    null
  )
  const isRecurring = !!selectedEvent?.recurrenceGroupId
  const isEditing = !!selectedEvent?.id

  const options: Option[] = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quinzenal' },
  ]

  useEffect(() => {
    setOnLinkMeet(isGoogleMeetLink(selectedEvent?.link || ''))
  }, [])

  function isGoogleMeetLink(url: string): boolean {
    try {
      const parsedUrl = new URL(url)

      const isCorrectHost = parsedUrl.hostname === 'meet.google.com'

      return isCorrectHost
    } catch {
      return false
    }
  }
  async function submitForm(data: z.infer<ReturnType<typeof createSchema>>) {
    try {
      const dayEvent = dayjs(data.eventAt).format('MM/DD/YYYY')
      const startHour = dayjs(`${dayEvent} ${data.startAt}`)
      const endHour = dayjs(`${dayEvent} ${data.endAt}`)

      let eventId: string | null = null
      let originalEventId: string | null = null
      let firstEvent = 0

      // Cria dados do evento no GoogleAgenda
      const attendeesEmails = data.attendees
        .map((id) => {
          const user = users.find((a) => a.userId === id)
          return user?.email
        })
        .filter(Boolean)

      attendeesEmails.push(ownerUser.email)
      const startDateTime = dayjs(
        `${dayjs(data.eventAt).format('YYYY-MM-DD')}T${data.startAt}`
      ).toISOString()
      const endDateTime = dayjs(
        `${dayjs(data.eventAt).format('YYYY-MM-DD')}T${data.endAt}`
      ).toISOString()

      const googlePayload: any = {
        eventId: selectedEvent?.eventId,
        summary: data.title,
        description: data.description,
        useGoogleMeet: onLinkMeet,
        externalLink: onLinkMeet ? '' : data.link,
        startDateTime,
        endDateTime,
        attendeesEmails,
      }

      let functionUrl = ''
      if (onRepeatEvent || isRecurring) {
        const rrule = getRRuleByDate(
          data.eventAt,
          selectedRecurrence?.value || '',
          onRepeatEvent
            ? data.repeatUntil || new Date()
            : selectedEvent?.repeatUntil || new Date()
        )
        googlePayload.rrule = rrule
        googlePayload.updateRecurrenceEvents = updateRecurrency ? 1 : 0
        if (isEditing) {
          googlePayload.oldRRuleUntil = getRRuleByDate(
            selectedEvent?.startAt,
            selectedEvent?.recurrenceType || '',
            dayjs(selectedEvent?.startAt).subtract(1, 'day').toDate()
          )
          googlePayload.originalEventId = selectedEvent?.originalEventId
          googlePayload.originalInstanceStartDateTime = dayjs(
            dayjs(selectedEvent?.startAt)
          ).toISOString()
        }
        functionUrl = '/mentorship/event/google-calendar/recurring'
      } else {
        functionUrl = '/mentorship/event/google-calendar'
      }
      try {
        const googleRes = await api.patch(functionUrl, googlePayload)

        if (googleRes.status !== 200) {
          toast.error('Erro ao criar evento no Google Calendar')
          return
        }
        const googleData = googleRes.data
        data.link = onLinkMeet ? googleData.hangoutLink : data.link
        eventId = googleData.eventId
        originalEventId = googleData.originalEventId
        firstEvent = googleData.firstEvent
      } catch (error) {
        console.error(error)
        toast.error('Erro ao criar evento no Google Calendar')
        return
      }

      // Cria dados do evento na base de dados da aplicação
      const payload: any = {
        id: selectedEvent?.id,
        mentorshipId: currentMentorship.mentorshipId,
        title: data.title,
        description: data.description,
        link: data.link,
        attendees:
          data.attendees &&
          data.attendees.map((at) => {
            return {
              userId: at,
            }
          }),
        startAt: dayjs(startHour).format('YYYY-MM-DD HH:mm'),
        endAt: dayjs(endHour).format('YYYY-MM-DD HH:mm'),
        recurrenceGroupId: selectedEvent?.recurrenceGroupId,
        eventId: eventId,
        originalEventId: originalEventId,
        firstEvent: firstEvent,
        updateRecurrenceEvents: updateRecurrency ? 1 : 0,
        recurrenceType: isEditing
          ? selectedEvent?.recurrenceType
          : selectedRecurrence?.value,
        repeatUntil: onRepeatEvent
          ? dayjs(data.repeatUntil).format('YYYY-MM-DD')
          : isRecurring
          ? dayjs(selectedEvent?.repeatUntil).format('YYYY-MM-DD')
          : null,
      }

      const response = await api.patch('/mentorship/event', payload)

      if (response.status == 201) {
        toast.success('Evento salvo')
        changePopover(popovers.Event)
        selectDay(null)
        changeSelectedEvent(null)
        getEvents()
      } else {
        toast.error('Erro ao salvar as informações!')
      }
    } catch (error) {
      toast.error('Erro ao salvar as informações!')
      throw error
    }
  }

  return (
    <>
      <Popover.Close className="absolute right-4 top-4">
        <X size={24} />
      </Popover.Close>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(submitForm)}
        noValidate
      >
        <label htmlFor="title" className="absolute h-0 w-0 opacity-0">
          Adicionar Título
        </label>
        <div>
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
          {errors.title && (
            <p className="mt-1 text-sm text-white">{errors.title.message}</p>
          )}
        </div>
        <div>
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
          {errors.eventAt && (
            <p className="mt-1 text-sm text-white">{errors.eventAt.message}</p>
          )}
        </div>

        <div className="flex w-full items-center gap-3">
          <label htmlFor="startTime" className="absolute h-0 w-0 opacity-0">
            Horário de início da reunião
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
            Horário de fim da reunião
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
          {errors.startAt && (
            <p className="mt-1 text-sm text-white">{errors.startAt.message}</p>
          )}
          {errors.endAt && (
            <p className="mt-1 text-sm text-white">{errors.endAt.message}</p>
          )}
        </div>
        {!isEditing && (
          <>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                data-meet={onRepeatEvent}
                className="group relative flex h-6 w-12 items-center rounded-full border border-solid border-gray-300 data-[meet=true]:border-blue-500 data-[meet=true]:bg-blue-500"
                onClick={() => setOnRepeatEvent(!onRepeatEvent)}
              >
                <div className=" absolute left-0 m-1 h-4 w-4 rounded-full bg-gray-500 transition-all group-data-[meet=true]:left-6 group-data-[meet=true]:bg-white" />
              </button>
              <span>Repetir agenda?</span>
            </div>
            {onRepeatEvent && (
              <>
                <div>
                  <SingleSelectComboBoxSecondary
                    instanceId="recurrence"
                    options={options}
                    label="Frequência"
                    onChange={(option) => {
                      setSelectedRecurrence(option)
                      setValue('recurrence', option?.value)
                    }}
                    value={selectedRecurrence}
                  />
                  {errors.recurrence && (
                    <p className="mt-1 text-sm text-white">
                      {errors.recurrence.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <label htmlFor="repeatUntil" className="font-semibold">
                      Repetir até
                    </label>
                    <div className="group flex items-center gap-3 rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-1 focus-within:border-white focus:border-white">
                      <Calendar size={24} />
                      <Controller
                        name="repeatUntil"
                        control={control}
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
                  </div>
                  {errors.repeatUntil && (
                    <p className="mt-1 text-sm text-white">
                      {errors.repeatUntil.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {isRecurring && (
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              data-meet={updateRecurrency}
              className="group relative flex h-6 w-12 items-center rounded-full border border-solid border-gray-300 data-[meet=true]:border-blue-500 data-[meet=true]:bg-blue-500"
              onClick={() => setUpdateRecurrency(!updateRecurrency)}
            >
              <div className=" absolute left-0 m-1 h-4 w-4 rounded-full bg-gray-500 transition-all group-data-[meet=true]:left-6 group-data-[meet=true]:bg-white" />
            </button>
            <span>Atualizar eventos futuros da série?</span>
          </div>
        )}
        <div>
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
          {errors.attendees && (
            <p className="mt-1 text-sm text-white">
              {errors.attendees.message}
            </p>
          )}
        </div>
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
          <div>
            <input
              type="url"
              id="url"
              defaultValue={selectedEvent?.link}
              placeholder="Adicionar link para videochamada"
              className="w-full rounded-lg border border-solid border-white/40 bg-violet-600/50 px-4 py-2 outline-none placeholder:text-white/40 focus:border-white"
              required
              disabled={onLinkMeet}
              pattern="https?://.*"
              {...register('link')}
            />
            {errors.link && (
              <p className="mt-1 text-sm text-white">{errors.link.message}</p>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              data-meet={onLinkMeet}
              className="group relative flex h-6 w-12 items-center rounded-full border border-solid border-gray-300 data-[meet=true]:border-blue-500 data-[meet=true]:bg-blue-500"
              onClick={() => {
                setOnLinkMeet((prev) => {
                  const updated = !prev
                  if (updated) clearErrors('link')
                  return updated
                })
              }}
            >
              <div className=" absolute left-0 m-1 h-4 w-4 rounded-full bg-gray-500 transition-all group-data-[meet=true]:left-6 group-data-[meet=true]:bg-white" />
            </button>
            <Image src={MeetIcon} alt="Logo do google meet" height={20} />
            <span>Usar o Google Meet</span>
          </div>
        </div>

        <ButtonTertiary disabled={isSubmitting} text="Salvar" type="submit" />
      </form>
    </>
  )
}
