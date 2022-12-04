"use client";
import * as Dialog from "@radix-ui/react-dialog";

import { ModalSatelite } from "./modalSatelite";
import { ItemSatelite } from "./ItemSatelite";

const SatelitesPage = () => {
  return (
    <>
      <Dialog.Root>
        <ModalSatelite />

        <div className="flex flex-col items-center justify-center gap-9 px-20 pt-4 w-full h-screen lg:overflow-y-hidden bg-bgsatelites bg-cover bg-center">
          <h3 className="text-white text-2xl font-semibold text-center">
            Clique sobre a Estrela e os planetas para conhecer mais sobre a{" "}
            <br />
            instituição que você irá mentorar
          </h3>

          <div className="lg:overflow-hidden">
            <div className="grid grid-cols-4 lg:grid-cols-8 lg:grid-rows-6 gap-2 justify-center">
              <ItemSatelite
                sateliteImg="/images/satelites/recursos.png"
                imgAlt={"planeta roxo"}
                sateliteName={"Captação de Recursos"}
                className={"lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/financas.png"
                imgAlt={"planeta azul"}
                sateliteName={"Finanças"}
                className={"lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-1 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/juridico.png"
                imgAlt={"planeta vermelho"}
                sateliteName={"Jurídico"}
                className={"lg:col-start-5 lg:col-end-6 lg:row-start-1 lg:row-end-1 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/pessoas.png"
                imgAlt={"planeta amarelo"}
                sateliteName={"Gestão de Pessoas"}
                className={"lg:col-start-7 lg:col-end-8 lg:row-start-1 lg:row-end-3 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/marketing.png"
                imgAlt={"planeta rosa"}
                sateliteName={"Marketing"}
                className={"lg:col-start-2 lg:col-end-2 lg:row-start-3 lg:row-end-3 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/instituto.png"
                imgAlt={"estrela branca"}
                sateliteName={"Instituto Dorina Nowill"}
                className={"lg:col-start-4 lg:col-end-4 lg:row-start-3 lg:row-end-4 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/impacto.png"
                imgAlt={"planeta verde e azul"}
                sateliteName={"Avaliação de Impacto"}
                className={"lg:col-start-6 lg:col-end-6 lg:row-start-3 lg:row-end-3 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/projetos.png"
                imgAlt={"planeta laranja"}
                sateliteName={"Gestão de Projetos"}
                className={"lg:col-start-1 lg:col-end-1 lg:row-start-4 lg:row-end-6 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/sustentabilidade.png"
                imgAlt={"planeta verde claro"}
                sateliteName={"Sustentabilidade"}
                className={"lg:col-start-3 lg:col-end-4 lg:row-start-5 lg:row-end-6 "}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/estrategia.png"
                imgAlt={"planeta azul com roxo"}
                sateliteName={"Estratégia"}
                className={"lg:col-start-5 lg:col-end-5 lg:row-start-5 lg:row-end-5"}
              />

              <ItemSatelite
                sateliteImg="/images/satelites/lideranca.png"
                imgAlt={"planeta azul"}
                sateliteName={"Liderança"}
                className={"lg:col-start-7 lg:col-end-7 lg:row-start-4 lg:row-end-6 "}
              />
            </div>
          </div>
        </div>
      </Dialog.Root>
    </>
  );
};

export default SatelitesPage;
