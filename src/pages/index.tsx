import Router from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    const { pathname } = Router
    if (pathname === '/') {
      Router.push('/user/login')
    }
  })
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-900 text-zinc-50">
      <h2>Você será redirecionado para a página de login.</h2>
      <p>Por favor aguarde...</p>
    </div>
  )
}

export default Home
