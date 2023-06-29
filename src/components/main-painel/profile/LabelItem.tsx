import React, { ReactNode } from 'react'
// import * as Label from '@radix-ui/react-label'

interface LabelItemProps {
  title: string
  enableForm: boolean
  children: ReactNode
  className?: string
}

export default function LabelItem({
  title,
  enableForm,
  children,
  className,
}: LabelItemProps) {
  return (
    <label className={`${className} w-80 text-sm text-[#8b8b8b]`}>
      {title}
      <div
        className={`${
          enableForm ? 'border' : 'border-0 border-b'
        } mt-2 flex w-full items-center gap-6 rounded-lg border-solid border-gray-200 font-medium text-gray-600`}
      >
        {children}
      </div>
    </label>
  )
}
