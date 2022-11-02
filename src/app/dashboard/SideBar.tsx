"use client";

import {
  ArrowLeft,
  Calendar,
  ChatCenteredDots,
  File,
  HouseLine,
  MapTrifold,
  Star,
  UsersThree,
} from "phosphor-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const SideBar = () => {
  const SideBarItems = [
    {
      id: 1,
      route: "/dashboard/painel-da-missao",
      name: "Painel da Missão",
      icon: <HouseLine />,
    },
    { id: 2, route: "/dashboard/diario-de-bordo", name: "Diário de Bordo", icon: <File /> },
    {
      id: 3,
      route: "/dashboard/imagens-de-satelite",
      name: "Imagens de Satétile",
      icon: <Star />,
    },
    {
      id: 4,
      route: "/dashboard/calendario-de-eventos",
      name: "Calendário de Eventos",
      icon: <Calendar />,
    },
    { id: 5, route: "/dashboard/chat", name: "Chat", icon: <ChatCenteredDots /> },
    {
      id: 6,
      route: "/dashboard/mapa-de-navegacao",
      name: "Mapa de Navegação",
      icon: <MapTrifold />,
    },
    { id: 7, route: "/dashboard/tripulacao", name: "Tripulação", icon: <UsersThree /> },
  ];

  const [showside, setShowSide] = useState(false);
  const [isSelected, setIsSelected] = useState(0);

  return (
    <div className="flex">
      <aside className="bg-c-blue-800 h-screen max-w-[19rem] flex flex-col">
        <div>
          <div className="mx-auto w-fit my-5">
            {showside ? (
              <>
                <Image
                  width={30}
                  height={0}
                  src="/images/Ccosmos.svg"
                  alt="Logo Cosmos"
                />
              </>
            ) : (
              <>
                <Image
                  width={150}
                  height={0}
                  src="/images/logoCosmosBranco.svg"
                  alt="Logo Cosmos"
                />
              </>
            )}
          </div>

          <div className="flex flex-col px-2">
            {SideBarItems.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  onClick={() => setIsSelected(item.id)}
                  className={`flex items-center text-white ${
                    isSelected === item.id && "bg-white/10"
                  } rounded-lg p-2 gap-2`}
                >
                  <span
                    className={`${
                      isSelected === item.id ? "bg-purple-600" : "bg-white/10"
                    } p-4 rounded-full text-2xl`}
                  >
                    {item.icon}
                  </span>
                  <strong className={`${showside && "hidden"}`}>
                    {item.name}
                  </strong>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col bg-c-blue-950 text-white mt-auto p-2">
          <Link href="/">{showside ? "?" : "Precisa de ajuda?"}</Link>
          <Link href="/" className="text-c-blue-500">
            {showside ? "Chat" : "Chat do Controle da Missão"}
          </Link>
        </div>
      </aside>

      <div className="flex items-center">
        <button
          onClick={() => setShowSide(!showside)}
          className={`bg-c-blue-800 h-fit text-lg text-white py-5`}
        >
          <ArrowLeft className={`${showside && "rotate-180"} transition-all`}/>
        </button>
      </div>
    </div>
  );
};
