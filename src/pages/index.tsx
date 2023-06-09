import Router from "next/router";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/usuario/entrar");
    }
  });
  return (
    <div className="h-screen bg-zinc-900 text-zinc-50 flex flex-col items-center justify-center">
      <h2>Você será redirecionado para a página de login.</h2>
      <p>Por favor aguarde...</p>
    </div>
  );
};

export default Home;
