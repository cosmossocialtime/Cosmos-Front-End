interface PageTitleProps {
    text: string;
  }
   
  export function PageTitle({ text }: PageTitleProps) {
    return <h2 className="text-[20px] font-medium leading-[27px] text-gray-800 mb-6">{text}</h2>;
  }