// "use client";

import Image from "next/image";

// import * as Dialog from "@radix-ui/react-dialog";

interface ItemSateliteProps {
  sateliteImg: string;
  imgAlt: string;
  sateliteName: string;
  handleModal?: () => void;
};

export function ItemSatelite({
  sateliteImg,
  imgAlt,
  sateliteName,
  handleModal,
}: ItemSateliteProps) {
  return (
    <div className="bg-zinc-200/5 w-fit h-fit rounded-lg py-3 flex flex-col items-center cursor-pointer backdrop-blur-sm"
    onClick={handleModal}>
      <img src={sateliteImg} alt={imgAlt} className="mx-auto" />
      <p className="w-[130px] text-center font-bold text-white">
        {sateliteName}
      </p>
    </div>
  );
}
