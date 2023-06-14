import { useState } from "react";
import { BackButton } from "../../components/BackButton";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Image from "next/image";

const shemaCompanyCode = z.object({
  code: z.string().nonempty("O código da empresa é obrigatorio")
})
type TypeCompanyCode = z.infer<typeof shemaCompanyCode>

export default function CompanyCode() {
  const [code, setCode] = useState("")
  const { handleSubmit } = useForm<TypeCompanyCode>()
  const router = useRouter()

  function getCodeForInput(code: string) {
    const codeWithoutC = code.split('-')[1]
    setCode(codeWithoutC)
  }

  function submitForm() {
    if (!code) {
      return toast.error("Por gentileza digite um código válido")
    }

    try {
      api.patch("/user/onboarding", {
        "companyCode": code,
      }
      ).then((response) => {
        if (response.status === 200) {
          router.push("/user/birth")
        }
      })
    } catch (error: any) {
      if (error.response.status === 400) return toast.error("Error")
    }
  }

  return (
    <div className="relative">
      <BackButton link="/user/gender" />
      <main
        className="bg-bgCadastro h-screen bg-cover bg-no-repeat bg-bottom flex items-center justify-around ">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col items-center justify-center gap-12 py-10 px-8 backdrop-blur-md bg-black/10 rounded-2xl max-w-md"
        >
          <h2
            className="text-2xl text-zinc-50 text-center font-semibold">
            Qual o código da empresa em que você trabalha?
          </h2>
          <span
            className="text-xl text-zinc-50 text-center">
            Esse código foi enviado para você no mesmo e-mail em que a sua empresa divulgou o programa de voluntariado.
          </span>
          <label className="text-zinc-50" >
            Digite o código da empresa
            <input
              type="text"
              value={`C-${code}`}
              onChange={(e) => (getCodeForInput(e.target.value))}
              className="w-full bg-zinc-50 border-solid border border-gray-400 rounded-md py-3 p-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200 mt-1 text-zinc-800" />
          </label>
          <button className="py-4 w-full bg-violet-500 text-lg font-semibold text-zinc-50 rounded-lg">Continuar</button>
        </form>
        <Image
          width={268}
          height={268}
          src="/images/bandeira.png"
          alt="Bandeira branca"
          className="flex absolute bottom-10 left-2/3"
        />
        <ToastContainer autoClose={2000} limit={3} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['cosmos.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/usuario/entrar',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}