import Head from "next/head";
import { UserLoginForm } from "../../components/Login/LoginForm";
import Main from "../../components/Main";

const Entrar = () => {
  return (
    <>
    <Head>
      <title>Entrar | Cosmos</title>
    </Head>
    <div className="md:flex h-screen">
      <Main />
      <UserLoginForm />
    </div>
    </>
  );
}

export default Entrar;