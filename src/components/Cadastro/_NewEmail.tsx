import Link from "next/link";
import styled from "styled-components";

export function NewEmail() {
  return (
    <Container>
      <Main>
        <h2>Atualize os seus dados</h2>
        <p>Seu e-mail antigo: [email@email.com]</p>
      </Main>

      <Input>
       <label htmlFor="newEmail">Email atualizado</label>
       <input id="newEmail" placeholder="exemplo@email.com" />
      </Input>
      <Link href='' className='cBtn'>Atualizar email</Link>
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
        -webkit-font-smoothing: antialiased!important;

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

const Input = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: .5rem;
    width: min(384px, 100%);
    margin-bottom: 2.5rem;
    input{
        border: 1px solid var(--gray-500);
        width: 100%;
        padding: 0.75rem;
        border-radius: 0.25rem;
    }
 
`