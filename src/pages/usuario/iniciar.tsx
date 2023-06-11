/* eslint-disable @next/next/no-img-element */

export default function Iniciar() {
  return (
    <main className="bg-espaco bg-cover bg-no-repeat h-screen text-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-10 p-10 backdrop-blur-md rounded-2xl bg-black/10">
        <h2 className="text-4xl font-semibold">Boas-vindas, Cosmonauta!</h2>
        <p className="max-w-sm text-center text-xl font-light">
          Antes de começarmos, precisamos saber um pouco mais sobre você
        </p>
        <a
          className=" py-2 px-40 bg-violet-500 text-lg transition-all duration-150 hover:bg-violet-600 rounded-lg font-semibold"
          href={"/usuario/genero"}>
          Vamos lá
        </a>
      </div>
      <img
        className="h-fit w-1/3 z-10 -ml-10"
        src="/images/satelite.png"
        alt="Imagem de um satélite" />
    </main >
  )
}
