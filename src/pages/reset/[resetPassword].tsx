import Router, { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { api } from '../../services/api'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Eye, EyeClosed, Question } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Main from '../../components/Main'
import * as HoverCard from '@radix-ui/react-hover-card'
import { parseCookies } from 'nookies'

const schema = z
  .object({
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

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const router = useRouter()
  const { resetPassword } = router.query
  const { 'cosmos.u': email } = parseCookies()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>({ resolver: zodResolver(schema) })

  const SubmitForm = ({ password }: formProps) => {
    api
      .patch('/auth/resetPassword', {
        password,
        email,
        token: resetPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          Router.push('/user/login')
          toast.success('Senha alterada com sucesso')
        }

        if (response.status === 404) {
          return toast.error(
            'Não foi possivel processar sua requisição, tente novamente',
          )
        }
      })
  }

  return (
    <div className="flex">
      <Main />
      <div className="flex h-screen w-full max-w-lg flex-col items-center justify-center bg-zinc-50 text-zinc-900">
        <form
          onSubmit={handleSubmit(SubmitForm)}
          className="mt-4 flex w-full flex-col gap-3 p-10"
        >
          <div className="flex items-start gap-1 text-left">
            <label htmlFor="password">Nova senha</label>
            <HoverCard.Root openDelay={200}>
              <HoverCard.Trigger className="cursor-pointer">
                <Question size={24} />
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content className="max-w-sm rounded-lg border border-solid border-purple-800 bg-gray-100 p-2 shadow-2xl">
                  <span>
                    A senha deve ter no minimo 8 caracteres, com pelo menos uma
                    letra maiscula e um número.
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
              className="button-show-password absolute right-2 top-3"
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

          <label htmlFor="confirm-password">Confirme a nova senha</label>
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
              className="button-show-password absolute right-2 top-3"
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

          <button type="submit" className="cBtn mt-10">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  )
}
