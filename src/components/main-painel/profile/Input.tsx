import { InputHTMLAttributes } from "react"

interface inputProps extends InputHTMLAttributes<HTMLInputElement> { }


export default function Input(props: inputProps) {
    return (
        <input
            {...props}
            className="py-4 px-6 w-0 flex-1 outline-none bg-transparent"
        />
    )
}