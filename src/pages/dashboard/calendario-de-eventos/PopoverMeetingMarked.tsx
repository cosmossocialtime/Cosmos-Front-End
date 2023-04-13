import * as Popover from "@radix-ui/react-popover"
import { Calendar, Clock, DotsThree, PencilSimpleLine, Trash, User, X } from "phosphor-react"


export default function PopoverMeetingMarked() {
  return (
    <Popover.Portal>
      <Popover.Content
        side={"right"}
        className="relative w-[28rem] 2xl:w-[32rem] bg-violet-500 rounded-2xl text-white p-6 pr-16 pb-12 z-[2]">
        <div
          className="flex gap-3 items-center justify-center absolute right-4 top-4">
          <Popover.Root>
            <Popover.Trigger>
              <DotsThree size={36} className="cursor-pointer" weight="bold" />
            </Popover.Trigger>
            <Popover.Content
              className="bg-c-blue-900 p-6 rounded-lg ">
              <Popover.Arrow width={15} height={10} fill="#0B1340" />

              <div className="mr-14 flex flex-col gap-7 items-start">
                <div className="flex gap-1 items-center cursor-pointer">
                  <PencilSimpleLine size={24} />
                  <span>Editar</span>
                </div>
                <div
                  className="flex gap-1 items-center cursor-pointer text-red-400">
                  <Trash size={24} />
                  <span >Excluir</span>
                </div>
              </div>
            </Popover.Content>
          </Popover.Root>
          <Popover.Close>
            <X size={24} weight="bold" />
          </Popover.Close>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-xl">Primeiro Encontro</h1>

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

          <p className="font-semibold">Primeiro encontro definir metas e objetivos sobre o projeto</p>
        </div>
        <a
          className="bg-zinc-50 text-violet-500 py-2 px-12 rounded-lg font-semibold mt-10 block max-w-max mx-auto cursor-pointer hover:bg-blue-400 hover:text-white transition-all duration-200">
          Acessar Reunião
        </a>

      </Popover.Content>
    </Popover.Portal >
  )
}