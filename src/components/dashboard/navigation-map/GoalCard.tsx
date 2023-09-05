import moonIcon from '../../../assets/moon-icon.svg'
import darkMoonIcon from '../../../assets/dark-moon-icon.svg'
import Image from 'next/image'
import ProgressBar from './ProgressBar'
import { GoalProps } from '../../../types/Goal'

interface GoalCardProps {
  goal: GoalProps
  index: number
}

export default function GoalCard({ goal, index }: GoalCardProps) {
  const amountTask = goal.tasks.length
  const completedTask = goal.tasks.filter((task) => task.completed).length
  const completedPercentage =
    goal.tasks.length > 0 ? Math.round((completedTask / amountTask) * 100) : 0
  const conversionRate =
    ((100 - Math.abs(100 - completedPercentage * 2)) * -10) / 100

  const percentageDistanceCenterImg =
    50 - (completedPercentage + conversionRate)
  return (
    <div className="group flex cursor-pointer flex-col justify-between">
      <div className="flex h-[270px] w-[200px] flex-col items-center gap-1 rounded-lg bg-blue-100 bg-opacity-5 from-blue-400/70 to-violet-600/70 px-2 pt-4 text-white group-hover:bg-gradient-to-b">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <Image
              src={darkMoonIcon}
              alt="Lua escura"
              className="absolute left-0 top-0"
              style={{
                clipPath: `circle(50% at ${percentageDistanceCenterImg}% 50%)`,
              }}
            />
            <Image
              src={moonIcon}
              alt="Lua clara"
              className="h-[78px] w-[78px]"
            />
          </div>

          <ProgressBar amountTask={amountTask} completedTask={completedTask} />
        </div>

        <div className="flex flex-col items-center">
          <strong className="mb-2 block text-center text-2xl font-semibold">
            Objetivo {index + 1}
          </strong>
          <span className="text-center text-sm">{goal.name}</span>
        </div>
      </div>

      <div className="mt-2 w-full rounded-lg bg-violet-500 py-2 text-center text-lg font-semibold text-gray-100 opacity-0 transition-colors hover:bg-violet-600 group-hover:opacity-100">
        Descobrir tarefas
      </div>
    </div>
  )
}
