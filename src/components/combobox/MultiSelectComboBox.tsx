import dynamic from 'next/dynamic'

import { useState } from 'react'
import { MultiValue, StylesConfig, components } from 'react-select'
import Image from 'next/image'

const Select = dynamic(() => import('react-select'), { ssr: false })

interface Option {
  value: string
  label: string
}

interface MultiSelectComboBoxProps {
  options: Option[]
  maxSelections?: number // Define o máximo de seleções (opcional)
  label?: string
  value?: MultiValue<Option>
  onChange?: (selected: MultiValue<Option>) => void
  error?: string
}

// ** Criar um `DropdownIndicator` que usa a seta exportada**
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

// Definição dos estilos customizados
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customStyles: StylesConfig<any, true> = {
  control: (base, state) => ({
    ...base,
    border: 'border solid border-gray-400', // Cinza padrão border-gray-400
    borderRadius: 'rounded-md', // Borda arredondada como no Tailwind `rounded-md`
    padding: '2px 0 2px 0',
    transition: 'all 0.2s ease-in-out',
    width: 'w-full', // Garante que ocupa toda a largura
    '&:hover': {
      borderColor: 'border-purple-500',
      boxShadow: 'shadow-sm shadow-purple-500',
    }, // Hover roxo
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
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: '#E6E6FA !important',
    },
    '*': {
      backgroundColor: 'transparent !important', // Remove qualquer cor interna diferente },
    },
    display: 'flex',
    alignItems: 'center',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#E6F4FF', // Fundo do item selecionado
    borderRadius: '100px', // Bordas arredondadas para os itens selecionados
    border: '1px solid #0890F7', // Cor da borda
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#000', // Cor do texto dos itens selecionados
  }),
  multiValueRemove: (base) => ({
    ...base,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#E6F4FF',
      color: '#0890F7', // Ícone de remover na cor azul ao passar o mouse
    },
  }),
  indicatorsContainer: () => ({
    gap: '0',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}

// **Remover o "X |" extra**
const ClearIndicator = () => {
  return null // Não exibe o botão de limpar tudo
}

const MultiSelectComboBox: React.FC<MultiSelectComboBoxProps> = ({
  options,
  maxSelections,
  label,
  value,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(
    [] as MultiValue<Option>
  )

  const handleChange = (selected: MultiValue<Option>) => {
    if (maxSelections && selected.length > maxSelections) {
      return
    }
    setSelectedOptions(selected)
    if (onChange) {
      onChange(selected)
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Select
        options={options}
        isMulti
        value={value ? value : selectedOptions}
        onChange={handleChange}
        placeholder="Selecione uma ou mais opções"
        closeMenuOnSelect={false}
        styles={customStyles}
        classNames={{
          control:
            () => `mt-1 w-full rounded-md border border-solid border-gray-400 p-2
          transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 
          focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`,
          placeholder: () => 'text-gray-400 text-base',
          valueContainer: () => 'text-base',
        }}
        components={{ ClearIndicator, DropdownIndicator }} // Remove o "X |" extra
      />

      {maxSelections && selectedOptions.length > maxSelections && (
        <p className="mt-1 text-sm text-red-500">
          Você só pode selecionar até {maxSelections} opções.
        </p>
      )}
    </div>
  )
}

export default MultiSelectComboBox
