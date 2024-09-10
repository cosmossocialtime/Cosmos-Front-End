import Head from "next/head";
import Main from "../../../components/Main";
import * as HoverCard from '@radix-ui/react-hover-card'
import { Eye, EyeClosed, Question } from "phosphor-react";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../components/Button/PrimaryButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import Router from 'next/router'

const schema = z.object({
    email: z.string().nonempty("O campo e-mail é obrigatório").email("O formato do email esta incorreto"),
    password: z.string()
              .nonempty("O campo senha é obrigatório")
              .min(8, "A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.")
              .regex(
                /[A-Z]/,
                'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.',
              )
              .regex(
                /\d/,
                'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.',
              )
})

type formProps = z.infer<typeof schema>

export default function Cadastrar(){

    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<formProps>({ resolver: zodResolver(schema) })

    async function handleForm(data: formProps){

        try{
            await api.post("/auth/signup", {
                byname: "Novo usuário",
                email: data.email,
                password: data.password,
                passwordConfirmation: data.password
            }).then(res => {
                if(res.status === 201){
                    localStorage.setItem("userId", res.data.id);
                    Router.push("organizations/register/form1");
                }
            })
        }catch(error: any){
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

    return(
        <div>
            <Head>
                <title>Cadastrar | Cosmos</title>
            </Head>
            <div className="h-screen md:flex">
                <Main />
                <main className="flex w-full flex-col items-center justify-center gap-2">
                    <h1 className="text-gray-800 text-base text-[20px]" >Crie sua conta gratuita</h1>
                    <form onSubmit={handleSubmit(handleForm)} className="mt-[56px] flex w-[384px] flex-col" >
                        <div className="flex w-full max-w-md flex-col gap-2" >
                            <label htmlFor="Nome">Email</label>
                            <input {...register('email')} 
                                   className={`rounded-md h-[48px] border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
                                   ${errors.email ? 'border-rose-600' : 'border-gray-400'}`} /> 
                        </div>
                        {errors.email && (
                            <span className="text-sm text-rose-600 mt-2">
                            {errors.email.message}
                            </span>
                        )}

                        <div className="flex w-full group relative max-w-md flex-col mt-[32px] gap-2" >
                            <label htmlFor="Senha">Senha</label>
                            <input 
                                {...register('password')}
                                className={`rounded-md border h-[48px] border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
                                ${errors.password ? 'border-rose-600' : 'border-gray-400'}`} 
                                type={showPassword ? 'text' : 'password'}
                                />
                            <button
                                className="button-show-password absolute right-2 top-12"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                            </button>
                            <span className="text-[14px] text-gray-600" >A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula e 1 número</span>
                        </div>
                        {errors.password && (
                            <span className="text-sm text-rose-600 mt-2">
                            {errors.password.message}
                            </span>
                        )}

                        <PrimaryButton type="submit" className="h-[48px] w-full text-sm font-normal mt-[32px]" >
                            Criar conta
                        </PrimaryButton>

                        <span className="text-xs text-gray-800 mt-[24px]" >Ao clicar em “Criar conta”, eu aceito os <a className="text-blue-400" >Termos e Condições</a> e a <a className="text-blue-400" >Política de Privacidade</a> da Cosmos</span>
                        <p className="text-[16px] mt-[80px] text-center text-gray-400 font-normal" >Já tem uma conta? <a className="text-purple-700 font-semibold" >Fazer login</a></p>
                    </form>
                </main>
            </div>
        </div>
    );
}