import * as Dialog from "@radix-ui/react-dialog";
import ModalSatelite from "./modalSatelite";
import ItemSatelite from "./ItemSatelite";
import { DatasPlanets } from "./datas";
import Image from "next/image";
import SideBar from "../sideBar";

const SatelitesPage = () => {
  return (
    <div className="flex overflow-x-hidden">
      <SideBar />
      <div className="flex flex-col items-center gap-16 px-20 pt-10 h-screen lg:overflow-y-auto bg-bgsatelites bg-cover bg-center w-auto">
        <h3 className="text-white text-2xl font-semibold text-center">
          Clique sobre a Estrela e os planetas para conhecer mais sobre a
          <br />
          instituição que você irá mentorar
        </h3>
        <div>
          <div className="lg:grid flex lg:grid-cols-12 lg:grid-rows-6 gap-2 justify-center">
            {DatasPlanets.map((planet) => {
              return (
                <Dialog.Root key={planet.id}>
                  <div className={planet.style}>
                    <ItemSatelite className="w-full h-full">
                      <Image src={planet.imageUrl} width={planet.size} height={planet.size} alt="Images " />
                      <h1>{planet.name}</h1>
                    </ItemSatelite>

                    <ModalSatelite name={planet.name} />
                  </div>
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
