import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

type SateliteProps = {
  children: ReactNode,
  className?: string
}

export function ItemSatelite({className, children}:SateliteProps) {
  return (
    <Dialog.Trigger className={`${className}`}>
      <div className="bg-zinc-200/5 text-white w-full h-full rounded-lg py-3 flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm">
        {children}
      </div>
    </Dialog.Trigger>
  );
}
