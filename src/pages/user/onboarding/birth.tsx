/* eslint-disable @next/next/no-img-element */
import * as Select from '@radix-ui/react-select'
import { Check } from 'phosphor-react'
import { useState } from 'react'
import dayjs from 'dayjs'

import { useForm } from 'react-hook-form'
import { api } from '../../../services/api'
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Button } from '../../../components/Button'

export default function Nascimento() {
  const [dayValue, setDayValue] = useState('20')
  const [monthValue, setMonthValue] = useState('Julho')
  const [yearValue, setYearValue] = useState('1969')
  const { handleSubmit } = useForm()

  const currentYear = dayjs().year()
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = Array.from({ length: 12 }, (_, i) => i)
  const years = Array.from({ length: currentYear - 1930 }, (_, i) => i + 1930)

  function monthFormated(dateMonth: number) {
    return dayjs().month(dateMonth).format('MMMM')
  }
  function monthInNumber(month: string) {
    return dayjs().month(Number(month)).format('MM')
  }

  function submitBirth() {
    if (yearValue && dayValue) {
      try {
        api
          .patch('/user/onboarding', {
            birthdate: `${yearValue}-${monthInNumber(monthValue)}-${dayValue}`,
          })
          .then((response) => {
            if (response.status === 200) {
              Router.push('/user/onboarding/live')
            }
          })
      } catch (error: any) {
        if (error.response.status === 400) return toast.error('Sem autorização')
      }
    }
  }
  return (
    <div>
      <Link href={'/user/onboarding/company-code'}>
        <Button.ArrowLeft position="top" />
      </Link>
      <main className="flex h-screen w-full items-center justify-center bg-bgTerra bg-cover bg-no-repeat">
        <form
          onSubmit={handleSubmit(submitBirth)}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-black/10 p-16 backdrop-blur-md "
        >
          <h1 className="text-2xl font-semibold text-zinc-50">
            Nos conte o dia em que você chegou à Terra
          </h1>
          <span className="text-xl font-extralight text-zinc-50">
            Selecione a sua data de nascimento ;)
          </span>

          <div className="mt-10 flex w-full justify-between gap-6">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="day" className="font-light text-zinc-50">
                Dia
              </label>
              <Select.Root onValueChange={setDayValue}>
                <Select.Trigger
                  id="day"
                  className="flex w-full items-center justify-between rounded bg-zinc-50 py-3 px-4 text-sm text-zinc-500 placeholder:text-zinc-200"
                >
                  <Select.Value placeholder="20" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    position="popper"
                    className="mt-2 w-32 rounded bg-white text-center"
                  >
                    <Select.Viewport className="max-h-60 w-full cursor-pointer p-2 text-violet-500">
                      {days.map((days, index) => (
                        <Select.Item
                          key={index}
                          value={`${days}`}
                          className="flex items-center justify-between rounded-lg py-2 px-4 outline-none hover:bg-violet-500 hover:text-white"
                        >
                          <Select.ItemText>{days}</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check size={18} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="month" className="font-light text-zinc-50">
                Mês
              </label>
              <Select.Root onValueChange={setMonthValue}>
                <Select.Trigger
                  id="month"
                  className="flex w-full items-center justify-between rounded bg-zinc-50 py-3 px-4 text-sm text-zinc-500"
                >
                  <Select.Value placeholder="Julho" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    position="popper"
                    className="mt-2 w-32 overflow-hidden rounded bg-white text-center"
                  >
                    <Select.Viewport className="max-h-60 w-full cursor-pointer bg-zinc-50 p-2 text-violet-500">
                      {months.map((month, index) => (
                        <Select.Item
                          key={index}
                          value={`${month}`}
                          className="flex items-center  justify-between rounded-lg py-2 px-2 outline-none hover:bg-violet-500 hover:text-white"
                        >
                          <Select.ItemText>
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

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="year" className="font-light text-zinc-50">
                Ano
              </label>
              <Select.Root onValueChange={setYearValue}>
                <Select.Trigger
                  id="year"
                  className="flex w-full items-center justify-between rounded bg-zinc-50 py-3 px-4 text-sm text-zinc-500"
                >
                  <Select.Value placeholder="1969" />
                  <Select.Icon>
                    <img src="/images/arrow-down.svg" alt="arrow down" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    position="popper"
                    className="mt-2 w-32 rounded bg-white text-center"
                  >
                    <Select.Viewport className="max-h-60 w-full cursor-pointer p-2 text-violet-500">
                      {years.reverse().map((year, index) => (
                        <Select.Item
                          key={year}
                          value={`${year}`}
                          className="flex items-center justify-between rounded-lg py-2 px-2 outline-none hover:bg-violet-500 hover:text-white"
                        >
                          <Select.ItemText className="">{year}</Select.ItemText>
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

          <button className="mt-10 w-full rounded-lg bg-violet-500 py-4 text-lg text-zinc-50 transition-all duration-200 hover:bg-violet-600">
            Pousar
          </button>
        </form>
      </main>
      <ToastContainer autoClose={2000} limit={3} />
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'cosmos.token': token } = parseCookies(ctx)
  if (!token) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
