import * as Dialog from '@radix-ui/react-dialog'
import { Cake, Coins, Heart, MapPin, UsersFour, X } from 'phosphor-react'
import dayjs from 'dayjs'
import Head from 'next/head'

type NamesPlanet = {
  name?: string
  creationDate?: string
  totalCollaborators?: number
  beneficiaries?: string
  annualRevenue?: number
  city?: string
  mainChallenges?: string
  socialImpact?: string
  history?: string
  causes?: [string]
  state?: string
}

export default function ModalInstitute({
  name,
  annualRevenue,
  city,
  creationDate,
  beneficiaries,
  mainChallenges,
  socialImpact,
  totalCollaborators,
  history,
  causes,
  state,
}: NamesPlanet) {
  const dataFormated = dayjs(creationDate).format('DD/MM/YYYY')
  const integerPart = String(annualRevenue).slice(0, -2)
  const decimalPart = String(annualRevenue).slice(-2)
  const annualRevenueInteger = String(integerPart).replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1.',
  )
  const beneficiariesFormated = String(beneficiaries).replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1.',
  )

  const collaboratorsFormated = String(totalCollaborators).replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1.',
  )

  return (
    <>
      <Head>
        <title>Imagem de satelite</title>
      </Head>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[2] bg-black/70" />

        <Dialog.Content className="scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full fixed left-1/2 top-1/2 z-10 flex h-[95%] w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-xl bg-c-blue-800 p-10 pl-10 text-white">
          <Dialog.Title>
            <p className="self-end text-[50px]">{name}</p>
          </Dialog.Title>

          <div className="mt-3 flex gap-4">
            <span className="flex gap-2">
              <Cake size={24} /> {dataFormated || '10/01/2000'}
            </span>
            <span className="flex gap-2">
              <MapPin size={24} /> {`${city} - ${state}` || ''}
            </span>
            <span className="flex gap-2">
              <UsersFour size={24} /> {collaboratorsFormated || '0'}{' '}
              Colaboradores
            </span>
            <span className="flex gap-2">
              <Coins size={24} /> ${' '}
              {`${annualRevenueInteger},${decimalPart}` || '0'} receita anual
            </span>
            <span className="flex gap-2">
              <Heart size={24} /> {beneficiariesFormated || '0'} Beneficiários
            </span>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="flex items-center gap-4 text-xl">
              <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                1
              </span>
              Causa em que atua
            </h2>
            <div className="ml-12 flex gap-3">
              {causes?.map((cause) => {
                return (
                  <span key={cause} className="w-fit rounded-lg bg-white/5 p-3">
                    {cause}
                  </span>
                )
              })}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="flex items-center gap-4 text-xl">
              <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                2
              </span>
              História
            </h2>
            <p className="ml-12 w-3/4">{history}</p>
          </div>
          <div className="mt-10 flex flex-col  gap-5">
            <h2 className="flex items-center gap-4 text-xl">
              <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                3
              </span>
              Atuação e impacto social
            </h2>
            <p className="ml-12 w-3/4">{socialImpact}</p>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="flex items-center gap-4 text-xl">
              <span className="flex aspect-square h-8 items-center justify-center rounded-full bg-white/10 p-2">
                4
              </span>
              Principais necessidades e desafios
            </h2>
            <p className="ml-12 w-3/4">{mainChallenges}</p>
          </div>

          <Dialog.Close className="absolute right-6 top-8 text-xl text-white">
            <X />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
