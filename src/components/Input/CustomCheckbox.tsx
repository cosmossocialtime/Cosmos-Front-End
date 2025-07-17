import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { useCallback } from 'react'

interface CustomCheckboxProps {
  id: string
  checked: boolean
  setChecked: (value: boolean) => void
  labelText: string
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  setChecked,
  labelText,
  ...rest
}) => {
  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      setChecked(checked)
    },
    [setChecked]
  )

  return (
    <div className="my-4 flex items-end gap-2">
      <Checkbox.Root
        {...rest}
        className={`flex h-6 w-6 items-center justify-center rounded border-2 
                    border-solid border-[#A2ABCC] bg-zinc-50 ${
                      checked
                        ? 'border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'
                        : ''
                    }`}
        id={id}
        checked={checked}
        onCheckedChange={handleCheckedChange}
        aria-labelledby="checkbox-label"
      >
        <Checkbox.Indicator>
          <Check size={32} className="p-1 font-bold text-zinc-50" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        id="checkbox-label"
        htmlFor={id}
        className="font-inter mt-2 text-[16px] font-normal leading-[20px] text-[#1B2031]"
      >
        {labelText}
      </label>
    </div>
  )
}

{
  /* <div className="my-4 flex gap-2 pt-[48px]">
                        <Checkbox.Root
                            className={`flex h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-zinc-50 ${acceptTerms && 'border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'
                                }`}
                            id="checkbox"
                            required
                            checked={acceptTerms}
                            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                        >
                            <Checkbox.Indicator>
                                <Check size={32} className="p-1 font-bold text-zinc-50" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label htmlFor="checkbox">
                            <span className="text-[16px]  font-normal text-[#1B2031] leading-[20px] font-inter mt-2">
                               
                                Aceito que a Cosmos, a empresa parceira e seus colaboradores tenham acesso às minhas respostas
                            </span>
                        </label>
                    </div> */
}
