// "use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";


// import * as Dialog from "@radix-ui/react-dialog";

interface ItemSateliteProps {
  sateliteImg: string;
  imgAlt: string;
  sateliteName: string;
  handleModal?: () => void;
}

export function ItemSatelite({
  sateliteImg,
  imgAlt,
  sateliteName,
}: ItemSateliteProps) {
  return (
    <Dialog.Trigger>
      <div
        className="bg-zinc-200/5 w-fit h-fit rounded-lg py-3 flex flex-col items-center cursor-pointer backdrop-blur-sm">
        <img src={sateliteImg} alt={imgAlt} className="mx-auto" />
        <p className="w-[130px] text-center font-bold text-white">
          {sateliteName}
        </p>
      </div>
    </Dialog.Trigger>
  );
}
