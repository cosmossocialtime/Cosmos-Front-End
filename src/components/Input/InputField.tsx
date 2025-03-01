import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: string;
}

export default function InputField({
    label,
    name,
    type = "text",
    placeholder,
    register,
    error,
}: InputFieldProps) {
    return (
        <div className="w-full">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                {...register(name)}
                id={name}
                type={type}
                placeholder={placeholder}

                className={`mt-1 p-2 w-full rounded-md border border-solid border-gray-400 transition-all duration-200 
          mt-1 p-2 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 
          focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
        //   ${error ? "border-red-500" : ""}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}