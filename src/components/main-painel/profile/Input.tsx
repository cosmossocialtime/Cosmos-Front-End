import { InputHTMLAttributes } from 'react'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: inputProps) {
  return <input {...props} className="flex-1 py-4 px-6 outline-none" />
}
