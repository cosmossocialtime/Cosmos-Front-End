import { useState } from "react";
import Select, { StylesConfig, components } from "react-select";
import Image from "next/image";

interface Option {
    value: string;
    label: string;
}

interface SingleSelectComboBoxProps {
    options: Option[];
    label?: string;
    onChange?: (selected: Option | null) => void;
    isDisabled?: boolean;
    value?: Option | null;
    instanceId?: string;
}

const DropdownIndicator = (props: any) => {
    const { selectProps } = props;
    const isOpen = selectProps.menuIsOpen;

    return (
        <components.DropdownIndicator {...props}>
            <Image
                src="/images/arrow-down.svg"
                alt="Abrir dropdown"
                width={16}
                height={12}
                style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease-in-out",
                }}
            />
        </components.DropdownIndicator>
    );
};

// **Remover o "X |" extra**
const ClearIndicator = (props: any) => {
    return null; // Não exibe o botão de limpar tudo
};

// Estilos customizados (mesmo do MultiSelect)
const customStyles: StylesConfig<any, false> = {
    control: (base, state) => ({
        ...base,
        border: "1px solid #9CA3AF",
        borderRadius: "6px",
        padding: "6px 8px",
        transition: "all 0.2s ease-in-out",
        width: "100%",
        "&:hover": { borderColor: "#9333EA", boxShadow: "0 1px 2px rgba(147, 51, 234, 0.2)" },
        boxShadow: state.isFocused ? "0 0 0 2px rgba(147, 51, 234, 0.4)" : "none",
        borderColor: state.isFocused ? "#9333EA" : "#9CA3AF",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#E6E6FA" : "white",
        color: state.isSelected ? "black" : "black",
        "&:hover": { backgroundColor: "#E6E6FA !important" },
        display: "flex",
        alignItems: "center",
    }),
    indicatorsContainer: (base) => ({
        gap: "0",
    }),
    indicatorSeparator: () => ({
        display: "none"
    }),
};

const SingleSelectComboBox: React.FC<SingleSelectComboBoxProps> = ({ options, label, onChange, isDisabled = false, instanceId }) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const handleChange = (selected: Option | null) => {
        setSelectedOption(selected);
        onChange?.(selected);
    };

    return (
        <div className="w-full">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <Select
                instanceId={instanceId}
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder="Selecione"
                isDisabled={isDisabled}
                styles={customStyles}
                className="mt-1"
                components={{ ClearIndicator, DropdownIndicator }}
            />
        </div>
    );
};

export default SingleSelectComboBox;