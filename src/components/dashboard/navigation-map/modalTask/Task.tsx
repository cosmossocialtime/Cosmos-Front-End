import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from "phosphor-react";
import { TasksProps } from '../../../../data/objectiveCardsData';


type TaskProps = {
    task: TasksProps;
    changeTaskCheck: (id: string) => void;
}

export default function Task({ task, changeTaskCheck }: TaskProps) {

    return (

        <Checkbox.Root
            className="max-w-max flex items-center gap-3 group"
            defaultChecked={task.checked}
            checked={task.checked}
            onCheckedChange={() => changeTaskCheck(task.id)}
        >
            <div className='w-6 h-6 rounded flex item-center justify-center bg-gray-300/20 border border-gray-500 border-solid group-data-[state=checked]:bg-gradient-to-r group-data-[state=checked]:from-blue-300 group-data-[state=checked]:to-violet-400 group-data-[state=checked]:border-none'>
                <Checkbox.Indicator>
                    <Check size={24} className="text-white p-[0.125rem]" />
                </Checkbox.Indicator>
            </div>
            <span className='text-left text-gray-200 group-data-[state=checked]:text-gray-400 group-data-[state=checked]:line-through'>
                {task.content}
            </span>
        </Checkbox.Root>
    )
}