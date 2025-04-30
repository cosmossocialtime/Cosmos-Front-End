type InputEmailListProps = {
  id: string
  label?: string
  register: any
  error?: string
  autoFocus?: boolean
  placeholder?: string
}

export const InputEmailList = ({
  id,
  label,
  register,
  error,
  autoFocus,
  placeholder,
}: InputEmailListProps) => {
  return (
    <div className="flex w-full max-w-md flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type="email"
        {...register(`emails.${Number(id.replace('email', ''))}.email`)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      {error && (
        <p className="text-[12px] text-sm leading-[1.1] text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}
