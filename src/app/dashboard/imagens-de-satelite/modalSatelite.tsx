// "use client"



import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";



export function ModalSatelite(){
  return (
    <>
     
        {/* <Dialog.Trigger>{children}</Dialog.Trigger> */}

        <Dialog.Portal>
          <Dialog.Overlay
          className="fixed bg-black/70 inset-0" />

          <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-c-blue-800 flex w-[85%] h-[95%] rounded-xl flex-col p-5 text-white">
            <Dialog.Title>
              <p className="text-[50px] self-end">Marketing</p>
            </Dialog.Title>

            <div>
              <div>
                <p className="flex items-center">
                  <span className="bg-white/10 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                    1
                  </span>
                  De 1 a 5, o quanto a instituição considera que esta área
                  precisa ser trabalhada?
                </p>
              </div>
            </div>

            <Dialog.Close
            className="absolute top-8 right-6 text-white text-xl">
              <X />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
    
    </>
  );
}
