import * as Select from '@radix-ui/react-select'
import { timesDay } from './timesDay'

interface InputTimeProps {
  time: string
  changeTime: (value: string) => void
}

export function InputTime({ time, changeTime }: InputTimeProps) {
  return (
    <Select.Root onValueChange={(value) => value && changeTime(value)}>
      <div className="relative flex flex-1 items-center rounded-lg border border-solid border-white/40 bg-violet-600/50 px-2 py-1">
        <input
          type="text"
          readOnly
          id="startTime"
          required
          value={time}
          onChange={(e) => changeTime(e.target.value)}
          className="w-full bg-transparent outline-none focus:border-white"
        />
        <Select.Trigger className="absolute inset-0 "></Select.Trigger>
      </div>
      <Select.Portal>
        <Select.Content
          side="bottom"
          position="popper"
          className="z-20 w-24 bg-white text-center shadow-xl"
        >
          <Select.Viewport className="max-h-36 w-full overflow-y-auto text-left">
            {timesDay.map((time) => (
              <Select.Item
                className="cursor-pointer p-2 text-violet-500 hover:bg-violet-400 hover:text-white"
                value={time}
                key={time}
              >
                {time}
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
