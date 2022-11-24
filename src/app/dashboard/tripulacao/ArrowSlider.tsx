import Image from "next/image";
import ArrowRight from "../../../../public/images/tripulacao/arrowLeft.svg";

export function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <div
      onClick={props.onClick}
      className="z-40 absolute top-1/2 bottom-1/2 right-16 lg:visible lg:flex w-16 h-16 cursor-pointer"
    >
      <Image src={ArrowRight} alt="Arrow Right" />
    </div>
  );
}
