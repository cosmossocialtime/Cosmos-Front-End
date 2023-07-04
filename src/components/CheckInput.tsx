import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

interface CheckInputProps {
  content: string
  checked: boolean
  onChangeChecked: (checked: boolean) => void
  isLineThrough?: boolean
  className?: string
}

export function CheckInput({
  content,
  checked,
  onChangeChecked,
  className,
  isLineThrough = false,
}: CheckInputProps) {
  return (
    <label htmlFor="checkbox" className={`${className} flex gap-2`}>
      <Checkbox.Root
        id="checkbox"
        className={`${
          isLineThrough ? 'line-through' : ''
        } flex h-6 w-6 items-center gap-2 rounded border border-solid border-gray-400 bg-gray-300/20 data-[state=checked]:border-none data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-300 data-[state=checked]:to-violet-400`}
      >
        <Checkbox.Indicator>
          <Check size={24} weight="bold" className="p-[2px] text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {content}
    </label>
  )
}
