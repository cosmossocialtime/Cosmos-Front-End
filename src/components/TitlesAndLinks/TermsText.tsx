interface TermsTextProps {
    title: string;
    paragraphs: string[];
    linkText: string;
    linkHref?: string;
}

export const TermsText: React.FC<TermsTextProps> = ({ title, paragraphs, linkText, linkHref = "#" }) => (
    <section className="w-[980px] pt-6">
        <h2 className="text-[20px] font-medium text-[#1B2031] leading-[27px] font-inter">
            {title}
        </h2>
        {paragraphs.map((text, index) => (
            <p key={index} className="text-[16px] pt-6 font-normal text-[#1B2031] leading-[20px] font-inter">
                {text}
            </p>
        ))}
        <p className="text-[16px] pt-4 font-normal text-[#1B2031] leading-[20px] font-inter">
            Para mais informações sobre como as suas informações serão tratadas, acesse o
            <a href={linkHref} className="font-semibold text-[#0890F7] leading-[19.2px] font-inter mt-2 cursor-pointer">
                {" "}{linkText}
            </a>
        </p>
    </section>
);