/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { BackButton } from "../../components/Welcome/BackButton";

export default function CompanyCode() {
  const [code, setCode] = useState("C - ")

  return (
    <>
      <BackButton link="/usuario/genero" />
      <main
        className="bg-bgCadastro h-screen bg-cover bg-no-repeat flex items-center justify-around">

        <form
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
              value={code}
              onChange={(e) => (setCode(e.target.value))}
              className="w-full bg-zinc-50 border-solid border border-gray-400 rounded-md py-3 p-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200 mt-1 text-zinc-800" />
          </label>

          <button className="py-4 w-full bg-violet-500 text-lg font-semibold text-zinc-50 rounded-lg">Continuar</button>
        </form>

        <img
          src="/images/bandeira.png"
          alt="Bandeira branca"
          className="mt-72"
        />

      </main>
    </>
  )
}