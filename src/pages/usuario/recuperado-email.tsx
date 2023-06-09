import { GetServerSideProps } from "next";
import Main from "../../components/Main";
import UserRecoveryMessage from "../../components/Recovery/RecoveryMessages";
import { parseCookies } from "nookies";

export default function RecuperadoEmail() {
  return (
    <div className="md:flex h-screen">
      <Main />
      <UserRecoveryMessage.EmailConfirmed />
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