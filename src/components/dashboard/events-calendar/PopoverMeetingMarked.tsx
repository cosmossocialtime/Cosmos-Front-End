import * as Popover from '@radix-ui/react-popover'
import {
  Calendar,
  Clock,
  DotsThree,
  PencilSimpleLine,
  Trash,
  User,
  X,
} from 'phosphor-react'

export function PopoverMeetingMarked() {
  return (
    <Popover.Portal>
      <Popover.Content
        side={'right'}
        className="relative z-[2] w-[28rem] rounded-2xl bg-violet-500 p-6 pr-16 pb-12 text-white 2xl:w-[32rem]"
      >
        <div className="absolute right-4 top-4 flex items-center justify-center gap-3">
          <Popover.Root>
            <Popover.Trigger>
              <DotsThree size={36} className="cursor-pointer" weight="bold" />
            </Popover.Trigger>
            <Popover.Content className="rounded-lg bg-c-blue-900 p-6 ">
              <Popover.Arrow width={15} height={10} fill="#0B1340" />

              <div className="mr-14 flex flex-col items-start gap-7">
                <div className="flex cursor-pointer items-center gap-1">
                  <PencilSimpleLine size={24} />
                  <span>Editar</span>
                </div>
                <div className="flex cursor-pointer items-center gap-1 text-red-400">
                  <Trash size={24} />
                  <span>Excluir</span>
                </div>
              </div>
            </Popover.Content>
          </Popover.Root>
          <Popover.Close>
            <X size={24} weight="bold" />
          </Popover.Close>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">Primeiro Encontro</h1>

          <div className="flex items-center gap-3">
            <Calendar size={24} />
            <span className="font-semibold">01/02/2023</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={24} />
            <span className="font-semibold">19H - 20H</span>
          </div>

          <div className="flex items-center gap-3">
            <User size={24} />
            <span className="font-semibold">José, João, Erick</span>
          </div>

          <p className="font-semibold">
            Primeiro encontro definir metas e objetivos sobre o projeto
          </p>
        </div>
        <a className="mx-auto mt-10 block max-w-max cursor-pointer rounded-lg bg-zinc-50 py-2 px-12 font-semibold text-violet-500 transition-all duration-200 hover:bg-blue-400 hover:text-white">
          Acessar Reunião
        </a>
      </Popover.Content>
    </Popover.Portal>
  )
}
