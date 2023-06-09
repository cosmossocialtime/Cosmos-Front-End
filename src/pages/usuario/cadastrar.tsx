import Head from "next/head";
import { UserRegisterForm } from "../../components/Cadastro/RegisterForm";
import Main from "../../components/Main";

export default function Cadastrar() {
  return (
    <div>
      <Head>
        <title>Cadastrar | Cosmos</title>
      </Head>
      <div className="md:flex h-screen">
        <Main />
        <UserRegisterForm />
      </div>
    </div>
  );
}
