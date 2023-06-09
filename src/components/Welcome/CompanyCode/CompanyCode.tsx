/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { RegisterContext } from "../../context/RegisterContext";
import { BackButton } from "../BackButton";
import { Container, Content } from "./style";
import Image from "next/image";


export function CompanyCode() {
  const [companyCode, setCompanyCode] = useState("");
  const router = useRouter();
  const { setCompany } = useContext(RegisterContext);

  function SubmitPousar() {
    setCompany(companyCode);
    router.push("/usuario/nascimento");
  }
  return (
    <>
      <BackButton link="/usuario/genero" />
      <Container>
        <Content>
          <div>
            <strong>Digite o código da empresa em que você trabalha</strong>
            <p>
              Esse código foi enviado para você no mesmo e-mail em que a empresa
              divulgou o programa de voluntariado
            </p>

            <form>
              <label htmlFor="companyCode">Digite o código da empresa</label>
              <input
                placeholder="C-"
                id="companyCode"
                spellCheck={false}
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
              />
            </form>

            <button type="button" className="cBtn" onClick={SubmitPousar}>
              Ir até a Terra
            </button>
          </div>

          <Image 
            src="/images/bandeira.png" 
            alt="Imagem de uma bandeira"
          />
        </Content>
      </Container>
    </>
  );
}

