import Link from "next/link";
import styled from "styled-components";

export function Confirmed() {
  return (
    <Container>
      <Main>
      <h2>Sua conta foi confirmada com sucesso!</h2>
        <p>
          Agora, basta fazer Login para iniciar sua jornada.
        </p>
      </Main>
      <Link href="/register/login-form" className="cBtn">Fazer login</Link>
      <Footer>
        <p>
          Caso não tenha recebido o link, verifique sua caixa de spam e veja se
          o email fornecido está correto
        </p>
      <div>
      </div>
      </Footer>
    </Container>
  );
}

export function NotConfirmed() {
  return (
    <Container>
      <Main>
      <h2>Ops...houve um erro ao validar sua requisição!</h2>
        <p>
          Por favor, tente novamente mais tarde.
        </p>
      </Main>
      <Link href="/register/login-form" className="cBtn">Fazer login</Link>
      <Footer>
        <p>
          Nossa equipe já esta trabalhando para resolver este problema.
        </p>
      <div>
        {/* <Link to=''>Enviar novo link de confirmação</Link> • <Link to='/cadastro/newemail'>Trocar email</Link> */}
      </div>
      </Footer>
    </Container>
  );
}


const Container = styled.main`

  margin: 0 auto;
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`

const Footer = styled.footer`

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 8rem;

    p{
        font-size: .85rem;
        width: min(348px, 100%);
        color: var(--gray-500);
        margin-bottom: .5rem;
    }

    div{
        font-size: 1rem;
        color: var(--purple-400);
    }
`