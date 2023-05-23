/* eslint-disable @next/next/no-img-element */
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router";
import { useState } from "react";
import { CaretRight } from "phosphor-react";

import { BackButton } from "../../components/Welcome/BackButton";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthProvider/useAuth";

const schemaGender = z.object({
  gender: z.string().nonempty("Por favor selecione o seu gênero")
})

type GenderForm = z.infer<typeof schemaGender>

export default function Genero() {
  const [gender, setGender] = useState("")
  const [otherGenderActive, setOtherGenderActive] = useState(true);
  const router = useRouter()

  const { handleSubmit } = useForm<GenderForm>()

  const useAuthenticate = useAuth()
  function submitFormGender() {
    api.patch("/user/onboarding", {
      "gender": gender,
    },
      {
        headers: {
          "Authorization": "Bearer " + useAuthenticate.accessToken
        }
      }
    )
    router.push("/usuario/codigo-empresa")
  }

  return (
    <>
      <BackButton link="/usuario/iniciar" />
      <main
        className="bg-bgCadastro h-screen bg-cover bg-no-repeat flex items-center justify-around">
        <img
          className="h-fit w-1/3 self-end"
          src="/images/astronauta.png"
          alt="Imagem de um astronauta" />
        <form
          action=""
          onSubmit={handleSubmit(submitFormGender)}
          className="flex flex-col items-center justify-center gap-8 py-10 px-8 backdrop-blur-md bg-black/10 rounded-2xl">
          <h2
            className="text-2xl text-zinc-50 max-w-xs text-center font-semibold">Com qual gênero você se identifica?</h2>
          <span
            className="text-xl text-zinc-50 font-light max-w-lg text-center"
          >Utilizaremos esses dados para mapear o público da nossa plataforma!</span>

          <input
            onClick={() => { setGender("Feminino") }}
            type="submit"
            name="Feminino"
            value="Feminino"
            className="py-4 bg-violet-500 w-full rounded-lg text-lg text-zinc-50 font-semibold cursor-pointer hover:bg-violet-600 transition-all duration-200" />

          <input
            onClick={() => { setGender("Masculino") }}
            type="submit"
            value="Masculino"
            name="Masculino"
            className="py-4 bg-violet-500 w-full rounded-lg text-lg text-zinc-50 font-semibold cursor-pointer hover:bg-violet-600 transition-all duration-200" />

          {otherGenderActive ? (
            <input
              onClick={() => setOtherGenderActive(!otherGenderActive)}
              type="submit"
              value={"Outro"}
              className="py-4 bg-violet-500 w-full rounded-lg text-lg text-zinc-50 font-semibold cursor-pointer hover:bg-violet-600 transition-all duration-200" />
          ) : (

            <div className="flex justify-between w-full">
              <input
                type="text"
                placeholder="Digite seu gênero"
                onChange={(e) => setGender(e.target.value)}
                className="p-4 bg-zinc-50 text-zinc-700 text-lg flex-1 rounded-lg border border-solid focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-violet-500 py-3 px-8 ml-4 rounded-lg  text-zinc-50 hover:bg-violet-600 transition-all duration-200">
                <CaretRight weight="bold" size={32} />
              </button>
            </div>
          )}
        </form>
      </main>
    </>
  )
}