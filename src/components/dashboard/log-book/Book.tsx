import { X } from 'phosphor-react'
import dayjs from 'dayjs'
import { useLogBook } from '../../../context/LogBookProvider'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const schema = z.object({
  meetingAccomplishments: z.string(),
  nextMeetingGoals: z.string(),
})

type formProps = z.infer<typeof schema>

export function Book() {
  const { selectedEvent, changeSelectedEvent } = useLogBook()
  const { handleSubmit, control } = useForm<formProps>()

  if (!selectedEvent) {
    return <h1>Error! Evento nao encontrado</h1>
  }

  const { event, index } = selectedEvent

  function submitForm(data: formProps) {
    api
      .post(`mentorship/event/${event.id}/logbook`)
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

  return (
    <div className="flex h-full flex-1 flex-col">
      <header className="flex min-h-[7rem] items-center justify-between px-20 shadow-lg">
        <div>
          <span className="text-lg text-gray-500">
            {dayjs(event.startAt).format('DD/MM/YYYY')}
          </span>
          <h1 className="max-w-[20ch] truncate text-[2.5rem] font-semibold leading-[120%] text-gray-600">
            Encontro {index}
          </h1>
        </div>
        <X
          size={24}
          onClick={() => changeSelectedEvent(null)}
          className="cursor-pointer"
        />
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
            defaultValue=""
            render={({ field }) => (
              <Input.TextArea
                value={field.value}
                onChange={field.onChange}
                className="mt-4 h-[7rem]"
              />
            )}
          />
        </label>

        <label htmlFor="" className="w-full flex-1 text-lg text-gray-600">
          O que foi definido para o próximo encontro?
          <Controller
            name="nextMeetingGoals"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.TextArea
                value={field.value}
                onChange={field.onChange}
                className="mt-4 h-[7rem]"
              />
            )}
          />
        </label>
        <Button.Primary className="max-w-max px-40 py-3">Salvar</Button.Primary>
      </form>
    </div>
  )
}
