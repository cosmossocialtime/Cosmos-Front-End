import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { UserRenewPasswordForm } from "./RenewPasswordForm";
import AccessService from "../../services/AccessService";
import Link from "next/link";
import { useRouter } from "next/router";

function Validate() {
  const router = useRouter();
  const params = new URLSearchParams(router.pathname);
  let token = params.get("token");

  const isInitialMount = useRef(true);
  const [IsValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      AccessService.ValidateToken(token)
        .then((response: any) => {
          if (response.data.type.includes("success")) {
            setIsValidToken(true);
            toast.success(
              "Olá, encontramos sua requisição, que tal criarmos uma nova senha?"
            );
          } else {
            toast.warning(response.data.text);
          }
        })
        .catch((e: Error) => {
          toast.error(
            "Ops...não foi processar sua requisição, tente novamente mais tarde."
          );
        });
    }
  });

  return IsValidToken ? ValidatedToken() : InvalidatedToken();
}

export function EmailConfirmed() {
  return (
    <Container>
      <Main>
        <h2>Enviamos um email pra você</h2>
        <p>
          Redefina sua senha clicando no link que enviamos para o e-mail [email@email.com] e depois faça seu login.
        </p>
      </Main>
      <Link href="/usuario/entrar">
        <button className="cBtn">Fazer login</button>
      </Link>
    </Container>
  );
}

export function Email() {
  return (
    <Container>
      <Main>
        <h2>Email de recuperação de senha enviado!</h2>
        <p>
          Se tudo estiver correto, você receberá um e-mail com um Link para
          redefinir sua senha.
        </p>
      </Main>
      <Link href="/usuario/entrar">
        <button className="cBtn">Fazer login</button>
      </Link>
    </Container>
  );
}

function ValidatedToken() {
  return <UserRenewPasswordForm />;
}

function InvalidatedToken() {
  return (
    <Container>
      <Main>
        <h2>Ops...Houve um erro ao processar esta requisição!</h2>
        <p>Tente novamente mais tarde, ou faça uma nova requisição.</p>
      </Main>
      <Link href="/usuario/entrar">
        <button className="cBtn">Fazer login</button>
      </Link>

      <ToastContainer />
    </Container>
  );
}

const UserRecoveryMessage = {
  Email,
  EmailConfirmed,
  Validate,
};

export default UserRecoveryMessage;

const Container = styled.main`
  margin: 0 auto;
  /* padding-top: 4rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 5rem;

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
  }

  p {
    font-size: 1.125rem;
    width: min(440px, 100%);
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 8rem;

  p {
    font-size: 0.85rem;
    width: min(348px, 100%);
    color: var(--gray-500);
    margin-bottom: 0.5rem;
  }

  div {
    font-size: 1rem;
    color: var(--purple-400);
  }
`;
