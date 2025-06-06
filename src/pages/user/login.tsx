import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '../../context/AuthProvider/useAuth'
import Main from '../../components/Main'
import { emailSchema, passwordSchema } from '../../utils/ValidationSchemas'
import { InputPassword } from '../../components/Input/InputPassword'
import { InputEmail } from '../../components/Input/InputEmail'
import { useSearchParams } from 'next/navigation'

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
type formProps = z.infer<typeof schema>

export default function Login() {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const searchParams = useSearchParams()
  const organizationId = searchParams.get('socialOrganizationId')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>()
  const auth = useAuth()

  const SubmitForm = async ({ email, password }: formProps) => {
    setIsSubmiting(true)
    try {
      await auth.signIn({ email, password }, organizationId)
      toast.success('Acesso autorizado, ligando os foguetes')
    } catch (error) {
      setIsSubmiting(false)
      toast.error('Credenciais incorretas')
    }
  }
  return (
    <div>
      <Head>
        <title>Entrar | Cosmos</title>
      </Head>
      <div className="flex h-screen">
        <Main />
        <main className="flex w-full flex-col items-center justify-center gap-2">
          <h2 className="text-3xl text-purple-700">Faça o seu login</h2>
          <form
            onSubmit={handleSubmit(SubmitForm)}
            className="mt-4 flex w-1/2 flex-col gap-2"
            noValidate
          >
            <div className="flex w-full flex-col gap-2">
              <InputEmail
                id="email"
                label="Email"
                register={register}
                error={errors.email?.message}
                autoFocus
                placeholder="nome@email.com.br"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <InputPassword
                id="password"
                label="Senha"
                register={register}
                error={errors.password?.message}
                placeholder="Digite sua senha aqui"
                helperText="A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula e 1 número"
              />

              <span className="py-3 text-right  text-sm">
                <Link
                  href="/user/forgot-password"
                  className="text-purple-500 hover:text-purple-700"
                >
                  Esqueci minha senha
                </Link>
              </span>
            </div>

            <button
              type="submit"
              className="colorButton"
              disabled={isSubmiting}
            >
              Entrar
            </button>
          </form>
          <div>
            <h3>
              Ainda não tem uma conta?{' '}
              <strong className="font-bold text-purple-700 transition-all duration-200 hover:text-purple-600">
                <Link href="/institutions/select-role">Cadastre-se</Link>
              </strong>
            </h3>
          </div>
        </main>
      </div>
    </div>
  )
}
