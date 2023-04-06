import * as HoverCard from '@radix-ui/react-hover-card';
import * as Checkbox from '@radix-ui/react-checkbox';
import { z } from "zod"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Check, Eye, EyeClosed, Question } from "phosphor-react";
import Link from "next/link";

const schema = z.object({
  name: z.string(),
  alias: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
})
type formProps = z.infer<typeof schema>

export function UserRegisterForm() {

  const [isSubmiting, setIsSubmiting] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [messageErrorPassword, setMessageErrorPassword] = useState("")

  const { register, handleSubmit } = useForm<formProps>()
  function handleForm(data: formProps) {
    setIsSubmiting(true)
    setMessageErrorPassword("A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.")
    if (data.password.length <= 8) {
      setIsSubmiting(false)
      return messageErrorPassword
    }
    if (!/[A-Z]/.test(data.password)) {
      setIsSubmiting(false)
      return messageErrorPassword
    }
    if (!/\d/.test(data.password)) {
      setIsSubmiting(false)
      return messageErrorPassword
    }
    if (data.password !== data.confirmPassword) {
      setIsSubmiting(false)
      return setMessageErrorPassword("As senhas devem ser iguais")
    }
    setMessageErrorPassword("")
    return (toast.success("Criado com sucesso"), console.log(data, acceptTerms));
  }

  return (
    <main className="flex flex-col w-1/2 gap-2 justify-center items-center">
      <h1 className="text-3xl text-purple-700">Cadastro para voluntariado</h1>
      <form onSubmit={handleSubmit(handleForm)} className="w-1/2 flex flex-col gap-2 mt-4">
        <div className="flex flex-col w-full max-w-md gap-2">
          <label htmlFor="Nome">Nome completo</label>
          <input
            {...register("name")}
            required
            id="Nome"
            placeholder="Nome e sobrenome"
            className="border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 invalid:border-pink-600 valid:border-green-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col w-full max-w-md gap-2">
          <label htmlFor="apelido">Apelido</label>
          <input
            {...register("alias")}
            required
            id="apelido"
            placeholder="Como gostaria de ser chamado(a)"
            className="border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 invalid:border-pink-600 valid:border-green-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col w-full max-w-md gap-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            required
            id="email"
            type="email"
            placeholder="nome@email.com.br"
            className="border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500  invalid:border-pink-600 valid:border-green-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200"
          />
        </div>

        <div className="flex text-left items-start gap-1">
          <label htmlFor="password">Senha</label>
          <HoverCard.Root openDelay={200}>
            <HoverCard.Trigger className="cursor-pointer"><Question size={24} /></HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content className="max-w-sm bg-gray-100 border border-solid border-purple-800 p-2 rounded-lg shadow-2xl">
                <span>
                  A senha deve ter no minimo 8 caracteres, com pelo menos uma letra maiscula e um número.
                </span>
                <HoverCard.Arrow width={16} height={8} className="fill-purple-800" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </div>
        <div className="flex group w-full max-w-md gap-2 relative">
          <input
            {...register("password")}
            required
            id="password"
            minLength={8}
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha aqui"
            className="w-full border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 invalid:border-pink-600 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200 valid:border-green-500"
          />
          <button
            className="button-show-password absolute top-3 right-2"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <span className="text-rose-600 text-sm">{messageErrorPassword}</span>

        <label htmlFor="confirm-password">Confirme a senha</label>
        <div className="flex justify-between group w-full max-w-md gap-2 relative">
          <input
            {...register("confirmPassword")}
            required
            id="confirm-password"
            type={showPassword1 ? "text" : "password"}
            placeholder="Digite sua senha aqui"
            className="w-full border-solid border border-gray-400 p-2 rounded-md focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 invalid:border-pink-600 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200 valid:border-green-500"
          />
          <button
            className="button-show-password absolute top-3 right-2"
            type="button"
            onClick={() => setShowPassword1(!showPassword1)}
          >
            {showPassword1 ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className='flex gap-2 my-4'>
          <Checkbox.Root
            className='bg-white w-6 h-6 border-2 border-solid border-[#A2ABCC] rounded flex items-center justify-center'
            id='checkbox'
            required
            checked={acceptTerms}
            onCheckedChange={
              (checked) => {
                if (checked === true) {
                  setAcceptTerms(true)
                } else {
                  setAcceptTerms(false)
                }
              }
            }
          >
            <Checkbox.Indicator >
              <Check size={32} className="p-1 text-green-500 font-bold" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label htmlFor="checkbox">
            <span className='text-[#727CA3]'>Aceito o <strong className='text-[#0890F7] font-semibold'>termo de tratamento de dados</strong></span>
          </label>
        </div>
        <button type="submit" className="cBtn w-full  max-w-md mt-2" disabled={isSubmiting}>
          Criar Conta
        </button>
      </form>

      <div>
        <h3>
          Já tem conta?{" "}
          <strong className="text-purple-700 font-bold hover:text-purple-600 transition-all duration-200">
            <Link href="/usuario/entrar">Fazer login</Link>
          </strong>
        </h3>
        <ToastContainer autoClose={2000} limit={3} />
      </div>
    </main >
  );
}
