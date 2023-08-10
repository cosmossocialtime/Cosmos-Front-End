import * as Dialog from '@radix-ui/react-dialog'

import { GoalProps } from '../../../types/Goal'
import { Check, PencilLine, Trash, X } from 'phosphor-react'
import { Tasks } from './Tasks'
import { useNavigationMap } from '../../../context/NavigationMapProvider'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../Button'
import { Menu } from '../../menu'
import WarningGoalDeletion from './WarningGoalDeletion'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

const editGoalFormSchema = z.object({
  title: z.string().nonempty('O título é obrigatório!'),
  tasks: z.array(
    z.object({
      name: z.string().nonempty('A atividade precisa de uma descrição!'),
      completed: z.boolean(),
      id: z.number(),
    }),
  ),
})

type formProps = z.infer<typeof editGoalFormSchema>

type GoalPopUpProps = {
  goal: GoalProps
  index: number
}

export default function GoalPopUp({ goal, index }: GoalPopUpProps) {
  const { editEnable, changeEdit, getGoals } = useNavigationMap()

  const [editTitle, setEditTitle] = useState(false)
  const [openWarningDelete, setOpenWarningDelete] = useState(false)

  function changeOpenWarningDelete(open: boolean) {
    setOpenWarningDelete(open)
  }

  const newCycleForm = useForm<formProps>({
    defaultValues: {
      title: goal.name || 'Novo objetivo',
      tasks: [
        ...goal.tasks.map((task) => ({
          name: task.name,
          completed: task.completed,
          id: task.id,
        })),
      ],
    },
  })
  const { handleSubmit, register, getValues } = newCycleForm

  function submitForm({ title, tasks }: formProps) {
    // Enviar para o backend
    api
      .patch(`mentorship/goal/${goal.id}`, {
        title,
        tasks: tasks.map((task) => ({ name: task.name, id: task.id })),
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Dados salvos com sucesso!')
          getGoals()
          changeEdit(false)
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível salvar as alterações. Tente novamente mais tarde!',
        )
      })
    // Lógica desnecessária, utilizada apenas enquanto o backend não é finalizado
    // const newTasks: TaskProps[] = tasks.map((task, index) => ({
    //   id: index,
    //   name: task.name,
    //   completed: task.completed,
    //   completedBy: null,
    //   completedAt: null,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }))
    // const newGoal: GoalProps = { ...goal, name: title, tasks: newTasks }

    // changeGoal(newGoal)

    // changeEdit(false)
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
      <header className="relative">
        <span className="block text-xl leading-normal text-gray-400">
          Objetivo {index + 1}
        </span>
        {editEnable && editTitle ? (
          <div className="flex h-14 w-[85%] items-center justify-between gap-3 bg-blue-900/50 px-4 py-2">
            <input
              autoFocus
              type="text"
              className="flex-1 bg-transparent text-3xl leading-normal text-blue-50 outline-none"
              {...register('title')}
            />
            <button onClick={() => setEditTitle(false)} type="button">
              <Check size={32} className="text-blue-50" />
            </button>
          </div>
        ) : (
          <div className="w-[85%]">
            <Dialog.Title className="text-4xl leading-normal text-blue-50 ">
              {getValues('title')}
              {editEnable && (
                <PencilLine
                  size={32}
                  className="ml-3 inline cursor-pointer text-blue-50"
                  onClick={() => setEditTitle(true)}
                />
              )}
            </Dialog.Title>
          </div>
        )}

        <div className="absolute right-0 top-0 flex items-center gap-6 text-gray-100">
          <Menu.Root>
            <Menu.Option
              icon={PencilLine}
              content="Editar"
              onClick={() => changeEdit(true)}
            />
            <Menu.Option
              className="text-red-500"
              icon={Trash}
              content="Excluir"
              onClick={() => setOpenWarningDelete(true)}
            />
          </Menu.Root>

          <Dialog.Close>
            <X size={24} />
          </Dialog.Close>

          <WarningGoalDeletion
            open={openWarningDelete}
            onOpenChange={(open) => changeOpenWarningDelete(open)}
          />
        </div>
      </header>

      <FormProvider {...newCycleForm}>
        <Tasks goal={goal} />
      </FormProvider>

      {editEnable && (
        <Button.Primary className="mx-auto mt-5 w-96 py-4" type="submit">
          Salvar Alterações
        </Button.Primary>
      )}
    </form>
  )
}
