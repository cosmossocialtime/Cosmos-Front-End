import moonIcon from '../../../../assets/moon-icon.svg'
import darkMoonIcon from '../../../../assets/dark-moon-icon.svg'
import ProgressBar from './ProgressBar'
import Image from 'next/image'
import { Button } from '../../../Button'

interface ObjectiveCardProps {
  description: string
  index: number
  amountTask: number
  completedTask: number
}

export default function ObjectiveCard({
  description,
  index,
  amountTask,
  completedTask,
}: ObjectiveCardProps) {
  const completedPercentage =
    amountTask > 0 ? Math.round((completedTask / amountTask) * 100) : 0
  const percentageDistanceCenterImg = -(completedPercentage - 50)

  return (
    <div className="group flex cursor-pointer flex-col justify-between">
      <div className="flex h-[270px] w-[200px] flex-col items-center gap-1 rounded-lg bg-blue-100 bg-opacity-5 from-blue-400/70 to-violet-600/70 px-2 pt-4 text-white group-hover:bg-gradient-to-b">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <Image
              src={darkMoonIcon}
              alt="Lua escura"
              className="absolute top-0 left-0"
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
            Objetivo {index}
          </strong>
          <span className="text-center text-sm">{description}</span>
        </div>
      </div>

      <Button.Primary className="mt-2 w-full py-2 font-semibold opacity-0 group-hover:opacity-100">
        Descobrir tarefas
      </Button.Primary>
    </div>
  )
}
