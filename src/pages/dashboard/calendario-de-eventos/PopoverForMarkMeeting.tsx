import * as Popover from "@radix-ui/react-popover"
import * as Select from "@radix-ui/react-select"

import { useState } from "react"
import { X } from "phosphor-react"
import dayjs from "dayjs"

const peoplesName = [
  "Érick Henrique",
  "Gabriel Ximenes",
  "Daniel Doarte",
  "Paulo Victor",
  "Amanda Sales",
  "Rodrigo Fazoli",
]

interface MeetingDataProps {
  title?: string;
  currentDay?: string;
  hourStart?: string;
  hourEnd?: string;
  description?: string;
  guests?: Array<string>;
  linkMeeting?: string;
}

export default function PopoverForMarkMeeting({ currentDay }: MeetingDataProps) {
  const [show, setShow] = useState<boolean>(false)

  const [selectContent, setSelectContent] = useState("")
  const handleClose = (state: boolean) => {
    setShow(state)
  }

  return (
    <Popover.Portal>
      <Popover.Content
        side={"right"}
        className="relative w-[28rem] 2xl:w-[32rem] bg-violet-500 rounded-2xl text-white p-5 pr-16 pb-12 z-[2] m-4">
        <Popover.Close className="absolute right-4 top-4">
          <X size={24} />
        </Popover.Close>
        <form action="" className="flex flex-col items-center gap-3">
          <label
            htmlFor="title"
            className="opacity-0 w-0 h-0 absolute">Adiconar Título</label>
          <input
            id="title"
            type="text"
            placeholder="Adicionar título"
            className="placeholder:text-white px-2 py-1 border border-solid  border-white/40 rounded-lg w-full outline-none focus:border-white "
          />

          <label htmlFor="date" className="opacity-0 w-0 h-0 absolute">Adicionar data</label>

          <input
            type="date"
            name=""
            id="date"
            value={currentDay ? currentDay : dayjs().format("YYYY-MM-DD")}
            className="placeholder:text-white px-2 py-1 border border-solid border-white/40 rounded-lg w-full outline-none focus:border-white"
          >

          </input>

          <div className="w-full flex items-center gap-3">
            <label
              htmlFor="hourStart"
              className="opacity-0 w-0 h-0 absolute">
              Horario de inicio da reunião
            </label>
            <input
              type="time"
              id="hourStart"
              className="border border-solid border-white/40 outline-none focus:border-white p-2 rounded-lg flex-1"
            />

            <span className="font-semibold">até</span>

            <label
              htmlFor="hourEnd"
              className="opacity-0 w-0 h-0 absolute">
              Horario de fim da reunião
            </label>
            <input
              type="time"
              id="hourEnd"
              className=" border border-solid border-white/40 focus:border-white outline-none p-2 rounded-lg flex-1"
            />
          </div>

          <Select.Root>
            <Select.Trigger
              className="rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
            >
              <Select.Value asChild>
                <input type="text" />
              </Select.Value>

            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white text-center rounded">
                <Select.Viewport className="text-violet-500 py-2 cursor-pointer">
                  {peoplesName.map((people, index) => (
                    <Select.Item
                      key={`${people}- ${index}`}
                      value={people}
                      className="py-2 px-2 hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center">
                      <Select.ItemText >
                        {people}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <textarea className="h-20 resize-none border border-solid border-white/40 bg-transparent rounded-lg outline-none px-4 py-2 w-full text-sm font-semibold" />

          <label
            htmlFor="url"
            className="opacity-0 w-0 h-0 absolute">
            Link da reunião
          </label>
          <input
            type="url"
            id="url"
            placeholder="https://calendar.google.com"
            className="w-full border border-solid border-white/40 focus:border-white rounded-lg py-2 px-4 outline-none"
            pattern="https://.*" />

          <button className="mt-2 max-w-max py-2 px-20 rounded-lg bg-white text-violet-500 font-semibold">
            Salvar
          </button>
        </form>
      </Popover.Content>
    </Popover.Portal >
  )
}