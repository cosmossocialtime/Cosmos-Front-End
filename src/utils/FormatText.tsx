type FormatTextType = {
    text: string
}

export default function FormatText({ text }: FormatTextType){
    const paragraphs = text.split("\n")

    return (
        <>
            {paragraphs.map((paragraph, key)=> (
                <p key={key}>{paragraph}</p>
            ))}
        </>
    )
}