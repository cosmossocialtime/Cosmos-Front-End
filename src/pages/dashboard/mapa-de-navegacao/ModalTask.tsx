import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'

import { Check, X } from 'phosphor-react';

interface ModalTaskProps {
    tasks: {
        content: string;
        checked: boolean;
    }[]
}

export function ModalTask({ tasks }: ModalTaskProps) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='z-10 fixed inset-0 bg-black/70' />
            <Dialog.Content className='z-50 p-12 bg-violet-900 w-[900px] h-[500px] rounded-2xl flex-1 flex flex-col gap-10 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                <div>
                    <span className='text-xl leading-normal text-gray-400'>Objetivo 1</span>
                    <Dialog.Title className='max-w-sm text-blue-50 text-4xl leading-normal font-semibold'>
                        Aumentar o número de doadores
                    </Dialog.Title>
                </div>

                <div className='flex flex-col gap-4'>
                    <span className='text-xl leading-normal text-gray-400'>Tarefas</span>

                    <div className='flex flex-col gap-6 max-h-44 overflow-y-auto scrollbar-thumb-blue-400 scrollbar-thin scrollbar-track-blue-500/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                        {tasks.map((task, key) => (
                            <Checkbox.Root
                                key={key}
                                className="max-w-max flex items-center gap-3 group"
                                defaultChecked={task.checked}
                            >
                                <div className='w-6 h-6 rounded flex item-center justify-center border-2 border-violet-500 border-solid group-data-[state=checked]:bg-violet-500'>
                                    <Checkbox.Indicator>
                                        <Check size={20} className="text-white"/>
                                    </Checkbox.Indicator>
                                </div>

                                <span className='text-white group-data-[state=checked]:text-blue-100 group-data-[state=checked]:line-through'>
                                    {task.content}
                                </span>
                            </Checkbox.Root>
                        ))}
                    </div>
                </div>
                <Dialog.Close asChild>
                    <button
                        className='text-white absolute right-12'
                        aria-label='Close'
                    >
                        <X size={24} />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    )
}