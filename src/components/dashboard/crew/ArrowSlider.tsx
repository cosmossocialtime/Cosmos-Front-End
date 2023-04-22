import { ArrowRight } from "phosphor-react";

export default function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <div
      onClick={props.onClick}
      className="z-40 absolute top-1/2 bottom-1/2 right-16 lg:visible lg:flex  cursor-pointer text-lg bg-blue-100 h-10 w-10 flex items-center justify-center rounded-full"
    >
      <ArrowRight />
    </div>
  );
}