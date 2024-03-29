/* eslint-disable @next/next/no-img-element */
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { useState } from 'react'
import { CaretRight } from 'phosphor-react'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { Button } from '../../../components/Button'
import { api } from '../../../services/api'

const schemaGender = z.object({
  gender: z.string().nonempty('Por favor selecione o seu gênero'),
})

type GenderForm = z.infer<typeof schemaGender>

export default function Genero() {
  const [gender, setGender] = useState('')
  const [otherGenderActive, setOtherGenderActive] = useState(true)

  const { handleSubmit } = useForm<GenderForm>()

  function submitFormGender() {
    if (gender === '') {
      toast.error('Digite um gênero válido')
    }
    if (gender) {
      api.patch('/user/onboarding', {
        gender,
      })
      Router.push('/user/onboarding/company-code')
    }
  }

  return (
    <div>
      <Link href={'/user/onboarding/start'}>
        <Button.ArrowLeft position="top" />
      </Link>
      <main className="flex h-screen items-center justify-around bg-bgCadastro bg-cover bg-no-repeat">
        <img
          className="h-fit w-1/3 self-end"
          src="/images/astronauta.png"
          alt="Imagem de um astronauta"
        />
        <form
          action=""
          onSubmit={handleSubmit(submitFormGender)}
          className="flex flex-col items-center justify-center gap-8 rounded-2xl bg-black/10 px-8 py-10 backdrop-blur-md"
        >
          <h2 className="max-w-xs text-center text-2xl font-semibold text-zinc-50">
            Com qual gênero você se identifica?
          </h2>
          <span className="max-w-lg text-center text-xl font-light text-zinc-50">
            Utilizaremos esses dados para mapear o público da nossa plataforma!
          </span>

          <input
            onClick={() => {
              setGender('Feminino')
            }}
            type="submit"
            name="Feminino"
            value="Feminino"
            className="w-full cursor-pointer rounded-lg bg-violet-500 py-4 text-lg font-semibold text-zinc-50 transition-all duration-200 hover:bg-violet-600"
          />

          <input
            onClick={() => {
              setGender('Masculino')
            }}
            type="submit"
            value="Masculino"
            name="Masculino"
            className="w-full cursor-pointer rounded-lg bg-violet-500 py-4 text-lg font-semibold text-zinc-50 transition-all duration-200 hover:bg-violet-600"
          />

          {otherGenderActive ? (
            <input
              onClick={() => setOtherGenderActive(!otherGenderActive)}
              type="submit"
              value={'Outro'}
              className="w-full cursor-pointer rounded-lg bg-violet-500 py-4 text-lg font-semibold text-zinc-50 transition-all duration-200 hover:bg-violet-600"
            />
          ) : (
            <div className="flex w-full justify-between">
              <input
                type="text"
                autoFocus
                placeholder="Digite seu gênero"
                onChange={(e) => setGender(e.target.value)}
                className="flex-1 rounded-lg border border-solid bg-zinc-50 p-4 text-lg text-zinc-700 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="ml-4 rounded-lg bg-violet-500 px-8 py-3  text-zinc-50 transition-all duration-200 hover:bg-violet-600"
              >
                <CaretRight weight="bold" size={32} />
              </button>
            </div>
          )}
        </form>
      </main>
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
