"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalSatelite } from "./modalSatelite";
import { ItemSatelite } from "./ItemSatelite";
import Image from "next/image";
import { DatasPlanets } from "./datas";

const SatelitesPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-9 px-20 pt-4 w-full h-screen lg:overflow-y-hidden bg-bgsatelites bg-cover bg-center">
        <h3 className="text-white text-2xl font-semibold text-center">
          Clique sobre a Estrela e os planetas para conhecer mais sobre a
          <br />
          instituição que você irá mentorar
        </h3>
        <div className="lg:overflow-hidden">
          <div className="grid grid-cols-4 lg:grid-cols-8 lg:grid-rows-6 gap-2 justify-center">
            {DatasPlanets.map((planet) => {
              return (
                <Dialog.Root key={planet.id}>
                  <ItemSatelite className="flex">
                    <Image
                      src={planet.imageUrl}
                      alt={planet.name}
                      width={planet.width}
                      height={planet.height}
                    />
                    <p className="w-28 font-semibold">{planet.name}</p>
                  </ItemSatelite>

                  <ModalSatelite 
                    name={planet.name}
                  />
                </Dialog.Root>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelitesPage;
