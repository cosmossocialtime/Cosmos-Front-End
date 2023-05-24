import Link from "next/link";
import { Eye, EyeClosed } from "phosphor-react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useAuth } from "../../context/AuthProvider/useAuth";

const schema = z.object({
  email: z.string(),
  password: z.string().nonempty("O campo senha é obrigatório")
})
type formProps = z.infer<typeof schema>


export function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<formProps>()
  const auth = useAuth()

  const SubmitForm = async ({ email, password }: formProps) => {
    setIsSubmiting(true)

    try {
      await auth.signIn({ email, password })
      toast.success("Acesso autorizado, ligando os foguetes")
    } catch (error) {
      setIsSubmiting(false)
      toast.error("Credenciais incorretas")
    }
  }
  return (
    <main className="flex flex-col w-1/2 gap-2 justify-center items-center">
      <h2 className="text-3xl text-purple-700">Faça o seu login</h2>
      <form onSubmit={handleSubmit(SubmitForm)} className="w-1/2 flex flex-col gap-2 mt-4">
        <div className="flex flex-col w-full max-w-md gap-2">
          <div>
            <label htmlFor="email" className="text">Email</label>
          </div>
          <input
            {...register("email")}
            autoFocus
            required
            id="email"
            type="email"
            placeholder="nome@email.com.br"
            className="border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200"
          />
        </div>
        {errors.email && <span className='text-sm text-rose-600'>{errors.email.message}</span>}
        <div className="flex flex-col w-full max-w-md gap-2">
          <div>
            <label htmlFor="password">Senha</label>
          </div>
          <div className="flex group w-full max-w-md gap-2 relative">
            <input
              {...register("password")}
              id="password"
              min={8}
              required
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha aqui"
              className="w-full border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="button-show-password absolute top-3 right-2"
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <span className='text-sm text-rose-600'>{errors.password.message}</span>}

          <span className="text-right text-sm  py-3">
            <Link href="/usuario/recuperar" className="text-purple-500 hover:text-purple-700">Esqueci a minha senha</Link>
          </span>
        </div>

        <button type="submit" className="cBtn" disabled={isSubmiting}>
          Entrar
        </button>
      </form>
      <div>
        <h3>
          Ainda não tem uma conta?{" "}
          <strong className="text-purple-700 font-bold hover:text-purple-600 transition-all duration-200">
            <Link href="/usuario/cadastrar">Cadastre-se</Link>
          </strong>
        </h3>
        <ToastContainer autoClose={2000} />
      </div>
    </main>
  );
}
