"use client";
import * as Dialog from "@radix-ui/react-dialog";

import { ModalSatelite } from "./modalSatelite";
import { ItemSatelite } from "./ItemSatelite";

const SatelitesPage = () => {


  return (
    <>
      <Dialog.Root>
        <ModalSatelite/>

        <div className="px-20 w-full h-screen overflow-y-auto bg-bgsatelites bg-cover bg-center">
          <h3 className="text-white">
            Clique sobre a Estrela e os planetas para conhecer mais sobre a
            instituição que você irá mentorar
          </h3>

          <div className="flex flex-wrap gap-[15%] gap-y-3 justify-center">
            <ItemSatelite
              sateliteImg="/images/satelites/recursos.png"
              imgAlt={"planeta roxo"}
              sateliteName={"Captação de Recursos"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/financas.png"
              imgAlt={"planeta azul"}
              sateliteName={"Finanças"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/juridico.png"
              imgAlt={"planeta vermelho"}
              sateliteName={"Jurídico"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/pessoas.png"
              imgAlt={"planeta amarelo"}
              sateliteName={"Gestão de Pessoas"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/marketing.png"
              imgAlt={"planeta rosa"}
              sateliteName={"Marketing"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/instituto.png"
              imgAlt={"estrela branca"}
              sateliteName={"Instituto Dorina Nowill"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/impacto.png"
              imgAlt={"planeta verde e azul"}
              sateliteName={"Avaliação de Impacto"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/projetos.png"
              imgAlt={"planeta laranja"}
              sateliteName={"Gestão de Projetos"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/sustentabilidade.png"
              imgAlt={"planeta verde claro"}
              sateliteName={"Sustentabilidade"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/estrategia.png"
              imgAlt={"planeta azul com roxo"}
              sateliteName={"Estratégia"}
            />

            <ItemSatelite
              sateliteImg="/images/satelites/lideranca.png"
              imgAlt={"planeta azul"}
              sateliteName={"Liderança"}
            />
          </div>
        </div>
      </Dialog.Root>
    </>
  );
};

export default SatelitesPage;
