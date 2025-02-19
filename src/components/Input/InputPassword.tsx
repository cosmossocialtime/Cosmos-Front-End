import { useState, InputHTMLAttributes } from "react";
import { Eye, EyeClosed } from 'phosphor-react'
import { UseFormRegister } from "react-hook-form";


interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    register: UseFormRegister<any>;
    error?: string;
    helperText?: string;
}

export function InputPassword({ id, label, register, error, helperText, ...rest }: InputPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex w-full max-w-md flex-col gap-1" >
            <label htmlFor={id}> {label} </label>
            < div className="relative flex w-full max-w-md" >
                <input
                    {
                    ...register(id, {
                        required: "O campo senha é obrigatório",
                        minLength: {
                            value: 8,
                            message: "A senha deve ter no mínimo 8 caracteres.",
                        },
                    })
                    }
                    id={id}
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    {...rest}
                />
                < button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)
                    }
                    className="absolute right-2 top-3"
                >
                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <span className={`leading-[1.1] text-[12px] ${error ? 'text-rose-600' : 'text-gray-600'}`}>
                {error ? error : helperText}
            </span>
        </div>
    );
}