import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'

type NamesPlanet = {
  name: string
  ranking?: number
  currentlyWorking?: string
  effectiveness?: string
}

export default function ModalSatelite({
  name,
  ranking = 0,
  currentlyWorking,
  effectiveness,
}: NamesPlanet) {
  const [ratting] = useState(ranking)
  const [rattingSlider, setRattingSlider] = useState('')

  useEffect(() => {
    if (ratting >= 1) {
      setRattingSlider('before:w-[50px]')
    }
    if (ratting >= 2) {
      setRattingSlider('before:w-[190px]')
    }
    if (ratting >= 3) {
      setRattingSlider(' before:w-[300px]')
    }
    if (ratting >= 4) {
      setRattingSlider(' before:w-[420px]')
    }
    if (ratting >= 5) {
      setRattingSlider(' before:w-[600px]')
    }
  }, [ratting])

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[2] bg-black/70" />

        <Dialog.Content className="scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full fixed top-1/2 left-1/2 z-10 flex h-[95%] w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-xl bg-c-blue-800 p-5 pl-11 text-white">
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
              <div
                className={`relative mt-10 ml-12 flex h-1 w-[600px] items-center justify-between rounded-lg bg-c-blue-700 before:absolute before:top-0 before:left-0 before:h-1 before:rounded-lg ${rattingSlider}  before:content-center before:bg-c-blue-300`}
              >
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span
                    className={`rounded-full ${
                      ratting >= 1 ? 'bg-c-blue-300' : 'bg-c-blue-700'
                    }  border-2 border-c-blue-300 py-1 px-3`}
                  >
                    1
                  </span>
                  <span className="pt-3">Não precisa</span>
                </div>
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span
                    className={`rounded-full ${
                      ratting >= 2 ? 'bg-c-blue-300' : 'bg-c-blue-700'
                    }  border-2 border-c-blue-300 py-1 px-3`}
                  >
                    2
                  </span>
                  <span className="pt-3">Pouco</span>
                </div>
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span
                    className={`rounded-full ${
                      ratting >= 3 ? 'bg-c-blue-300' : 'bg-c-blue-700'
                    }  border-2 border-c-blue-300 py-1 px-3`}
                  >
                    3
                  </span>
                  <span className="pt-3">Médio</span>
                </div>
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span
                    className={`rounded-full ${
                      ratting >= 4 ? 'bg-c-blue-300' : 'bg-c-blue-700'
                    }  border-2 border-c-blue-300 py-1 px-3`}
                  >
                    4
                  </span>
                  <span className="pt-3">Muito</span>
                </div>
                <div className="z-10 flex w-24 flex-col items-center pt-9">
                  <span
                    className={`rounded-full ${
                      ratting >= 5 ? 'bg-c-blue-300' : 'bg-c-blue-700'
                    }  border-2 border-c-blue-300 py-1 px-3`}
                  >
                    5
                  </span>
                  <span className="pt-3">Urgentemente</span>
                </div>
              </div>
            </div>
            <div className="mt-28 flex flex-col gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                  2
                </span>
                Como é feito(a) o(a) {name} na instituição hoje?
              </h2>
              <p className="ml-12 w-3/4">{currentlyWorking}</p>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <h2 className="flex items-center gap-4 text-xl">
                <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                  3
                </span>
                A forma como o(a) {name} é feito(a) atualmente atende às
                necessidades da instituição?
                <br /> O que poderia melhorar?
              </h2>
              <p className="ml-12 w-3/4">{effectiveness}</p>
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
