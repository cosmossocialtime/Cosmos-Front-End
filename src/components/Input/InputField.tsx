import { UseFormRegister } from 'react-hook-form'

interface InputFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  disabled?: boolean
  register: UseFormRegister<any>
  error?: string
  className?: string
}

export default function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  disabled = false,
  register,
  error,
  className,
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
        disabled={disabled}
        className={`${className} mt-1 w-full rounded-md border border-solid border-gray-400 p-2
          transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 
          focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
            disabled ? 'disabled:opacity-50' : ''
          }`}
        //   ${error ? "border-red-500" : ""}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
