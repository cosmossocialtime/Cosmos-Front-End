interface TermsTextProps {
  title: string
  paragraphs: string[]
  linkText: string
  linkHref?: string
}

export const TermsText: React.FC<TermsTextProps> = ({
  title,
  paragraphs,
  linkText,
  linkHref = '#',
}) => (
  <section className="w-[980px] pt-6">
    <h2 className="font-inter text-[20px] font-medium leading-[27px] text-[#1B2031]">
      {title}
    </h2>
    {paragraphs.map((text, index) => (
      <p
        key={index}
        className="font-inter pt-6 text-[16px] font-normal leading-[20px] text-[#1B2031]"
      >
        {text}
      </p>
    ))}
    <p className="font-inter pt-4 text-[16px] font-normal leading-[20px] text-[#1B2031]">
      Para mais informações sobre como as suas informações serão tratadas,
      acesse o
      <a
        href={linkHref}
        className="font-inter mt-2 cursor-pointer font-semibold leading-[19.2px] text-[#0890F7]"
      >
        {' '}
        {linkText}
      </a>
    </p>
  </section>
)
