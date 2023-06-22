import * as Popover from '@radix-ui/react-popover'
import * as Select from '@radix-ui/react-select'

import { X } from 'phosphor-react'
import dayjs from 'dayjs'

const peoplesName = [
  'Érick Henrique',
  'Gabriel Ximenes',
  'Daniel Doarte',
  'Paulo Victor',
  'Amanda Sales',
  'Rodrigo Fazoli',
]

interface MeetingDataProps {
  title?: string
  currentDay?: string
  hourStart?: string
  hourEnd?: string
  description?: string
  guests?: Array<string>
  linkMeeting?: string
}

export default function PopoverForMarkMeeting({
  currentDay,
}: MeetingDataProps) {
  // const [show, setShow] = useState<boolean>(false)

  // const [selectContent, setSelectContent] = useState("")
  // const handleClose = (state: boolean) => {
  //   setShow(state)
  // }

  return (
    <Popover.Portal>
      <Popover.Content
        side={'right'}
        className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 p-5 pr-16 pb-12 text-white 2xl:w-[32rem]"
      >
        <Popover.Close className="absolute right-4 top-4">
          <X size={24} />
        </Popover.Close>
        <form action="" className="flex flex-col items-center gap-3">
          <label htmlFor="title" className="absolute h-0 w-0 opacity-0">
            Adiconar Título
          </label>
          <input
            id="title"
            type="text"
            placeholder="Adicionar título"
            className="w-full rounded-lg border border-solid border-white/40  px-2 py-1 outline-none placeholder:text-white focus:border-white "
          />

          <label htmlFor="date" className="absolute h-0 w-0 opacity-0">
            Adicionar data
          </label>

          <input
            type="date"
            name=""
            id="date"
            value={currentDay || dayjs().format('YYYY-MM-DD')}
            className="w-full rounded-lg border border-solid border-white/40 px-2 py-1 outline-none placeholder:text-white focus:border-white"
          ></input>

          <div className="flex w-full items-center gap-3">
            <label htmlFor="hourStart" className="absolute h-0 w-0 opacity-0">
              Horario de inicio da reunião
            </label>
            <input
              type="time"
              id="hourStart"
              className="flex-1 rounded-lg border border-solid border-white/40 p-2 outline-none focus:border-white"
            />

            <span className="font-semibold">até</span>

            <label htmlFor="hourEnd" className="absolute h-0 w-0 opacity-0">
              Horario de fim da reunião
            </label>
            <input
              type="time"
              id="hourEnd"
              className=" flex-1 rounded-lg border border-solid border-white/40 p-2 outline-none focus:border-white"
            />
          </div>

          <Select.Root>
            <Select.Trigger className="flex w-full items-center justify-between rounded py-3 px-4 text-sm text-zinc-500">
              <Select.Value asChild>
                <input type="text" />
              </Select.Value>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="rounded bg-white text-center">
                <Select.Viewport className="cursor-pointer py-2 text-violet-500">
                  {peoplesName.map((people, index) => (
                    <Select.Item
                      key={`${people}- ${index}`}
                      value={people}
                      className="flex items-center justify-between rounded-lg py-2 px-2 hover:bg-violet-500 hover:text-white"
                    >
                      <Select.ItemText>{people}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <textarea className="h-20 w-full resize-none rounded-lg border border-solid border-white/40 bg-transparent px-4 py-2 text-sm font-semibold outline-none" />

          <label htmlFor="url" className="absolute h-0 w-0 opacity-0">
            Link da reunião
          </label>
          <input
            type="url"
            id="url"
            placeholder="https://calendar.google.com"
            className="w-full rounded-lg border border-solid border-white/40 py-2 px-4 outline-none focus:border-white"
            pattern="https://.*"
          />
        </form>
      </Popover.Content>
    </Popover.Portal>
  )
}
