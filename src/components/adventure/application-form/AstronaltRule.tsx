import Link from 'next/link'
import { Button } from '../../Button'
import { Header } from '../Header'
import Image, { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

interface AstronaltRuleProps {
  astronaltImg: StaticImageData
  color: string
  title: string
  linkBack: string
  linkNext: string
  children: ReactNode
}

export function AstronaltRule({
  astronaltImg,
  color,
  title,
  linkBack,
  linkNext,
  children,
}: AstronaltRuleProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header title="Seu papel na missão" subtitle="Formulário de Inscrição">
        <span className="mr-24 flex-1 text-end font-semibold text-violet-600">
          Introdução para quarta etapa
        </span>
      </Header>
      <div className="mt-28 flex flex-col items-center justify-center">
        <div
          className={`relative w-[660px] rounded-[36px] bg-[${color}] py-10 pr-9 pl-28`}
        >
          <Image
            className="absolute -top-[5.5rem] -left-40"
            alt="comandante"
            src={astronaltImg}
          />
          <h2 className="mb-3 text-4xl font-black text-gray-100">{title}</h2>
          <div className="flex flex-col gap-7 text-xl text-gray-800">
            {children}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <div className="h-3 w-3 rounded-full bg-[#FFD743]"></div>
          <div className="h-3 w-3 rounded-full bg-[#AEDF55]"></div>
          <div className="h-3 w-3 rounded-full bg-[#FD6062]"></div>
        </div>
      </div>
      <Link href={linkBack}>
        <Button.ArrowLeft position="center" />
      </Link>
      <Link href={linkNext}>
        <Button.ArrowRight position="center" />
      </Link>
    </div>
  )
}
