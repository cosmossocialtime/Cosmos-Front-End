interface ButtonProps{
    text: string;
    type?: "button" | "submit" | "reset";
    disabled? : boolean;
    isLoading?: boolean;
    onClick?: () => void;
}

export function Button({ text, type, disabled, onClick}: ButtonProps) {
    return(
        <button
        type ={type}
        disabled= {disabled}
        onClick = {onClick}
        className={`w-full rounded-md p-2 mt-[20px] text-white transition colorButton font-normal ${disabled ? "disabled" : ""}`}
        >
            {text}
        </button>
    );
}