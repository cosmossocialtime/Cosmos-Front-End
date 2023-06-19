import React, { ReactNode } from 'react'

interface LabelItemProps {
  title: string
  enableForm: boolean
  children: ReactNode
}

export default function LabelItem({
  title,
  enableForm,
  children,
}: LabelItemProps) {
  return (
    <label className="w-80 text-sm text-[#8b8b8b]">
      {title}
      <div
        className={`${
          enableForm ? 'border' : 'border-0 border-b'
        } mt-2 flex h-14 w-full items-center gap-6 rounded-lg border-solid border-gray-200 px-6 font-medium text-gray-600`}
      >
        {children}
      </div>
    </label>
  )
}
