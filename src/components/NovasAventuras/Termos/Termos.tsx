import { Check } from "phosphor-react";
import { useState } from "react";
import { CheckboxItem } from "../Confirm/CheckboxItem/CheckboxItem";
import { HeaderMissao } from "../PapelMissao/HeaderMissao";
import { ForwardArrow } from "../SobreVoce/ForwardArrow/ForwardArrow";
import {
  Container,
} from "./style";

export default function Termos() {
  const [isLGPDchecked, setIsLGPDcheck] = useState(false);

  function handleLGPD() {
    setIsLGPDcheck(!isLGPDchecked)
  }

  return (
    <>
      <HeaderMissao title="[Nome do Programa]" />
      <Container>
        <h2>
          Coloque seu capacete, ajuste seu traje e se prepare para uma aventura!
        </h2>
        <div>
          <p>
            Antes de iniciar nossa missão, precisamos de mais algumas
            informações para conseguir compor a tripulação e ajustar as funções
            de cada pessoa voluntária.
          </p>

          <p>
            É importante que você esteja ciente que suas respostas poderão ser
            compartilhadas com os organizadores do programa, com os
            profissionais da instituição mentorada e com os seus colegas de
            equipe.
          </p>

          <p>
            Para mais informações sobre como as suas informações serão tratadas,
            acesse o{" "}
            <a href="#">Termo de Consentimento ao Tratamento de Dados</a>.
          </p>
        </div>

        <CheckboxItem
          functionClick={handleLGPD}
          valueName="termosAceito"
          label="Aceito que minhas respostas sejam compartilhadas"
        />
      </Container>
      <ForwardArrow to="/forminscricao" back="/aventuras" page={0} isActive={+isLGPDchecked} />
    </>
  );
}
