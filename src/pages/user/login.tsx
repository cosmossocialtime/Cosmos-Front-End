import Head from "next/head";
import { UserLoginForm } from "../../components/Login/LoginForm";
import Main from "../../components/Main";

const Entrar = () => {
  return (
    <div>
      <Head>
        <title>Entrar | Cosmos</title>
      </Head>
      <div className="flex h-screen">
        <Main />
        <UserLoginForm />
      </div>
    </div>
  );
}

export default Entrar;