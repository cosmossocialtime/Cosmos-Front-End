import * as Popover from '@radix-ui/react-popover'
import * as Dialog from '@radix-ui/react-dialog'
import dayjs from 'dayjs'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  DotsThree,
  PencilSimpleLine,
  Trash,
  User,
  X,
} from 'phosphor-react'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'
import { popovers, useCalendar } from '../../../context/CalendarProvider'
import { DeleteConfirmation } from '../../DeleteConfirmation'

export function PopoverEvent() {
  const {
    changePopover,
    changeSelectedEvent,
    selectedEvent,
    getEvents,
    selectDay,
  } = useCalendar()

  if (!selectedEvent) {
    return (
      <Popover.Portal>
        <Popover.Content>
          <h1>Evento não encontrado</h1>
        </Popover.Content>
      </Popover.Portal>
    )
  }

  const { title, description, startAt, endAt, link, attendees } = selectedEvent
  const hourStart = dayjs(startAt).format('HH:mm')
  const hourEnd = dayjs(endAt).format('HH:mm')

  function deleteEvent() {
    api
      .delete(`/mentorship/event/${selectedEvent?.id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Evento deletado com sucesso!')
          changePopover(popovers.Events)
          selectDay(null)
          getEvents()
        }
      })
      .catch((error) => {
        toast.error('Nao foi possível deletar o evento!')
        console.error(error)
      })
  }

  function backPopover() {
    changeSelectedEvent(null)
    changePopover(popovers.Events)
  }

  return (
    <>
      <ArrowLeft
        size={24}
        weight="bold"
        className="absolute cursor-pointer"
        onClick={backPopover}
      />
      <div className="absolute right-4 top-4 flex items-center justify-center gap-3">
        <Popover.Root>
          <Popover.Trigger>
            <DotsThree size={36} className="cursor-pointer" weight="bold" />
          </Popover.Trigger>
          <Popover.Content className="rounded-lg bg-c-blue-900 p-6 ">
            <Popover.Arrow width={15} height={10} fill="#0B1340" />

            <div className="mr-14 flex flex-col items-start gap-7">
              <button
                className="flex cursor-pointer items-center gap-1"
                onClick={() => changePopover(popovers.EventForm)}
              >
                <PencilSimpleLine size={24} />
                <span>Editar</span>
              </button>
              <Dialog.Root>
                <Dialog.Trigger className="flex cursor-pointer items-center gap-1 text-red-400">
                  <Trash size={24} />
                  <span>Excluir</span>
                </Dialog.Trigger>
                <DeleteConfirmation
                  message="Tem certeza de que deseja excluir o evento?"
                  deleteFunc={deleteEvent}
                />
              </Dialog.Root>
            </div>
          </Popover.Content>
        </Popover.Root>

        <Popover.Close>
          <X size={24} weight="bold" />
        </Popover.Close>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className="flex items-center gap-3">
          <Calendar size={24} />
          <span className="font-semibold">
            {dayjs(startAt).format('DD/MM/YYYY')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={24} />
          <span className="font-semibold">
            {hourStart} - {hourEnd}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <User size={24} />
          <span className="font-semibold">
            {attendees.map((attendee) => attendee.byname).join(', ')}
          </span>
        </div>

        <p className="font-semibold">{description}</p>
        <span className="flex items-center gap-3 font-semibold">
          {link}
          <Copy
            size={24}
            onClick={() => {
              navigator.clipboard.writeText(link)
              toast.success('Link copiado para a área de transferência.')
            }}
            className="cursor-pointer"
          />
        </span>
      </div>
      <a
        className="mx-auto mt-10 block max-w-max cursor-pointer rounded-lg border border-solid border-white bg-zinc-50 px-12 py-2 font-semibold text-violet-500 transition-all duration-200 hover:bg-violet-600 hover:text-white"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        Acessar Reunião
      </a>
    </>
  )
}
