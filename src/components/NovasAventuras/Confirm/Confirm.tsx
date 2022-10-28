import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import { FormEvent } from "react";
import { HeaderMissao } from "../PapelMissao/HeaderMissao";
import { Footer } from "../PapelMissao/OptionSelect/style";
import { CheckboxItem } from "./CheckboxItem/CheckboxItem";
import { Container, Form } from "./style";

export function Confirm() {
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data);
    router.push("/rolesuccess");
  }

  return (
    <>
      <HeaderMissao title="Confirmação" />
      <Container>
        <h2>
          Ufa! Chegamos na última etapa! Agora, escolha em quais áreas do
          conhecimento você pode contribuir com a organização mentorada:
        </h2>
        <Form id="areasConhecimento" onSubmit={handleSubmit}>
          <div>
            <CheckboxItem valueName="0" label="Análise de dados" />
            <CheckboxItem valueName="1" label="Comercial" />
            <CheckboxItem valueName="2" label="Comunicação e Marketing" />
            <CheckboxItem valueName="3" label="Finanças" />
            <CheckboxItem valueName="4" label="Gestão de Pessoas" />
          </div>

          <div>
            <CheckboxItem valueName="5" label="Gestão de Projetos" />
            <CheckboxItem valueName="6" label="Desenvolvimento de Lideranças" />
            <CheckboxItem valueName="7" label="Estratégia" />
            <CheckboxItem valueName="8" label="Jurídico" />
            <CheckboxItem valueName="9" label="Sustentabilidade" />
          </div>
        </Form>
        <Footer>
          <Link href="selectrole">
            <a>
              <ArrowLeft />
            </a>
          </Link>
          <button form="areasConhecimento" className="cBtn">
            Enviar inscrição
          </button>
        </Footer>
      </Container>
    </>
  );
}
