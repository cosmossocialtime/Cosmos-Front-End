/* eslint-disable @next/next/no-img-element */
export default function Iniciar() {
  return (
    <main className="flex h-screen items-center justify-center bg-espaco bg-cover bg-no-repeat p-4 text-white">
      <div className="flex flex-col items-center gap-10 rounded-2xl bg-black/10 p-10 backdrop-blur-md">
        <h2 className="text-4xl font-semibold">Boas-vindas, Cosmonauta!</h2>
        <p className="max-w-sm text-center text-xl font-light">
          Antes de começarmos, precisamos saber um pouco mais sobre você
        </p>
        <a
          className=" rounded-lg bg-violet-500 py-3 px-40 text-lg font-semibold transition-all duration-150 hover:bg-violet-600"
          href={'/user/gender'}
        >
          Vamos lá
        </a>
      </div>
      <img
        className="z-10 -ml-10 h-fit w-1/3"
        src="/images/satelite.png"
        alt="Imagem de um satélite"
      />
    </main>
  )
}
