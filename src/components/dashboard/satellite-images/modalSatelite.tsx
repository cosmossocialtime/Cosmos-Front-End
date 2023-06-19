import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
type NamesPlanet = {
  name: string
}

export default function ModalSatelite({ name }: NamesPlanet) {
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[2] bg-black/70" />

        <Dialog.Content className="fixed top-1/2 left-1/2 z-10 flex h-[95%] w-[70%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-c-blue-800 p-5 text-white">
          <Dialog.Title>
            <p className="self-end text-[50px]">{name}</p>
          </Dialog.Title>

          <div className="pt-10">
            <div>
              <h2 className="flex items-center gap-4 text-xl">
                <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                  1
                </span>
                De 1 a 5, o quanto a instituição considera que esta área precisa
                ser trabalhada?
              </h2>
              <div className="relative mt-10 flex h-1 w-[500px] items-center justify-between rounded-lg bg-c-blue-700 before:absolute before:top-0 before:left-2 before:h-1 before:w-[200px] before:content-center before:rounded-lg before:bg-c-blue-300">
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span className="rounded-full border-2 border-c-blue-300 bg-c-blue-300 py-1 px-3">
                    1
                  </span>
                  <span className="pt-3">Muito pouco</span>
                </div>
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span className="rounded-full border-2 border-c-blue-300 bg-c-blue-300 py-1 px-3">
                    2
                  </span>
                  <span className="pt-3">Pouco</span>
                </div>
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span className="rounded-full border-2 border-c-blue-300 bg-c-blue-700 py-1 px-3">
                    3
                  </span>
                  <span className="pt-3">Medio</span>
                </div>
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span className="rounded-full border-2 border-c-blue-300 bg-c-blue-700 py-1 px-3">
                    4
                  </span>
                  <span className="pt-3">Intermediario</span>
                </div>
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span className="rounded-full border-2 border-c-blue-300 bg-c-blue-700 py-1 px-3">
                    5
                  </span>
                  <span className="pt-3">Muito</span>
                </div>
              </div>
            </div>
            <div className="mt-28 flex flex-col gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                  2
                </span>
                Como é feito o marketing (comunicação) na instituição hoje?
              </h2>
              <p className="ml-12 w-3/4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Placeat eos amet voluptatibus ipsa, atque dolorem fugit nobis
                molestias, dolorum animi ipsam neque? Similique dicta assumenda
                enim, sapiente veniam non ullam!
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-20">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                  3
                </span>
                A forma como o marketing (comunicação) é feito atualmente atende
                às necessidades da instituição? O que poderia melhorar?
              </h2>
              <p className="ml-12 w-3/4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac
                quam eu ex faucibus ornare non non urna. Cras malesuada et nunc
                at laoreet. Vivamus odio felis, feugiat In ac quam eu ex
                faucibus ornare non non urna. Cras malesuada et nunc at laoreet.
              </p>
            </div>
          </div>

          <Dialog.Close className="absolute top-8 right-6 text-xl text-white">
            <X />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
