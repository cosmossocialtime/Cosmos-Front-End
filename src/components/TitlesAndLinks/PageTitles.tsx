interface PageTitleProps {
  text: string
}

export function PageTitle({ text }: PageTitleProps) {
  return (
    <h2 className="mb-6 text-[20px] font-medium leading-[27px] text-gray-800">
      {text}
    </h2>
  )
}
