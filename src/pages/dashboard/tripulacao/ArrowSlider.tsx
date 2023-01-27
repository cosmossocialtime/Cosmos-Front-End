import Image from "next/image";
import { ArrowRight } from "phosphor-react";
// import ArrowRight from "../../../../public/images/tripulacao/arrowLeft.svg";

export function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <div
      onClick={props.onClick}
      className="z-40 absolute top-1/2 bottom-1/2 right-16 lg:visible lg:flex  cursor-pointer text-lg bg-zinc-200 p-5 flex items-center justify-center rounded-full"
    >
      {/* <Image src={ArrowRight} alt="Arrow Right" /> */}
      <ArrowRight />
    </div>
  );
}
