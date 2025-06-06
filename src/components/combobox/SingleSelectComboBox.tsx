import Select, { StylesConfig, components } from 'react-select'
import Image from 'next/image'

interface Option {
  value: string
  label: string
}

interface SingleSelectComboBoxProps {
  options: Option[]
  label?: string
  onChange?: (selected: Option | null) => void
  isDisabled?: boolean
  value?: Option | null
  instanceId?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator = (props: any) => {
  const { selectProps } = props
  const isOpen = selectProps.menuIsOpen

  return (
    <components.DropdownIndicator {...props}>
      <Image
        src="/images/arrow-down.svg"
        alt="Abrir dropdown"
        width={16}
        height={12}
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-in-out',
        }}
      />
    </components.DropdownIndicator>
  )
}

// **Remover o "X |" extra**
const ClearIndicator = () => {
  return null // Não exibe o botão de limpar tudo
}

// Estilos customizados (mesmo do MultiSelect)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customStyles: StylesConfig<any, false> = {
  control: (base, state) => ({
    ...base,
    border: 'border solid',
    borderRadius: 'rounded-md',
    padding: '2px 0 2px 0',
    transition: 'all 0.2s ease-in-out',
    width: 'w-full',
    '&:hover': {
      borderColor: 'border-purple-500',
      boxShadow: 'shadow-sm shadow-purple-500',
    },
    boxShadow: state.isFocused ? 'outline-none ring-1 ring-purple-500' : 'none', // Foco com roxo
    borderColor: state.isFocused ? 'border-purple-500' : 'border-gray-400',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'text-gray-400',
    fontFamily: 'Inter',
    fontSize: 'text-base',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#E6E6FA' : 'white',
    color: state.isSelected ? 'black' : 'light-grey',
    '&:hover': { backgroundColor: '#E6E6FA !important' },
    display: 'flex',
    alignItems: 'center',
  }),
  indicatorsContainer: () => ({
    gap: '0',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}

const SingleSelectComboBox: React.FC<SingleSelectComboBoxProps> = ({
  options,
  label,
  value,
  onChange,
  isDisabled = false,
  instanceId,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Select
        instanceId={instanceId}
        options={options}
        value={value && value.value !== '' ? value : null}
        onChange={onChange}
        placeholder="Selecione uma opção"
        isDisabled={isDisabled}
        styles={customStyles}
        classNames={{
          control:
            () => `mt-1 w-full rounded-md border border-solid border-gray-400 p-2
          transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 
          focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`,
          placeholder: () => 'text-gray-400 text-base',
          valueContainer: () => 'text-base',
        }}
        components={{ ClearIndicator, DropdownIndicator }}
      />
    </div>
  )
}

export default SingleSelectComboBox
