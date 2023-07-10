import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { twMerge } from 'tailwind-merge'

interface CheckInputProps {
  content: string
  checked: boolean
  disabled?: boolean
  onChangeChecked: (checked: boolean) => void
  isLineThrough?: boolean
  className?: string
}

export function InputCheckBox({
  content,
  checked,
  disabled = false,
  onChangeChecked,
  className,
  isLineThrough = false,
}: CheckInputProps) {
  return (
    <label
      htmlFor="checkbox"
      className={twMerge(
        ` ${
          isLineThrough && checked ? 'text-gray-400 line-through' : ''
        }  flex gap-2`,
        className,
      )}
    >
      <Checkbox.Root
        disabled={disabled}
        checked={checked}
        onCheckedChange={onChangeChecked}
        id="checkbox"
        className={`flex h-6 w-6 items-center gap-2 rounded border border-solid border-gray-400 bg-gray-300/20 data-[state=checked]:border-none data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-300 data-[state=checked]:to-violet-400`}
      >
        <Checkbox.Indicator>
          <Check size={24} weight="bold" className="p-[2px] text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {content}
    </label>
  )
}
