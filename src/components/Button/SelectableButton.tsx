import { ReactNode } from "react";

interface SelectableButtonProps {
    onClick: () => void;
    icon: ReactNode;
    text: string;
    arrow: ReactNode;
}

export function SelectableButton({ onClick, icon, text,arrow }: SelectableButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center justify-between w-full h-[80px] px-6 py-4 border border-solid border-[#D0D5E5] rounded-[16px] hover:bg-gray-100 transition"
        >
            <div className="flex items-center">
                <span className="mr-3 text-gray-600 w-[20px] h-[20px] flex-shrink-0">
                    {icon}
                </span>
                <span className="text-gray-800 text-sm flex-grow text-left">
                    {text}
                </span>
            </div>
            <span className="text-gray-600 w-[20px] h-[20px] flex-shrink-0">
                {arrow}
            </span>
        </button>
    );
}