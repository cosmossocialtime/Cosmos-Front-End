/* eslint-disable @next/next/no-img-element */
import * as Select from '@radix-ui/react-select';
import { Check } from 'phosphor-react';
import { useState } from 'react';
import dayjs from "dayjs"

import { BackButton } from "../../components/BackButton";
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import Router from 'next/router';
import { toast } from 'react-toastify';

export default function Nascimento() {
  const [dayValue, setDayValue] = useState("20")
  const [monthValue, setMonthValue] = useState("Julho")
  const [yearValue, setYearValue] = useState("1969")
  const { handleSubmit } = useForm()

  const currentYear = dayjs().year();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const years = Array.from({ length: currentYear - 1930 }, (_, i) => i + 1930);

  function monthFormated(dateMonth: number) { return dayjs().month(dateMonth).format('MMMM') }

  function submitBirth() {

    try {
      api.patch("/user/onboarding", {
        "birthdate": `${yearValue}-${monthValue}-${dayValue}`
      })
      Router.push('/usuario/estado-cidade')
    } catch (error: any) {
      return toast.error(error)
    }
  }

  return (
    <div>
      <BackButton link="/usuario/codigo-empresa" />
      <main className="h-screen w-full bg-bgTerra bg-no-repeat bg-cover flex items-center justify-center">
        <form
          onSubmit={handleSubmit(submitBirth)}
          className="flex flex-col items-center justify-center gap-3 p-16 backdrop-blur-md bg-black/10 rounded-2xl ">
          <h1
            className="text-zinc-50 text-2xl font-semibold">Nos conte o dia em que você chegou à Terra</h1>
          <span
            className="text-zinc-50 text-xl font-extralight">Informe aqui sua data de nascimento ;)</span>

          <div className='flex w-full justify-between gap-6 mt-10'>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="day" className='text-zinc-50 font-light'>Dia</label>
              <Select.Root onValueChange={setDayValue} >
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
                  <Select.Content position='popper' className="bg-white text-center rounded mt-2 w-32">
                    <Select.Viewport className="text-violet-500 p-2 cursor-pointer max-h-60 w-full">
                      {days.map((days, index) => (
                        <Select.Item
                          key={index}
                          value={`${days}`}
                          className="py-2 px-4 outline-none hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center"
                        >
                          <Select.ItemText>
                            {days}
                          </Select.ItemText>
                          <Select.ItemIndicator >
                            <Check size={18} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="month" className='text-zinc-50 font-light'>Mês</label>
              <Select.Root onValueChange={setMonthValue}>
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
                  <Select.Content position='popper' className="bg-white text-center rounded overflow-hidden mt-2 w-32">
                    <Select.Viewport className="bg-zinc-50 text-violet-500 p-2 cursor-pointer max-h-60 w-full">

                      {months.map((month, index) => (
                        <Select.Item
                          key={index}
                          value={`${monthFormated(month)}`}
                          className="py-2 px-2  outline-none hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center"
                        >
                          <Select.ItemText >
                            {monthFormated(month)}
                          </Select.ItemText>
                          <Select.ItemIndicator className="">
                            <Check size={18} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className='w-full flex flex-col gap-2'>
              <label htmlFor="year" className='text-zinc-50 font-light'>Ano</label>
              <Select.Root onValueChange={setYearValue}>
                <Select.Trigger
                  id="year"
                  className="bg-zinc-50 rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
                >
                  <Select.Value placeholder="1969" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    position='popper'
                    className="bg-white text-center rounded mt-2 w-32">
                    <Select.Viewport className="text-violet-500 p-2 cursor-pointer max-h-60 w-full">

                      {years.reverse().map((year, index) => (
                        <Select.Item
                          key={year}
                          value={`${year}`}
                          className="py-2 px-2 outline-none hover:bg-violet-500 hover:text-white rounded-lg flex justify-between items-center"
                        >
                          <Select.ItemText className="">
                            {year}
                          </Select.ItemText>
                          <Select.ItemIndicator className="">
                            <Check size={18} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>

          <button className='py-4 bg-violet-500 text-zinc-50 text-lg w-full rounded-lg mt-10 hover:bg-violet-600 transition-all duration-200'>Pousar</button>
        </form>
      </main>
    </div>
  )
}