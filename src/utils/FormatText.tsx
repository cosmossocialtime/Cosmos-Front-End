type FormatTextType = {
  text: string
  className?: string
}

export default function FormatText({ text, className }: FormatTextType) {
  const paragraphs = text.split('\n')

  return (
    <>
      {paragraphs.map((paragraph, key) => (
        <p key={key} className={className}>
          {paragraph}
        </p>
      ))}
    </>
  )
}
