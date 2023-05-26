/* eslint-disable @next/next/no-img-element */

import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox'
import { BackButton } from "../../components/Welcome/BackButton";
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

interface State {
  id: number;
  nome: string;
}

export default function Local() {
  const [outOfBrazil, setOutOfBrazil] = useState(false)
  const [states, setStates] = useState<State[]>([])

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setStates(response.data);
      })

  }, []);

  return (
    <div>
      <Head>
        <title>Local de nascimento</title>
      </Head>
      <BackButton link="/usuario/nascimento" />
      <main className="w-full h-screen bg-little-nave bg-cover bg-no-repeat flex text-zinc-50 items-center ">

        <form action="" className='flex flex-col items-center justify-center gap-7 lg:ml-72 p-16 backdrop-blur-md bg-black/10 rounded-2xl '>
          <h2 className='text-2xl'>Onde a sua nave está estacionada?</h2>
          <span className='font-light text-xl'>O local onde você vive atualmente</span>
          <div className='flex flex-col w-full justify-between gap-6'>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="country">Estado</label>
              <Select.Root  >
                <Select.Trigger
                  id="day"
                  className="bg-zinc-50 rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
                >
                  <Select.Value placeholder="Selecione seu estado" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content position='popper' className="bg-white text-center rounded mt-2 w-full">
                    <Select.Viewport className="text-violet-500 p-2 cursor-pointer max-h-60 w-full">

                      {states.map(states => {
                        return (
                          <Select.Item
                            key={states.id}
                            value={states.nome}
                            className=" py-2 px-4 outline-none hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center"
                          >
                            {states.nome}
                            <Select.ItemText>
                            </Select.ItemText>
                            <Select.ItemIndicator >
                              <Check size={18} />
                            </Select.ItemIndicator>
                          </Select.Item>
                        )
                      })}



                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="country">Cidade</label>
              <Select.Root  >
                <Select.Trigger
                  id="day"
                  className="bg-zinc-50 rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
                >
                  <Select.Value placeholder="Selecione sua cidade" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content position='popper' className="bg-white text-center rounded mt-2 w-32">
                    <Select.Viewport className="text-violet-500 p-2 cursor-pointer max-h-60 w-full">

                      <Select.Item
                        value='teste'
                        className="py-2 px-4 outline-none hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center"
                      >
                        Oi
                        <Select.ItemText>
                        </Select.ItemText>
                        <Select.ItemIndicator className="">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className='flex gap-2'>
              <Checkbox.Root
                className={`bg-transparent w-6 h-6 border-2 border-solid border-[#A2ABCC] rounded flex items-center justify-center ${outOfBrazil && "&& bg-gradient-to-r to-[#9D37F2] from-blue-300 border-none"}`}
                id='checkbox'
                required
                checked={outOfBrazil}
                onCheckedChange={
                  (checked) => {
                    if (checked === true) {
                      setOutOfBrazil(true)
                    } else {
                      setOutOfBrazil(false)
                    }
                  }
                }
              >
                <Checkbox.Indicator >
                  <Check size={32} className="p-1 text-zinc-50 font-bold" />
                </Checkbox.Indicator>
              </Checkbox.Root>

              <label>Não moro no Brasil</label>
            </div>

            <button className='bg-violet-600 p-3 rounded-lg hover:bg-violet-500 transition-colors'>Entrar na nave</button>
          </div>
        </form>
      </main>
    </div>
  )
}