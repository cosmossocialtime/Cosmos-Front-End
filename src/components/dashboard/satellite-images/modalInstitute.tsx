import * as Dialog from "@radix-ui/react-dialog";
import { Cake, Coins, Heart, MapPin, UsersFour, X } from "phosphor-react";

type NamesPlanet = {
  name: string
}

export default function ModalInstitute({ name }: NamesPlanet) {

  return (
    <>
      <Dialog.Portal >
        <Dialog.Overlay className="fixed bg-black/70 inset-0 z-[2]" />

        <Dialog.Content className="overflow-y-auto scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full fixed pl-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-c-blue-800 flex w-[80%] h-[95%] rounded-xl flex-col p-5 text-white z-10">
          <Dialog.Title>
            <p className="text-[50px] self-end">{name}</p>
          </Dialog.Title>

        <div className="flex gap-4 mt-3">
          <span className="flex gap-2"><Cake size={24} /> 10/01/2023</span>
          <span className="flex gap-2"><MapPin size={24} /> João Pessoa - PB</span>
          <span className="flex gap-2"><UsersFour size={24} /> 18 Colaboradores</span>
          <span className="flex gap-2"><Coins size={24} /> 85.0000,00 receita mensal</span>
          <span className="flex gap-2"><Heart size={24} /> 32 Beneficiários</span>
        </div>
        <div className="flex flex-col mt-10 gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="bg-white/10 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                  1
                </span>
                Causa em que atua
              </h2>
              <span className="p-3 bg-white/5 w-fit rounded-lg ml-12">
                Proteção animal
              </span>
            </div>
            <div className="flex flex-col mt-10 gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="bg-white/10 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                 2
                </span>
                História
              </h2>
              <p className="w-3/4 ml-12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat eos amet voluptatibus ipsa, atque dolorem fugit nobis
                molestias, dolorum animi ipsam neque? Similique dicta assumenda
                enim, sapiente veniam non ullam!
              </p>
            </div>
        <div className="flex flex-col mt-10  gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="bg-white/10 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                  3
                </span>
                Atuação e impacto social
              </h2>
              <p className="w-3/4 ml-12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat eos amet voluptatibus ipsa, atque dolorem fugit nobis
                molestias, dolorum animi ipsam neque? Similique dicta assumenda
                enim, sapiente veniam non ullam!
              </p>
            </div>
            <div className="flex flex-col mt-10 gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="bg-white/10 p-2 rounded-full aspect-square flex justify-center items-center h-8">
                  4
                </span>
                Principais necessidades e desafios
              </h2>
              <p className="w-3/4 ml-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac
                quam eu ex faucibus ornare non non urna. Cras malesuada et nunc
                at laoreet. Vivamus odio felis, feugiat In ac quam eu ex
                faucibus ornare non non urna. Cras malesuada et nunc at laoreet.
              </p>
            </div>
        
          <Dialog.Close className="absolute top-8 right-6 text-white text-xl">
            <X />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
}
