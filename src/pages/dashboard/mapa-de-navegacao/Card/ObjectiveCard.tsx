import moonIcon from '../assets/moon-icon.svg'
import darkMoonIcon from '../assets/dark-moon-icon.svg'
import ProgressBar from './ProgressBar'
import Image from 'next/image';

interface ObjectiveCardProps {
    description: string,
    index: number,
    amountTask: number,
    completedTask: number,
}

export default function ObjectiveCard({ description, index, amountTask, completedTask }: ObjectiveCardProps) {
    const completedPercentage = amountTask > 0 ? Math.round(completedTask / amountTask * 100) : 0;
    const percentageDistanceCenterImg = -(completedPercentage - 50);

    return (
        <div className='h-[320px] flex flex-col justify-between group cursor-pointer'>
            <div className="px-2 pt-4 w-[200px] h-[270px] text-white rounded-lg flex flex-col gap-1 items-center bg-blue-100 bg-opacity-5 group-hover:bg-gradient-to-b from-blue-400/70 to-violet-600/70">
                <div className='relative h-36 w-36 flex items-center justify-center'>
                    <div className='relative w-20 h-20 flex items-center justify-center'>
                        <Image
                            src={darkMoonIcon}
                            alt="Lua escura"
                            className='absolute top-0 left-0'
                            style={{ clipPath: `circle(50% at ${percentageDistanceCenterImg}% 50%)` }}
                        />
                        <Image
                            src={moonIcon}
                            alt="Lua clara"
                            className='w-[78px] h-[78px]'
                        />
                    </div>

                    <ProgressBar
                        amountTask={amountTask}
                        completedTask={completedTask}
                    />
                </div>

                <div className='flex flex-col items-center'>
                    <strong className="mb-2 text-center block text-2xl font-semibold">Objetivo {index}</strong>
                    <span className="text-center text-sm">{description}</span>
                </div>
            </div>

            <button className='hidden group-hover:flex items-center justify-center text-white font-semibold w-full h-10 bg-violet-500 rounded-lg'>Descobrir tarefas</button>
        </div>
    )
}