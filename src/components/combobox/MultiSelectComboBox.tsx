import { useState } from "react";
import Select, { MultiValue, StylesConfig, components } from "react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from 'phosphor-react';// Ícone de check do Lucide
import Image from 'next/image';


interface Option {
    value: string;
    label: string;
}

interface MultiSelectComboBoxProps {
    options: Option[];
    maxSelections?: number; // Define o máximo de seleções (opcional)
    label?: string;
    onChange?: (selected: MultiValue<Option>) => void;
}



// ** Criar um `DropdownIndicator` que usa a seta exportada**
const DropdownIndicator = (props: any) => {
    const { menuIsOpen } = props;

    return (
        <components.DropdownIndicator {...props}>
            <Image
                src="/images/arrow-down.svg"
                alt="Abrir dropdown"
                width={16}
                height={12}
                style={{
                    transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)", // Gira ao abrir
                    transition: "transform 0.2s ease-in-out",
                }}
            />
        </components.DropdownIndicator>
    );
};

// Definição dos estilos customizados
const customStyles: StylesConfig<any, true> = {
    control: (base, state) => ({
        ...base,
        border: "1px solid #9CA3AF", // Cinza padrão border-gray-400
        borderRadius: "6px", // Borda arredondada como no Tailwind `rounded-md`
        padding: "6px 8px",
        transition: "all 0.2s ease-in-out",
        width: "100%", // Garante que ocupa toda a largura
        "&:hover": {
            borderColor: "#9333EA", boxShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
        }, // Hover roxo
        boxShadow: state.isFocused ? "0 0 0 2px rgba(147, 51, 234, 0.4)" : "none", // Foco com roxo
        borderColor: state.isFocused ? "#9333EA" : "#9CA3AF",

    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#9333EA" : "white", // Fundo roxo quando selecionado
        color: state.isSelected ? "white" : "black", // Texto branco quando selecionado
        "&:hover": {
            backgroundColor: "#E6E6FA", // Fundo lilás ao passar o mouse
        },
        display: "flex",
        alignItems: "center",
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "#E6F4FF", // Fundo do item selecionado
        borderRadius: "100px", // Bordas arredondadas para os itens selecionados
        padding: "6px 8px", // Padding interno
        border: "1px solid #0890F7", // Cor da borda
        // borderRadius: "100px", // Borda arredondada
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: "#000", // Cor do texto dos itens selecionados

    }),
    multiValueRemove: (base) => ({
        ...base,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#E6F4FF",
            color: "#0890F7", // Ícone de remover na cor azul ao passar o mouse
        },
    }),
    indicatorsContainer: (base) => ({
        gap: "0",
    }),
    indicatorSeparator: () => ({
        display: "none"
    }),
};

// **Remover o "X |" extra**
const ClearIndicator = (props: any) => {
    return null; // Não exibe o botão de limpar tudo
};





// Componente customizado para exibir checkboxes dentro do Select
const CustomOption = (props: any) => {
    const { data, isSelected, innerRef, innerProps, selectOption } = props;

    // Impede que o react-select remova a opção ao clicar
    const handleClick = (event: any) => {
        event.stopPropagation(); // Evita que o clique feche o select
        selectOption(data); // Atualiza a seleção
    };

    return (
        <components.Option {...props}>
            <div
                ref={innerRef}
                {...innerProps}
                className={`flex items-center px-3 py-2 transition-colors cursor-pointer rounded gap-2
                            ${isSelected ? "bg-gradient-to-r from-blue-300 to-purple-500 text-white" : "hover:bg-purple-100"}`}
                onClick={handleClick}
            >
                {/* Checkbox Customizado */}
                <Checkbox.Root
                    checked={isSelected}
                    onCheckedChange={handleClick}
                    className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all
                        ${isSelected ? "border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]" : "border-gray-400 bg-white"}`}
                >
                    {isSelected && <Check size={16} className="text-white" />}
                </Checkbox.Root>

                {/* Texto customizado */}
                <span className={`${isSelected ? "text-white font-medium" : "text-gray-700"}`}>
                    {data.label}
                </span>
            </div>
        </components.Option>
    );
};



// Componente MultiSelectComboBox reutilizável
const MultiSelectComboBox: React.FC<MultiSelectComboBoxProps> = ({ options, maxSelections, label, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([] as MultiValue<Option>);

    const handleChange = (selected: MultiValue<Option>) => {
        if (maxSelections && selected.length > maxSelections) {
            return; // Impede adicionar mais opções do que permitido
        }
        setSelectedOptions(selected);
        if (onChange) {
            onChange(selected);
        }
    };

    // const handleChange = (selected: MultiValue<Option>) => {
    //     if (maxSelections && selected.length > maxSelections) {
    //         return; // Evita ultrapassar o limite
    //     }
    //     setSelectedOptions(selected);
    //     if (onChange) {
    //         onChange(selected);
    //     }
    // };



    return (
        <div className="w-full">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <Select
                options={options}
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                placeholder="Selecione uma ou mais opções"
                closeMenuOnSelect={false}
                styles={customStyles}
                className="mt-1"
                components={{ Option: CustomOption, ClearIndicator, DropdownIndicator }} // Remove o "X |" extra
            />
            {maxSelections && selectedOptions.length >= maxSelections && (
                <p className="text-red-500 text-sm mt-1">Você só pode selecionar até {maxSelections} opções.</p>
            )}
        </div>
    );
};

export default MultiSelectComboBox;


{/* <div className="my-4 flex gap-2">
<Checkbox.Root
    className={`flex  h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-zinc-50 ${acceptTerms &&
        '&& border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'
        }`}
    id="checkbox"
    required
    checked={acceptTerms}
    onCheckedChange={(checked) => {
        if (checked === true) {
            setAcceptTerms(true)
        } else {
            setAcceptTerms(false)
        }
    }}
>
    <Checkbox.Indicator>
        <Check size={32} className="p-1 font-bold text-zinc-50" />
    </Checkbox.Indicator>
</Checkbox.Root>
</div> */}