
import { useRouter } from "next/router";
import Router from 'next/router'
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { api } from "../../services/api";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "phosphor-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Main from "../../components/Main";


const schema = z.object({
  email: z.string()
    .nonempty("O campo e-mail é obrigatório")
    .email("O formato do email esta incorreto"),
  password: z.string()
    .nonempty("O campo senha é obrigatório")
    .min(8, "A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.")
    .regex(/[A-Z]/, "A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.")
    .regex(/\d/, "A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número."),
})
type formProps = z.infer<typeof schema>

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const { resetPassword } = router.query
  const { register, handleSubmit, formState: { errors } } = useForm<formProps>({ resolver: zodResolver(schema) })


  const SubmitForm = ({ email, password }: formProps) => {
    api.patch('/auth/resetPassword', {
      "email": email,
      "password": password,
      "token": resetPassword
    }).then(response => {
      if (response.status === 200) {
        Router.push('/user/login')
      }

      if (response.status === 404) {
        return toast.error('Não foi possivel processar sua requisição, tente novamente')
      }
    })

  }

  return (
    <div className="flex">
      <Main />
      <div className="h-screen bg-zinc-50 text-zinc-900 w-full max-w-lg flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(SubmitForm)} className="p-10 flex flex-col gap-3 mt-4 w-full">
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="email" className="text-lg">Email</label>
            <input
              {...register("email")}
              id="email"
              type="email"
              required
              placeholder="email@gmail.com"
              className="border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 valid:border-green-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200"
            />
          </div>
          <label htmlFor="password" className="text-lg">Nova senha</label>
          <div className="flex group w-full max-w-md gap-2 mb-6 relative">
            <input
              {...register("password")}
              required
              id="password"
              minLength={8}
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha aqui"
              className={`w-full border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500  hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200 ${errors.password ? "border-rose-600" : "valid:border-green-500"}`}
            />
            <button
              className="button-show-password absolute top-3 right-2"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <span className='text-sm text-rose-600'>{errors.password.message}</span>}

          <button type="submit" className="cBtn">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}