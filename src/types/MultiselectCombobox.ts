import { MultiValue } from "react-select";

export interface Option {
    value: string;
    label: string;
}


export interface MultiSelectComboBoxProps {
    options: Option[];
    maxSelections?: number; // Define o máximo de seleções (opcional)
    label?: string;
    onChange?: (selected: MultiValue<Option>) => void;
}