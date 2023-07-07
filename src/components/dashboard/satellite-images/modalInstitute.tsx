import * as Dialog from '@radix-ui/react-dialog'
import { Cake, Coins, Heart, MapPin, UsersFour, X } from 'phosphor-react'

type NamesPlanet = {
  name?: string
}

export default function ModalInstitute({ name }: NamesPlanet) {
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[2] bg-black/70" />

        <Dialog.Content className="scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full fixed top-1/2 left-1/2 z-10 flex h-[95%] w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-xl bg-c-blue-800 p-10 pl-10 text-white">
          <Dialog.Title>
            <p className="self-end text-[50px]">{name}</p>
          </Dialog.Title>

          <div className="mt-3 flex gap-4">
            <span className="flex gap-2">
              <Cake size={24} /> 10/01/2023
            </span>
            <span className="flex gap-2">
              <MapPin size={24} /> João Pessoa - PB
            </span>
            <span className="flex gap-2">
              <UsersFour size={24} /> 18 Colaboradores
            </span>
            <span className="flex gap-2">
              <Coins size={24} /> 85.0000,00 receita anual
            </span>
            <span className="flex gap-2">
              <Heart size={24} /> 32 Beneficiários
            </span>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="flex items-center gap-4 text-xl">
              <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                1
              </span>
              Causa em que atua
            </h2>
            <span className="ml-12 w-fit rounded-lg bg-white/5 p-3">
              Proteção animal
            </span>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="flex items-center gap-4 text-xl">
              <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                2
              </span>
              História
            </h2>
            <p className="ml-12 w-3/4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              eos amet voluptatibus ipsa, atque dolorem fugit nobis molestias,
              dolorum animi ipsam neque? Similique dicta assumenda enim,
              sapiente veniam non ullam!
            </p>
          </div>
          <div className="mt-10 flex flex-col  gap-5">
            <h2 className="flex items-center gap-4 text-xl">
              <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                3
              </span>
              Atuação e impacto social
            </h2>
            <p className="ml-12 w-3/4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              eos amet voluptatibus ipsa, atque dolorem fugit nobis molestias,
              dolorum animi ipsam neque? Similique dicta assumenda enim,
              sapiente veniam non ullam!
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="flex items-center gap-4 text-xl">
              <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                4
              </span>
              Principais necessidades e desafios
            </h2>
            <p className="ml-12 w-3/4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac
              quam eu ex faucibus ornare non non urna. Cras malesuada et nunc at
              laoreet. Vivamus odio felis, feugiat In ac quam eu ex faucibus
              ornare non non urna. Cras malesuada et nunc at laoreet.
            </p>
          </div>

          <Dialog.Close className="absolute top-8 right-6 text-xl text-white">
            <X />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
