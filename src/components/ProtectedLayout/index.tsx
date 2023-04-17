/* eslint-disable @next/next/no-html-link-for-pages */
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useRouter } from "next/router";

export function ProtectedLayout({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const router = useRouter()

  if (router.pathname == "/usuario/entrar" || router.pathname == "/usuario/cadastrar" || router.pathname == "/usuario/recuperar") {
    return children
  }

  if (!auth.email) {
    return (
      <div className="flex h-screen bg-espaco items-center justify-center">
        <div className="p-10 rounded-xl bg-black/10 backdrop-blur-sm flex flex-col items-center gap-10">
          <h1 className="text-zinc-50 text-2xl max-w-3xl text-center">Você não tem permissão para acessar essa tela, por favor clique no botão abaixo e faça login!</h1>

          <a
            href="/usuario/entrar"
            className="p-2 bg-violet-500 w-2/3 text-center text-xl text-zinc-50 rounded-lg hover:bg-violet-600 transition-all duration-200"
          >Entrar</a>
        </div>
      </div>
    )
  }

  return children
}