/* eslint-disable @next/next/no-img-element */
import { BackButton } from "../../components/Welcome/BackButton";

export default function Genero() {
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
          className="flex flex-col items-center justify-center gap-8 py-10 px-8 backdrop-blur-md bg-black/10 rounded-2xl">
          <h2
            className="text-2xl text-zinc-50 max-w-xs text-center font-semibold">Com qual gênero você se identifica?</h2>
          <span
            className="text-xl text-zinc-50 font-light max-w-lg text-center"
          >Utilizaremos esses dados para mapear o público da nossa plataforma!</span>

          <input
            type="submit"
            value={"Feminino"}
            className="py-4 bg-violet-500 w-full rounded-lg text-lg text-zinc-50 font-semibold cursor-pointer hover:bg-violet-600 transition-all duration-200" />
          <input
            type="submit"
            value={"Masculino"}
            className="py-4 bg-violet-500 w-full rounded-lg text-lg text-zinc-50 font-semibold cursor-pointer hover:bg-violet-600 transition-all duration-200" />
          <input
            type="submit"
            value={"Outro"}
            className="py-4 bg-violet-500 w-full rounded-lg text-lg text-zinc-50 font-semibold cursor-pointer hover:bg-violet-600 transition-all duration-200" />

        </form>
      </main>
    </>
  )
}