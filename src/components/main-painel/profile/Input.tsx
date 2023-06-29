import { InputHTMLAttributes } from 'react'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: inputProps) {
  return (
    <input
      {...props}
      className="w-0 flex-1 bg-transparent py-4 px-6 outline-none"
    />
  )
}
