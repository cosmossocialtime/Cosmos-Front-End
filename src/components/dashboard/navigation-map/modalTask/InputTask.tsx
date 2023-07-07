/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Check, DotsSixVertical, Trash } from 'phosphor-react'
import { TasksProps } from '../../../../data/objectiveCardsData'

interface inputTasksProps {
  index: number
  task: TasksProps
  taskWithActiveEditing?: string
  deleteTask: (id: string) => void
  updateTaskContent: (content: string, id: string) => void
  toggleTaskWithActiveEditing: (id?: string) => void
}

export default function InputTask({
  index,
  task,
  taskWithActiveEditing,
  deleteTask,
  updateTaskContent,
  toggleTaskWithActiveEditing,
}: inputTasksProps) {
  const [inputContent, setInputContent] = useState(task.content)

  useEffect(() => {
    updateTaskContent(inputContent, task.id)
  }, [toggleTaskWithActiveEditing])

  return (
    <div
      className={`${
        taskWithActiveEditing === task.id
          ? 'bg-blue-900/[15]'
          : 'bg-blue-900/30'
      } flex items-center gap-2 rounded-lg p-3 text-gray-300`}
      draggable
    >
      <DotsSixVertical size={24} weight="bold" className="cursor-pointer" />
      <div
        className={`${
          task.checked
            ? 'border-none bg-gradient-to-r from-blue-300 to-violet-400'
            : 'border-solid border-gray-400 bg-gray-300/20'
        } h-6 w-6  rounded border `}
      >
        {task.checked && (
          <Check size={24} weight="bold" className="p-[0.125rem]" />
        )}
      </div>

      <input
        type="text"
        className="flex-1 bg-transparent text-gray-200 outline-none"
        value={inputContent}
        autoFocus={index === 0}
        onFocus={() => toggleTaskWithActiveEditing(task.id)}
        onChange={(event) => setInputContent(event.target.value)}
      />

      <div className="flex gap-4">
        {taskWithActiveEditing === task.id && (
          <Check
            size={24}
            weight="bold"
            className="cursor-pointer"
            onClick={() => toggleTaskWithActiveEditing(undefined)}
          />
        )}

        <Trash
          size={24}
          className="cursor-pointer text-red-500"
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </div>
  )
}
