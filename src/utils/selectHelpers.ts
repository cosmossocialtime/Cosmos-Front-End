import { Option } from '../types/MultiselectCombobox'

export function findOptionByValue(
  options: Option[],
  value: string | null | undefined
): Option | null {
  if (!value) return null
  return options.find((option) => option.value === value) || null
}
