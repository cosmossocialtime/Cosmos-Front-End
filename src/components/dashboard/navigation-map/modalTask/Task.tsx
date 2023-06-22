import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { TasksProps } from '../../../../data/objectiveCardsData'

type TaskProps = {
  task: TasksProps
  changeTaskCheck: (id: string) => void
}

export default function Task({ task, changeTaskCheck }: TaskProps) {
  return (
    <Checkbox.Root
      className="group flex max-w-max items-center gap-3"
      defaultChecked={task.checked}
      checked={task.checked}
      onCheckedChange={() => changeTaskCheck(task.id)}
    >
      <div className="item-center flex h-6 w-6 justify-center rounded border border-solid border-gray-500 bg-gray-300/20 group-data-[state=checked]:border-none group-data-[state=checked]:bg-gradient-to-r group-data-[state=checked]:from-blue-300 group-data-[state=checked]:to-violet-400">
        <Checkbox.Indicator>
          <Check size={24} className="p-[0.125rem] text-white" />
        </Checkbox.Indicator>
      </div>
      <span className="text-left text-gray-200 group-data-[state=checked]:text-gray-400 group-data-[state=checked]:line-through">
        {task.content}
      </span>
    </Checkbox.Root>
  )
}
