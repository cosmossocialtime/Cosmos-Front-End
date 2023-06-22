import React, { ReactNode } from 'react'

interface LabelItemProps {
    title: string;
    enableForm: boolean;
    children: JSX.Element;
    className?: string;
}

export default function LabelItem({ title, enableForm, children, className }: LabelItemProps) {
    return (
        <label className={`${className} w-80 text-[#8b8b8b] text-sm`}>
            {title}
            <div className={`${enableForm ? "border" : "border-b border-0"} mt-2 w-full px-6 h-14 border-gray-200 border-solid text-gray-600 font-medium flex items-center gap-6 rounded-lg`}>
                {children}
            </div>
        </label>
    )
}
