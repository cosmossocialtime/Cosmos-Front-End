import { InputHTMLAttributes } from "react"

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}


export function Input(props : inputProps) {
    return (
        <input
            {...props} 
            className="w-0 flex-1 outline-none bg-transparent"
        />
    )
}