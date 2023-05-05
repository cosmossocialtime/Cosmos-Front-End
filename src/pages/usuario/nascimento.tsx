/* eslint-disable @next/next/no-img-element */
import * as Select from '@radix-ui/react-select';
import { BackButton } from "../../components/Welcome/BackButton";
import { ArrowBendRightDown, Check } from 'phosphor-react';
import arrowDown from "/public/images/arrow-down.svg"

export default function Nascimento() {
  return (
    <>
      <BackButton link="/usuario/codigo-empresa" />
      <main className="h-screen w-full bg-bgTerra bg-no-repeat bg-cover flex items-center justify-center">
        <form
          className="flex flex-col items-center justify-center gap-3 p-16 backdrop-blur-md bg-black/10 rounded-2xl ">
          <h1
            className="text-zinc-50 text-2xl font-semibold">Nos conte o dia em que você chegou à Terra</h1>
          <span
            className="text-zinc-50 text-xl font-extralight">Informe aqui sua data de nascimento ;)</span>

          <div className='flex w-full justify-between gap-6 mt-10'>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="day" className='text-zinc-50 font-light'>Dia</label>
              <Select.Root>
                <Select.Trigger
                  id="day"
                  className="bg-zinc-50 rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
                >
                  <Select.Value placeholder="20" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white text-center rounded">
                    <Select.Viewport className="text-violet-500 py-2 cursor-pointer">

                      <Select.Item
                        value="teste"
                        className="py-2 px-2 hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center"
                      >
                        <Select.ItemText className="">
                          Oi
                        </Select.ItemText>
                        <Select.ItemIndicator className="">
                          <Check size={15} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="month" className='text-zinc-50 font-light'>Mês</label>
              <Select.Root>
                <Select.Trigger
                  id="month"
                  className="bg-zinc-50 rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
                >
                  <Select.Value placeholder="Julho" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white text-center rounded">
                    <Select.Viewport className="text-violet-500 py-2 cursor-pointer">

                      <Select.Item
                        value="teste"
                        className="py-2 px-2 hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center"
                      >
                        <Select.ItemText className="">
                          Oi
                        </Select.ItemText>
                        <Select.ItemIndicator className="">
                          <Check size={15} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="year" className='text-zinc-50 font-light'>Ano</label>
              <Select.Root>
                <Select.Trigger
                  id="game"
                  className="bg-zinc-50 rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
                >
                  <Select.Value placeholder="1969" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white text-center rounded">
                    <Select.Viewport className="text-violet-500 py-2 cursor-pointer">

                      <Select.Item
                        value="teste"
                        className="py-2 px-2 hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center"
                      >
                        <Select.ItemText className="">
                          Oi
                        </Select.ItemText>
                        <Select.ItemIndicator className="">
                          <Check size={15} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}