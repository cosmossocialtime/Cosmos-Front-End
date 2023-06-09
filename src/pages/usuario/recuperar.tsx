import Head from "next/head";
import Main from "../../components/Main";
import { UserRecoveryForm } from "../../components/Recovery/RecoveryForm";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Recuperar() {
  return (
    <div>
      <Head>
        <title>Esqueci minha senha | Cosmos</title>
      </Head>
      <div className="md:flex h-screen">
        <Main />
        <UserRecoveryForm />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['cosmos.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/usuario/entrar',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}