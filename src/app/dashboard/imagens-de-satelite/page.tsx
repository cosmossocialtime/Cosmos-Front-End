"use client";

import { ModalSatelite } from "./modalSatelite";
import { ItemSatelite } from "./ItemSatelite";
import { useState } from "react";

const SatelitesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
        <ModalSatelite isOpen={isModalOpen} handleModal={handleModal} />
      
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
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/financas.png"
            imgAlt={"planeta azul"}
            sateliteName={"Finanças"}
            handleModal={handleModal}

          />

          <ItemSatelite
            sateliteImg="/images/satelites/juridico.png"
            imgAlt={"planeta vermelho"}
            sateliteName={"Jurídico"}
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/pessoas.png"
            imgAlt={"planeta amarelo"}
            sateliteName={"Gestão de Pessoas"}
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/marketing.png"
            imgAlt={"planeta rosa"}
            sateliteName={"Marketing"}
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/instituto.png"
            imgAlt={"estrela branca"}
            sateliteName={"Instituto Dorina Nowill"}
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/impacto.png"
            imgAlt={"planeta verde e azul"}
            sateliteName={"Avaliação de Impacto"}
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/projetos.png"
            imgAlt={"planeta laranja"}
            sateliteName={"Gestão de Projetos"}
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/sustentabilidade.png"
            imgAlt={"planeta verde claro"}
            sateliteName={"Sustentabilidade"}
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/estrategia.png"
            imgAlt={"planeta azul com roxo"}
            sateliteName={"Estratégia"}
            handleModal={handleModal}
          />

          <ItemSatelite
            sateliteImg="/images/satelites/lideranca.png"
            imgAlt={"planeta azul"}
            sateliteName={"Liderança"}
            handleModal={handleModal}
          />

        </div>
      </div>
    </>
  );
};

export default SatelitesPage;
