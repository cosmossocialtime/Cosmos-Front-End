import * as Select from '@radix-ui/react-select'
import { CaretDown } from 'phosphor-react'
import styled from 'styled-components'

type Option = {
  value: string
}

interface SelectInputProps {
  options: Option[]
  name?: string
  onChangeSelect?: (value: string) => void
}

export function SelectInput({
  options,
  name,
  onChangeSelect,
}: SelectInputProps) {
  return (
    <Select.Root name={name} onValueChange={onChangeSelect}>
      <SelectTrigger>
        <Select.Value placeholder="Opções" />
        <Select.Icon>
          <CaretDown weight="fill" />
        </Select.Icon>
      </SelectTrigger>

      <Select.Portal>
        <SelectContent>
          <Select.Viewport>
            {options.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  <Select.ItemText>{option.value}</Select.ItemText>
                </SelectItem>
              )
            })}
          </Select.Viewport>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectTrigger = styled(Select.Trigger)`
  border: 1px solid var(--gray-500);
  border-radius: 4px;
  color: #00000058;
  width: 100%;
  padding: 0.75rem;

  display: flex;
  justify-content: space-between;

  svg {
    color: var(--purple-500);
    font-size: 1rem;
  }
`

const SelectContent = styled(Select.Content)`
  background: #5c5c5c;
  border-radius: 4px;
  padding: 0.75rem;
  color: #fff;
`
const SelectItem = styled(Select.Item)``
