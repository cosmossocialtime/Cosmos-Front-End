export default function Decolar() {
  return (
    <main className="bg-bgTerra h-screen bg-cover bg-no-repeat flex items-center justify-center text-zinc-50">
      <div className="w-fit flex flex-col items-center gap-5 p-16 backdrop-blur-md bg-black/10 rounded-2xl">
        <h2 className="text-2xl">Tudo pronto para a decolagem!</h2>
        <p className="max-w-md text-xl font-light text-center">Viajaremos juntos para aprender e fazer o bem, ajudando organizações sociais a brilharem ainda mais!</p>
        <button className="py-4 bg-violet-500 w-full rounded-lg text-lg mt-5 hover:bg-violet-600 transition-colors">Decolar!</button>
      </div>
    </main>
  )
}