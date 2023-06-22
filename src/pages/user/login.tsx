import Head from 'next/head'
import Link from 'next/link'
import { Eye, EyeClosed } from 'phosphor-react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '../../context/AuthProvider/useAuth'
import Main from '../../components/Main'

const schema = z.object({
  email: z.string(),
  password: z.string().nonempty('O campo senha é obrigatório'),
})
type formProps = z.infer<typeof schema>

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>()
  const auth = useAuth()

  const SubmitForm = async ({ email, password }: formProps) => {
    setIsSubmiting(true)

    try {
      await auth.signIn({ email, password })
      toast.success('Acesso autorizado, ligando os foguetes')
    } catch (error) {
      setIsSubmiting(false)
      console.log(error)
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
          >
            <div className="flex w-full max-w-md flex-col gap-2">
              <div>
                <label htmlFor="email" className="text">
                  Email
                </label>
              </div>
              <input
                {...register('email')}
                autoFocus
                required
                id="email"
                type="email"
                placeholder="nome@email.com.br"
                className="rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            {errors.email && (
              <span className="text-sm text-rose-600">
                {errors.email.message}
              </span>
            )}
            <div className="flex w-full max-w-md flex-col gap-2">
              <div>
                <label htmlFor="password">Senha</label>
              </div>
              <div className="group relative flex w-full max-w-md gap-2">
                <input
                  {...register('password')}
                  id="password"
                  min={8}
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha aqui"
                  className="w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="button-show-password absolute top-3 right-2"
                >
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-sm text-rose-600">
                  {errors.password.message}
                </span>
              )}

              <span className="py-3 text-right  text-sm">
                <Link
                  href="/user/forgot-password"
                  className="text-purple-500 hover:text-purple-700"
                >
                  Esqueci a minha senha
                </Link>
              </span>
            </div>

            <button type="submit" className="cBtn" disabled={isSubmiting}>
              Entrar
            </button>
          </form>
          <div>
            <h3>
              Ainda não tem uma conta?{' '}
              <strong className="font-bold text-purple-700 transition-all duration-200 hover:text-purple-600">
                <Link href="/user/register">Cadastre-se</Link>
              </strong>
            </h3>
            <ToastContainer autoClose={2000} />
          </div>
        </main>
      </div>
    </div>
  )
}
