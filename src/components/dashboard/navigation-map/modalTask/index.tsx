import * as Dialog from '@radix-ui/react-dialog'

import { Check, PencilSimpleLine, Plus, X } from 'phosphor-react'
import { Dispatch, SetStateAction, useState } from 'react'
import InputTask from './InputTask'
import ModalConfirmEdit from './ModalConfirmEdit'
import PopoverOptions from './PopoverOptions'
import Task from './Task'
import {
  objectiveCardsData,
  TasksProps,
} from '../../../../data/objectiveCardsData'
const { v4: uuidv4 } = require('uuid')

type ModalTaskProps = {
  id: string
  index: number
  title: string
  tasks: TasksProps[]
  taskWithActiveEditing?: string
  changeTitle: (newTitle: string) => void
  toggleTaskWithActiveEditing: (id?: string) => void
  deleteObjective: (id: string) => void
  saveEditions: (localTasks: TasksProps[]) => void
  changeTaskCheck: (id: string) => void
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalTask({
  id,
  index,
  title,
  tasks,
  changeTitle,
  taskWithActiveEditing,
  toggleTaskWithActiveEditing,
  deleteObjective,
  saveEditions,
  changeTaskCheck,
  setModalOpen,
}: ModalTaskProps) {
  const objective = objectiveCardsData.find((objective) => objective.id === id)

  const [editEnabled, setEditEnabled] = useState(false)
  const [editTitle, setEditTitle] = useState(false)
  const [localTasks, setLocalTasks] = useState(objective!.tasks)

  function createNewTask() {
    const id = uuidv4()
    setLocalTasks((prevLocalTasks) => [
      { id, content: '', checked: false },
      ...prevLocalTasks,
    ])

    toggleTaskWithActiveEditing(id)
  }
  function deleteTask(id: string) {
    setLocalTasks((prevLocalTasks) => {
      const updatedLocalTasks = prevLocalTasks.filter((task) => task.id !== id)

      return updatedLocalTasks
    })
  }
  function updateTaskContent(content: string, id: string) {
    setLocalTasks((prevLocalTasks) => {
      const taskIndex = prevLocalTasks.findIndex((task) => task.id === id)

      if (taskIndex === -1) {
        return prevLocalTasks
      }

      const updatedLocalTasks = [...prevLocalTasks]
      updatedLocalTasks[taskIndex] = {
        ...updatedLocalTasks[taskIndex],
        content,
      }

      return updatedLocalTasks
    })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/70" />
      <Dialog.Content className="fixed top-1/2 left-1/2 z-20 flex  w-[900px] flex-1 -translate-y-1/2 -translate-x-1/2 flex-col gap-10 rounded-2xl bg-violet-900 px-10 py-8">
        <div>
          <span className="block text-xl leading-normal text-gray-400">
            Objetivo {index + 1}
          </span>
          {editTitle ? (
            <div className="flex w-[85%] items-center gap-4 bg-blue-900/20 py-2 px-5 text-3xl font-semibold text-gray-100">
              <input
                className="flex-1 bg-transparent outline-none placeholder:font-normal placeholder:text-gray-400"
                type="text"
                placeholder="Escreva o objetivo aqui"
                maxLength={60}
                value={title}
                onChange={(event) => changeTitle(event.target.value)}
              />
              <Check
                size={24}
                className="cursor-pointer"
                onClick={() => setEditTitle(false)}
              />
            </div>
          ) : (
            <>
              <Dialog.Title className="w-[85%] text-4xl font-semibold leading-normal text-blue-50 ">
                {title}
                {editEnabled && (
                  <PencilSimpleLine
                    size={32}
                    className="ml-4 inline cursor-pointer"
                    onClick={() => setEditTitle(true)}
                  />
                )}
              </Dialog.Title>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-normal text-gray-400">
              Tarefas
            </span>
            {editEnabled && (
              <Plus
                size={28}
                className="cursor-pointer rounded-full bg-blue-900 p-1 text-white"
                onClick={createNewTask}
              />
            )}
          </div>

          <div className="scrollbar-thumb-blue-400 scrollbar-thin scrollbar-track-blue-500/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-52 flex-col gap-6 overflow-y-auto pr-3">
            {editEnabled
              ? localTasks.map((task, index) => (
                  <InputTask
                    index={index}
                    key={task.id}
                    task={task}
                    taskWithActiveEditing={taskWithActiveEditing}
                    deleteTask={deleteTask}
                    updateTaskContent={updateTaskContent}
                    toggleTaskWithActiveEditing={toggleTaskWithActiveEditing}
                  />
                ))
              : tasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    changeTaskCheck={changeTaskCheck}
                  />
                ))}
          </div>

          {editEnabled && (
            <button
              className="mx-auto w-96 rounded-lg bg-violet-500 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-violet-600"
              onClick={() => {
                setEditEnabled(false)
                saveEditions(localTasks)
              }}
            >
              Salvar Alterações
            </button>
          )}
        </div>

        <div className="absolute right-12 flex items-center gap-6 text-white">
          <PopoverOptions
            setEditEnabled={setEditEnabled}
            deleteObjective={deleteObjective}
            id={id}
          />

          {editEnabled ? (
            <Dialog.Root>
              <Dialog.Trigger>
                <button aria-label="Close">
                  <X size={24} />
                </button>
              </Dialog.Trigger>

              <ModalConfirmEdit
                setEditEnabled={setEditEnabled}
                setModalOpen={setModalOpen}
              />
            </Dialog.Root>
          ) : (
            <Dialog.Close asChild>
              <button aria-label="Close">
                <X size={24} />
              </button>
            </Dialog.Close>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
