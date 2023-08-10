import { Plus } from 'phosphor-react'
import { useNavigationMap } from '../../../context/NavigationMapProvider'
import { GoalProps } from '../../../types/Goal'
import { TaskProps } from '../../../types/Task'
import { Task } from './Task'
import { InputTask } from './InputTask'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'
import { useFieldArray, useFormContext } from 'react-hook-form'

interface TasksProps {
  goal: GoalProps
}

export function Tasks({ goal }: TasksProps) {
  const { control } = useFormContext()
  const { changeGoal, editEnable } = useNavigationMap()
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'tasks',
  })

  function createNewTask() {
    prepend({ name: '', completed: false })
  }

  function deleteTask(index: number) {
    remove(index)
  }

  function completeTask(task: TaskProps) {
    api
      .patch(`/mentorship/task/${task.id}/completed`, {
        completed: !task.completed,
      })
      .then((response) => {
        if (response.status === 200) {
          const newTasks = goal.tasks.map((t) =>
            t.id === task.id ? { ...task, completed: !task.completed } : t,
          )
          const newGoal = { ...goal, tasks: newTasks }
          changeGoal(newGoal)
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível validar a tarefa. Tente novamente mais tarde!',
        )
      })
  }

  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl leading-normal text-gray-400">Tarefas</span>
        {editEnable && (
          <Plus
            size={28}
            className="cursor-pointer rounded-full bg-blue-900 p-1 text-white"
            onClick={createNewTask}
          />
        )}
      </div>
      <div className="scrollbar-thumb-blue-400 scrollbar-thin scrollbar-track-blue-500/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex h-52 flex-col gap-6 overflow-y-auto pr-3">
        {editEnable
          ? fields.map((field, index) => (
              <InputTask
                key={field.id}
                index={index}
                completed={false}
                deleteTask={deleteTask}
              />
            ))
          : goal.tasks.map((task, index) => (
              <Task task={task} key={task.id} completeTask={completeTask} />
            ))}
      </div>
    </div>
  )
}
