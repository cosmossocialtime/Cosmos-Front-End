import Head from 'next/head'
import Main from '../../components/Main'
import * as HoverCard from '@radix-ui/react-hover-card'
import * as Checkbox from '@radix-ui/react-checkbox'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Check, Eye, EyeClosed, Question } from 'phosphor-react'
import Link from 'next/link'
import { api } from '../../services/api'
import { setCookie } from 'nookies'
import Router from 'next/router'

const schema = z
  .object({
    name: z
      .string()
      .nonempty('O campo nome é obrigatório')
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
          })
          .join(' ')
      }),
    alias: z.string().nonempty('O campo nome é obrigatório'),
    email: z
      .string()
      .nonempty('O campo e-mail é obrigatório')
      .email('O formato do email esta incorreto'),
    password: z
      .string()
      .nonempty('O campo senha é obrigatório')
      .min(
        8,
        'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.',
      )
      .regex(
        /[A-Z]/,
        'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.',
      )
      .regex(
        /\d/,
        'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.',
      ),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: 'As senhas não são iguais',
    path: ['confirmPassword'],
  })
type formProps = z.infer<typeof schema>

export default function Cadastrar() {
  const [isSubmiting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>({ resolver: zodResolver(schema) })

  async function handleForm(data: formProps) {
    try {
      await api
        .post('/auth/signup', {
          byname: data.alias,
          fullName: data.name,
          email: data.email,
          password: data.password,
          passwordConfirmation: data.confirmPassword,
        })
        .then((res) => {
          if (res.status === 201) {
            setCookie(undefined, 'cosmos.user', data.email, {
              maxAge: 60 * 60 * 12,
            })
            toast.success('Criado com sucesso')
            Router.push('/user/completed-registration')
          }
        })
    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error(
          'Não foi possivel criar sua conta, pois este email já existe',
        )
      }
      if (error.response.status === 404 || error.response.status === 500) {
        return toast.error(
          'Não foi possivel criar sua conta, por favor tente novamente',
        )
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Cadastrar | Cosmos</title>
      </Head>
      <div className="h-screen md:flex">
        <Main />
        <main className="flex w-full flex-col items-center justify-center gap-2">
          <h1 className="text-3xl text-purple-700">
            Cadastro para voluntariado
          </h1>
          <form
            onSubmit={handleSubmit(handleForm)}
            className="mt-4 flex w-1/2 flex-col gap-2"
          >
            <div className="flex w-full max-w-md flex-col gap-2">
              <label htmlFor="Nome">Nome completo</label>
              <input
                {...register('name')}
                required
                id="Nome"
                placeholder="Nome e sobrenome"
                className="rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 valid:border-green-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex w-full max-w-md flex-col gap-2">
              <label htmlFor="apelido">Apelido</label>
              <input
                {...register('alias')}
                required
                id="apelido"
                placeholder="Como gostaria de ser chamado(a)"
                className="rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 valid:border-green-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex w-full max-w-md flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                {...register('email')}
                required
                id="email"
                type="email"
                placeholder="nome@email.com.br"
                className={`rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm   hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                  errors.email ? 'border-pink-600' : 'valid:border-green-500'
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-sm text-rose-600">
                {errors.email.message}
              </span>
            )}

            <div className="flex items-start gap-1 text-left">
              <label htmlFor="password">Senha</label>
              <HoverCard.Root openDelay={200}>
                <HoverCard.Trigger className="cursor-pointer">
                  <Question size={24} />
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content className="max-w-sm rounded-lg border border-solid border-purple-800 bg-gray-100 p-2 shadow-2xl">
                    <span>
                      A senha deve ter no minimo 8 caracteres, com pelo menos
                      uma letra maiscula e um número.
                    </span>
                    <HoverCard.Arrow
                      width={16}
                      height={8}
                      className="fill-purple-800"
                    />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </div>
            <div className="group relative flex w-full max-w-md gap-2">
              <input
                {...register('password')}
                required
                id="password"
                minLength={8}
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha aqui"
                className={`w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm  hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                  errors.password ? 'border-rose-600' : 'valid:border-green-500'
                }`}
              />
              <button
                className="button-show-password absolute top-3 right-2"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-sm text-rose-600">
                {errors.password.message}
              </span>
            )}

            <label htmlFor="confirm-password">Confirme a senha</label>
            <div className="group relative flex w-full max-w-md justify-between gap-2">
              <input
                {...register('confirmPassword')}
                required
                id="confirm-password"
                type={showPassword1 ? 'text' : 'password'}
                placeholder="Digite sua senha aqui"
                className={`w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                  errors.password ? 'border-rose-600' : 'valid:border-green-500'
                }} `}
              />
              <button
                className="button-show-password absolute top-3 right-2"
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-sm text-rose-600">
                {errors.confirmPassword.message}
              </span>
            )}

            <div className="my-4 flex gap-2">
              <Checkbox.Root
                className={`flex  h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-zinc-50 ${
                  acceptTerms &&
                  '&& border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'
                }`}
                id="checkbox"
                required
                checked={acceptTerms}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setAcceptTerms(true)
                  } else {
                    setAcceptTerms(false)
                  }
                }}
              >
                <Checkbox.Indicator>
                  <Check size={32} className="p-1 font-bold text-zinc-50" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="checkbox">
                <span className="text-[#727CA3]">
                  Aceito o{' '}
                  <strong className="font-semibold text-[#0890F7]">
                    termo de tratamento de dados
                  </strong>
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="cBtn mt-2  w-full max-w-md"
              disabled={isSubmiting}
            >
              Criar Conta
            </button>
          </form>

          <div>
            <h3>
              Já tem conta?{' '}
              <strong className="font-bold text-purple-700 transition-all duration-200 hover:text-purple-600">
                <Link href="/user/login">Fazer login</Link>
              </strong>
            </h3>
            <ToastContainer autoClose={2000} limit={3} />
          </div>
        </main>
      </div>
    </div>
  )
}
