import { useContext, useState } from "react";
import { useRouter } from "next/router";


import { Container, Content, Input } from "./style";
import { BackButton } from "../../BackButton";
import { RegisterContext } from "../../context/RegisterContext";

export function UserCEP() {
  const router = useRouter();

  const [userCEP, setUserCEP] = useState(0);

  const { setCEP } = useContext(RegisterContext);

  function SetUserCEP() {

    !userCEP ? (alert("CEP inválido")) :

      (setCEP(userCEP));
  }

  return (
    <>
      <BackButton link="/usuario/genero" />
      <Container>
        <Content>
          <strong>Onde a sua nave está estacionada?</strong>
          <Input>
            <label>Digite seu CEP</label>

            <input
              maxLength={8}
              spellCheck={false}
              placeholder="00.000-000"
              onChange={(e) => setUserCEP(Number(e.target.value))}
            />
          </Input>
          <button type="button" onClick={SetUserCEP} className="cBtn">
            Entrar na nave
          </button>
        </Content>
      </Container>
    </>
  );
}
