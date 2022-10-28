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
    <>
      <h2>Você será redirecionado para a página de login.</h2>
      <p>Por favor aguarde...</p>
    </>
  );
};

export default Home;
