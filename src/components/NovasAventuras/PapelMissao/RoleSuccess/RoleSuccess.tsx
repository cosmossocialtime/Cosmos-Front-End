import Link from "next/link";
import { Container } from "./style";

export function RoleSuccess() {
  return (
    <>
      <Container>
        <span>
          <div>
            <h2>Obrigada por se inscrever no programa Mentoria 1</h2>
            <p>
              O processo de seleção será feito pela empresa [Nome da Empresa]. O
              resultado será divulgado por e-mail até o dia dd/mm/aa.
              <br />
              <br />
              Caso seja uma das pessoas selecionadas, você encontrará o programa
              [Nome do Programa] na aba Minhas Missões e poderá dar início a sua
              jornada.
            </p>
            <Link href="/aventuras">
              <button className="cBtn">Voltar à tela inicial</button>
            </Link>
          </div>
        </span>
      </Container>
    </>
  );
}
