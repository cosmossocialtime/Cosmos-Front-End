import { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from 'next/image';

interface MaskedDateFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: string;
    setValue: UseFormSetValue<any>;
}

export default function MaskedDateField({
    label,
    name,
    placeholder = "Escreva ou selecione uma data",
    error,
    setValue
}: MaskedDateFieldProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [inputValue, setInputValue] = useState("");

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const formattedDate = date.toLocaleDateString("pt-BR"); 
            setValue(name, formattedDate, { shouldValidate: true });
            setInputValue(formattedDate);
        }
    };

    return (
        <div className="w-full relative">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <InputMask
                    mask="99/99/9999"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={(e) => setValue(name, e.target.value, { shouldValidate: true })}
                    placeholder={placeholder}
                    className={`mt-1 p-2 w-full rounded-md border border-solid border-gray-400 transition-all duration-200
                                             hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500
                                             focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
                />
                <div className="absolute right-3 top-2 cursor-pointer text-gray-500">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        customInput={
                            <button type="button" className="p-2 border-none bg-transparent cursor-pointer">
                                <Image src="/images/Calendar.png" alt="Calendário" width={20} height={20} />
                            </button>
                        }
                    />
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}