import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import AccessService from "../../services/AccessService";
import Link from "next/link";
import { useRouter } from "next/router";

export function Validate() {
  const router = useRouter();

  // const location = useLocation();
  const params = new URLSearchParams(router.locale);
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
              "Olá, encontramos sua requisição, e confirmamos seu cadastro!"
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

export function Email() {
  return (
    <Container>
      <Main>
        <h2>Você finalizou seu cadastro!</h2>
        <p>
          Verifique sua conta pelo link que enviamos para o e-mail
          [email@email.com] e depois faça seu login
        </p>
      </Main>
      <Link href="/usuario/entrar">
        <button className="cBtn">Fazer login</button>
      </Link>

      <Footer>
        <p>
          Caso não tenha recebido o link, verifique sua caixa de spam e veja se
          o email fornecido está correto
        </p>
      </Footer>
    </Container>
  );
}

function ValidatedToken() {
  return (
    <Container>
      <Main>
        <h2>Parabéns, cadastro foi confirmado com sucesso!</h2>
      </Main>
      <Link href="/usuario/entrar">
        <button className="cBtn">Fazer login</button>
      </Link>

      <Footer>
        <p>
          Agora é só fazer login e aproveitar todos os recursos da plataforma!
        </p>
        <ToastContainer />
      </Footer>
    </Container>
  );
}

function InvalidatedToken() {
  return (
    <Container>
      <Main>
        <h2>Cadastro já confirmado ou inválido!</h2>
        <p>Tente novamente mais tarde, ou faça uma nova requisição.</p>
      </Main>
      <Link href="/usuario/entrar">
        <button className="cBtn">Fazer login</button>
      </Link>

      <Footer>
        <p>
          Verifique sua caixa de spam, verifique se esta conta já foi confirmada
          ou tente novamente mais tarde!
        </p>
        <ToastContainer></ToastContainer>
      </Footer>
    </Container>
  );
}

const UserRegisterMessage = {
  Email,
  Validate,
};

export default UserRegisterMessage;

const Container = styled.main`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
