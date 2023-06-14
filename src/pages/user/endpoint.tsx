import Link from "next/link";
import { BackButton } from "../../components/BackButton";

export default function Decolar() {
  return (
    <>
      <BackButton link="/user/live" />
      <main className="bg-decolar h-screen bg-cover bg-no-repeat bg-bottom flex items-center justify-center text-zinc-50">
        <div className="w-fit flex flex-col items-center gap-5 p-16 backdrop-blur-md bg-black/10 rounded-2xl">
          <h2 className="text-2xl">Tudo pronto para a decolagem!</h2>
          <p className="max-w-sm text-xl font-light text-center">Viajaremos juntos para aprender e fazer o bem, ajudando organizações sociais a brilharem ainda mais!</p>
          <Link href="/main-painel/painel" className="py-4 bg-violet-500 w-full rounded-lg text-lg mt-5 hover:bg-violet-600 transition-colors text-center">Decolar!</Link>
        </div>
      </main>
    </>
  )
}