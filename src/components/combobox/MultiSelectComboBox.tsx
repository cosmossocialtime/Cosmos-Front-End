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
    border: '1px solid #9CA3AF', // Cinza padrão border-gray-400
    borderRadius: '6px', // Borda arredondada como no Tailwind `rounded-md`
    padding: '6px 8px',
    transition: 'all 0.2s ease-in-out',
    width: '100%', // Garante que ocupa toda a largura
    '&:hover': {
      borderColor: '#9333EA',
      boxShadow: '0 1px 2px rgba(147, 51, 234, 0.2)',
    }, // Hover roxo
    boxShadow: state.isFocused ? '0 0 0 2px rgba(147, 51, 234, 0.4)' : 'none', // Foco com roxo
    borderColor: state.isFocused ? '#9333EA' : '#9CA3AF',
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
    padding: '6px 8px', // Padding interno
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
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(
    [] as MultiValue<Option>,
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
        value={selectedOptions}
        onChange={handleChange}
        placeholder="Selecione uma ou mais opções"
        closeMenuOnSelect={false}
        styles={customStyles}
        className="mt-1"
        components={{ ClearIndicator, DropdownIndicator }} // Remove o "X |" extra
      />

      {maxSelections && selectedOptions.length >= maxSelections && (
        <p className="mt-1 text-sm text-red-500">
          Você só pode selecionar até {maxSelections} opções.
        </p>
      )}
    </div>
  )
}

export default MultiSelectComboBox
