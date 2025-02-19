import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
 
interface InputEmailProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  error?: string;
}
 
export function InputEmail({ id, label, register, error, ...rest }: InputEmailProps) {
  return (
<div className="flex w-full max-w-md flex-col gap-1">
<label htmlFor={id}>{label}</label>
<input
        {...register(id, {
          required: "O campo e-mail é obrigatório",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "O formato do e-mail está incorreto",
          },
        })}
        id={id}
        type="email"
        className="rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        {...rest}
      />
      {error && <span className="text-sm text-rose-600">{error}</span>}
</div>
  );
}