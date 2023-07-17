import * as Select from '@radix-ui/react-select'
import { CaretDown, Check } from 'phosphor-react'
import { twMerge } from 'tailwind-merge'

interface InputSelectProps extends Select.SelectProps {
  items: string[]
  option: string
  placeholder: string
  changeOption: (option: string) => void
  className?: string
  maxHeightView?: string
}

export function InputSelect({
  items,
  option,
  changeOption,
  placeholder,
  className,
  maxHeightView,
  ...rest
}: InputSelectProps) {
  return (
    <Select.Root {...rest} defaultValue={option} onValueChange={changeOption}>
      <Select.Trigger
        data-placeholder
        className={twMerge(
          `${
            rest.disabled ? 'border-0 border-b' : 'border'
          } group flex flex-1 items-center justify-between gap-12 rounded border-solid border-gray-400 py-3 px-4`,
          className,
        )}
      >
        <Select.Value asChild>
          <span className={`${option ? '' : 'opacity-25'}`}>
            {option || placeholder}
          </span>
        </Select.Value>
        <Select.Icon>
          <CaretDown
            weight="fill"
            className="text-violet-500 group-data-[disabled]:opacity-20"
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          side="bottom"
          sideOffset={16}
          position="popper"
          className="w-full rounded bg-white p-2 shadow-xl"
        >
          <Select.Viewport style={{ maxHeight: maxHeightView }}>
            {items.map((item, key) => (
              <Select.Item
                className="flex cursor-pointer items-center justify-between gap-4 rounded-md p-3 text-violet-500 hover:bg-violet-500 hover:text-white"
                key={key}
                value={item}
                disabled={item === option}
              >
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check size={18} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
