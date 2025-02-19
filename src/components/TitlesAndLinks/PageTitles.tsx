interface PageTitleProps {
    text: string;
  }
   
  export function PageTitle({ text }: PageTitleProps) {
    return <h2 className="mb-4 text-3xl text-black">{text}</h2>;
  }