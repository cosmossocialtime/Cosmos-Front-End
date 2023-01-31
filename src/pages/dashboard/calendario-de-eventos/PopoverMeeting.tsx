import * as Popover from "@radix-ui/react-popover"
import * as Select from "@radix-ui/react-select"
import Datepicker from "tailwind-datepicker-react"

import { useState } from "react"

const peoplesName = [
  "Érick Henrique",
  "Gabriel Ximenes",
  "Daniel Doarte",
  "Paulo Victor",
  "Amanda Sales",
  "Rodrigo Fazoli",
]

export function PopoverMeeting() {
  const [show, setShow] = useState<boolean>(false)

  const [selectContent, setSelectContent] = useState("")
  const handleClose = (state: boolean) => {
    setShow(state)
  }

  return (
    <Popover.Portal>
      <Popover.Content className="bg-violet-500 rounded-2xl text-white p-5 mt-4 z-[2]">
        <Popover.Close />
        <form action="" className="flex flex-col gap-3">
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
            className="placeholder:text-white px-2 py-1 border border-solid border-white/40 rounded-lg w-full outline-none focus:border-white appearance-none data-[type=date]:appearance-none"
          >

          </input>

          <div>
            <label htmlFor="hourStart">Horario de inicio da reunião</label>
            <input type="time" id="hourStart" />

            <label htmlFor="hourEnd">Horario de fim da reunião</label>
            <input type="time" id="hourEnd" />
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
          <textarea className="resize-none border border-solid border-white/40 bg-transparent rounded-lg outline-none px-4 py-2 w-full text-sm font-semibold" />

          <label htmlFor="url"> Link da reunião</label>
          <input
            type="url"
            id="url"
            placeholder="https://calendar.google.com"
            pattern="https://.*" />

          <button>Salvar</button>
        </form>
      </Popover.Content>
    </Popover.Portal >
  )
}