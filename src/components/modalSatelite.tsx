import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";

export default function ModalSatelite() {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>opeeeen</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed bg-black/70 inset-0" />

          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 flex justify-center items-center w-[85%] h-[95%] rounded-xl flex-col">

            <Dialog.Title>Marketing</Dialog.Title>

            <div className="text-white">
              <div>
                <p className="flex items-center">
                  <span className="bg-blue-800 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                    1
                  </span>
                  De 1 a 5, o quanto a instituição considera que esta área
                  precisa ser trabalhada?
                </p>
              </div>
            </div>

            <Dialog.Close className="absolute top-8 right-6 text-white text-xl">
                <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
