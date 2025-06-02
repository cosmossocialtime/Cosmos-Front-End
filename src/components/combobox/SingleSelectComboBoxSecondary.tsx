import Select, { StylesConfig, components } from 'react-select'
import Image from 'next/image'

interface Option {
  value: string
  label: string
}

interface SingleSelectComboBoxSecondaryProps {
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
    backgroundColor: 'rgba(139, 92, 246, 0.5)', // bg-violet-600/50
    color: '#fff',
    border: `1px solid ${state.isFocused ? '#fff' : 'rgba(255,255,255,0.3)'}`,
    borderRadius: '0.5rem',
    padding: '4px 8px',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 255, 255, 0.4)' : 'none',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#fff',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#fff',
  }),
  input: (base) => ({
    ...base,
    color: '#fff',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#1e1b4b', // fundo escuro para o dropdown
    color: '#fff',
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#7c3aed' // highlight roxo
      : state.isFocused
      ? '#4c1d95'
      : 'transparent',
    color: '#fff',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#7c3aed',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#fff',
    '&:hover': {
      color: '#fff',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.5)',
  }),
}

const SingleSelectComboBoxSecondary: React.FC<
  SingleSelectComboBoxSecondaryProps
> = ({ options, label, value, onChange, isDisabled = false, instanceId }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-base font-semibold text-white">{label}</label>
      )}
      <Select
        instanceId={instanceId}
        options={options}
        value={value && value.value !== '' ? value : null}
        onChange={onChange}
        placeholder="Selecione uma opção"
        isDisabled={isDisabled}
        styles={customStyles}
        className="mt-1"
        components={{ ClearIndicator, DropdownIndicator }}
      />
    </div>
  )
}

export default SingleSelectComboBoxSecondary
