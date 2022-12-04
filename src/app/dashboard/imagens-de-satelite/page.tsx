"use client";
import * as Dialog from "@radix-ui/react-dialog";

import { ModalSatelite } from "./modalSatelite";
import { ItemSatelite } from "./ItemSatelite";
import Image from "next/image";

const SatelitesPage = () => {
  return (
    <>
      <Dialog.Root>
        <ModalSatelite />

        <div className="flex flex-col items-center gap-9 px-20 pt-4 w-full h-screen lg:overflow-y-hidden bg-bgsatelites bg-cover bg-center">
          <h3 className="text-white text-2xl font-semibold text-center">
            Clique sobre a Estrela e os planetas para conhecer mais sobre a{" "}
            <br />
            instituição que você irá mentorar
          </h3>

          <div className="lg:overflow-hidden">
            <div className="grid grid-cols-4 lg:grid-cols-8 lg:grid-rows-6 gap-2 justify-center">
              <ItemSatelite className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
                <Image
                  src={"/images/satelites/recursos.png"}
                  alt="ts"
                  width={52}
                  height={52}
                />
                <p className="w-28 font-semibold">Captação de recursos</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-1"
                }
              >
                <Image
                  src={"/images/satelites/financas.png"}
                  alt="ts"
                  width={40}
                  height={40}
                />
                <p className="w-28 font-semibold">Finanças</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-6 lg:col-end-7 lg:row-start-1 lg:row-end-1 "
                }
              >
                <Image
                  src={"/images/satelites/juridico.png"}
                  alt="juridico"
                  width={55}
                  height={55}
                />
                <p className="w-28 font-semibold">Jurídico</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-8 lg:col-end-9 lg:row-start-1 lg:row-end-3 "
                }
              >
                <Image
                  src={"/images/satelites/pessoas.png"}
                  alt="Pessoas"
                  width={55}
                  height={55}
                />
                <p className="w-28 font-semibold">Gestão de Pessoas</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-2 lg:col-end-2 lg:row-start-3 lg:row-end-3 "
                }
              >
                <Image
                  src={"/images/satelites/marketing.png"}
                  alt="Marketing"
                  width={38}
                  height={38}
                />
                <p className="px-6 font-semibold">Marketing</p>

              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-4 lg:col-end-6 lg:row-start-2 lg:row-end-5 "
                }
              >
                <Image
                className="mx-5"
                  src={"/images/satelites/instituto.png"}
                  alt="Instituto"
                  width={200}
                  height={150}
                />
                <p className="w-28 font-semibold">Instituto Dorina Nowill</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-7 lg:col-end-8 lg:row-start-3 lg:row-end-4 "
                }
              >
                <Image
                  src={"/images/satelites/impacto.png"}
                  alt="Instituto"
                  width={64}
                  height={64}
                />
                <p className="w-28 font-semibold">Avaliação de Impacto</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-1 lg:col-end-1 lg:row-start-4 lg:row-end-6 "
                }
              >
                <Image
                  src={"/images/satelites/projetos.png"}
                  alt="Projetos"
                  width={40}
                  height={40}
                />
                <p className="w-28 font-semibold">Gestão de Projetos</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-3 lg:col-end-4 lg:row-start-5 lg:row-end-7"
                }
              >
                <Image
                  src={"/images/satelites/sustentabilidade.png"}
                  alt="Sustentabilidade"
                  width={55}
                  height={55}
                />
                <p className="p-2 font-semibold">Sustentabilidade</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-6 lg:col-end-6 lg:row-start-5 lg:row-end-7"
                }
              >
                <Image
                  src={"/images/satelites/estrategia.png"}
                  alt="Estrategia"
                  width={55}
                  height={55}
                />
                <p className="px-6 font-semibold">Estratégia</p>
              </ItemSatelite>

              <ItemSatelite
                className={
                  "lg:col-start-8 lg:col-end-9 lg:row-start-4 lg:row-end-6 "
                }
              >
                <Image
                  src={"/images/satelites/lideranca.png"}
                  alt="Liderança"
                  width={50}
                  height={50}
                />
                <p className="px-6 font-semibold">Liderança</p>
              </ItemSatelite>
            </div>
          </div>
        </div>
      </Dialog.Root>
    </>
  );
};

export default SatelitesPage;
