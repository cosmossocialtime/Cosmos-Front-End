import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { HTMLAttributes } from "react";

interface ItemSateliteProps {
  sateliteImg: string;
  imgAlt: string;
  sateliteName: string;
  handleModal?: () => void;
  className: string;
}

export function ItemSatelite({
  sateliteImg,
  imgAlt,
  sateliteName,
  className,
}: ItemSateliteProps) {
  return (
    <Dialog.Trigger className={`${className}`}>
      <div className="w-36 h-36">
        <div className="bg-zinc-200/5 w-full h-full rounded-lg py-3 flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm">
          <Image
            src={sateliteImg}
            alt={imgAlt}
            className="mx-auto"
            width={52}
            height={52}
          />
          <p className="w-[130px] text-center font-bold text-white">
            {sateliteName}
          </p>
        </div>
      </div>
    </Dialog.Trigger>
  );
}
