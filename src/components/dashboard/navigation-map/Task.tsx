import { TaskProps } from '../../../types/Task'
import { Input } from '../../Input'

interface TaskComponentProps {
  task: TaskProps
  completeTask: (task: TaskProps) => void
}

export function Task({ task, completeTask }: TaskComponentProps) {
  // const [completed, setCompleted] = useState(task.completed)

  return (
    <Input.CheckBox
      className="text-gray-200 data-[state=checked]:text-gray-400"
      content={task.name}
      checked={task.completed}
      onChangeChecked={() => completeTask(task)}
      isLineThrough
    />
  )
}
