import * as Dialog from '@radix-ui/react-dialog'
import * as HoverCard from '@radix-ui/react-hover-card'
import { Eye, EyeClosed, Lock, Question, X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

interface PasswordInputProps {
  enableForm: boolean
}

const schema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
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
    passwordConfirm: z.string(),
  })
  .refine((fields) => fields.newPassword === fields.passwordConfirm, {
    message: 'As senhas não são iguais',
    path: ['passwordConfirm'],
  })

type formProps = z.infer<typeof schema>

export function PasswordInput({ enableForm }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const changePasswordRef = useRef<HTMLFormElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>({ resolver: zodResolver(schema) })

  async function submitForm({
    currentPassword,
    newPassword,
    passwordConfirm,
  }: formProps) {
    await api
      .put('/user/password', {
        currentPassword,
        newPassword,
        passwordConfirm,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Senha atualizada com sucesso')
          changePasswordRef.current?.reset()
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error('A senha atual está incorreta! Tente novamente.')
        }
        console.error(error)
      })
  }

  return (
    <div className="flex w-full justify-between px-6 py-4">
      <div className="flex gap-4">
        <Lock size={24} />
        <span>••••••••</span>
      </div>
      <Dialog.Root>
        <Dialog.Trigger disabled={!enableForm}>
          <span
            className={`${
              enableForm ? '' : 'hidden'
            } font-semibold text-blue-400`}
          >
            Alterar senha
          </span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/25" />
          <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-16 py-[4.5rem]">
            <Dialog.Close>
              <X size={24} className="absolute top-6 right-6" />
            </Dialog.Close>
            <form
              ref={changePasswordRef}
              onSubmit={handleSubmit(submitForm)}
              className="flex w-full flex-col gap-6"
            >
              <div>
                <label htmlFor="current-password" className="mb-1">
                  Digite sua senha atual
                </label>
                <div className=" group relative flex w-full max-w-md justify-between gap-2">
                  <input
                    {...register('currentPassword')}
                    autoComplete="new-password"
                    required
                    id="current-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Escreva sua senha atual aqui"
                    className={`w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                      errors.newPassword
                        ? 'border-rose-600'
                        : 'valid:border-green-500'
                    }} `}
                  />
                  <button
                    className="button-show-password absolute top-3 right-2"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-start gap-1 text-left">
                  <label htmlFor="new-password">Digite a sua nova senha</label>
                  <HoverCard.Root openDelay={200}>
                    <HoverCard.Trigger className="cursor-pointer">
                      <Question size={24} />
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                      <HoverCard.Content className="max-w-sm rounded-lg border border-solid border-purple-800 bg-gray-100 p-2 shadow-2xl">
                        <span>
                          A senha deve ter no minimo 8 caracteres, com pelo
                          menos uma letra maiscula e um número.
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
                    {...register('newPassword')}
                    required
                    id="new-password"
                    minLength={8}
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Escreva sua nova senha aqui"
                    className={`w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm  hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                      errors.newPassword
                        ? 'border-rose-600'
                        : 'valid:border-green-500'
                    }`}
                  />
                  <button
                    className="button-show-password absolute top-3 right-2"
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeClosed size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <span className="text-sm text-rose-600">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="confirm-password" className="mb-1">
                  Confirme a nova senha
                </label>
                <div className=" group relative flex w-full max-w-md justify-between gap-2">
                  <input
                    {...register('passwordConfirm')}
                    required
                    id="confirm-password"
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    placeholder="Escreva sua nova senha aqui"
                    className={`w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                      errors.newPassword
                        ? 'border-rose-600'
                        : 'valid:border-green-500'
                    }} `}
                  />
                  <button
                    className="button-show-password absolute top-3 right-2"
                    type="button"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  >
                    {showConfirmNewPassword ? (
                      <EyeClosed size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.passwordConfirm && (
                  <span className="text-sm text-rose-600">
                    {errors.passwordConfirm.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-violet-500 py-4 text-lg font-semibold text-white transition-colors hover:bg-violet-600"
              >
                Alterar senha
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
