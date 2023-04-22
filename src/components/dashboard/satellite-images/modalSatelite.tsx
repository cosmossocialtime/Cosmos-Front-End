import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from '@radix-ui/react-slider';
import { X } from "phosphor-react";
import { Slide } from "react-toastify";
type NamesPlanet = {
  name: string
}

export default function ModalSatelite({ name }: NamesPlanet) {

  return (
    <>
      <Dialog.Portal >
        <Dialog.Overlay className="fixed bg-black/70 inset-0 z-[2]" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-c-blue-800 flex w-[70%] h-[95%] rounded-xl flex-col p-5 text-white z-10">
          <Dialog.Title>
            <p className="text-[50px] self-end">{name}</p>
          </Dialog.Title>

          <div className="pt-10">
            <div>
              <h2 className="flex items-center gap-4 text-xl">
                <span className="bg-white/10 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                  1
                </span>
                De 1 a 5, o quanto a instituição considera que esta área precisa
                ser trabalhada?
              </h2>
              <div className="mt-10 flex justify-between w-[500px] relative bg-c-blue-700 h-1 items-center rounded-lg before:rounded-lg before:absolute before:top-0 before:left-2 before:h-1 before:w-[200px] before:bg-c-blue-300 before:content-center">
                <div className="pt-9 flex flex-col items-center z-10 w-24">
                  <span className="rounded-full bg-c-blue-300 border-2 border-c-blue-300 py-1 px-3">1</span>
                  <span className="pt-3">Muito pouco</span>
                </div>
                <div className="pt-9 flex flex-col items-center z-10 w-24">
                  <span className="rounded-full bg-c-blue-300 border-2 border-c-blue-300 py-1 px-3">2</span>
                  <span className="pt-3">Pouco</span>
                </div>
                <div className="pt-9 flex flex-col items-center z-10 w-24">
                  <span className="rounded-full bg-c-blue-700 border-2 border-c-blue-300 py-1 px-3">3</span>
                  <span className="pt-3">Medio</span>
                </div>
                <div className="pt-9 flex flex-col items-center z-10 w-24">
                  <span className="rounded-full bg-c-blue-700 border-2 border-c-blue-300 py-1 px-3">4</span>
                  <span className="pt-3">Intermediario</span>
                </div>
                <div className="pt-9 flex flex-col items-center z-10 w-24">
                  <span className="rounded-full bg-c-blue-700 border-2 border-c-blue-300 py-1 px-3">5</span>
                  <span className="pt-3">Muito</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-28 gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="bg-white/10 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                  2
                </span>
                Como é feito o marketing (comunicação) na instituição hoje?
              </h2>
              <p className="w-3/4 ml-12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat eos amet voluptatibus ipsa, atque dolorem fugit nobis
                molestias, dolorum animi ipsam neque? Similique dicta assumenda
                enim, sapiente veniam non ullam!
              </p>
            </div>
            <div className="flex flex-col pt-20 gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="bg-white/10 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                  3
                </span>
                A forma como o marketing (comunicação) é feito atualmente atende
                às necessidades da instituição? O que poderia melhorar?
              </h2>
              <p className="w-3/4 ml-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac
                quam eu ex faucibus ornare non non urna. Cras malesuada et nunc
                at laoreet. Vivamus odio felis, feugiat In ac quam eu ex
                faucibus ornare non non urna. Cras malesuada et nunc at laoreet.
              </p>
            </div>
          </div>

          <Dialog.Close className="absolute top-8 right-6 text-white text-xl">
            <X />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
}