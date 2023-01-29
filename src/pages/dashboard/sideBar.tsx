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
import { useRouter } from "next/router";

export const SideBar = () => {
  const SideBarItems = [
    {
      id: 1,
      route: "/dashboard/painel-da-missao",
      name: "Painel da Missão",
      icon: <HouseLine />,
    },
    {
      id: 2,
      route: "/dashboard/diario-de-bordo",
      name: "Diário de Bordo",
      icon: <File />
    },
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
    {
      id: 5,
      route: "/dashboard/chat",
      name: "Chat",
      icon: <ChatCenteredDots />
    },
    {
      id: 6,
      route: "/dashboard/mapa-de-navegacao",
      name: "Mapa de Navegação",
      icon: <MapTrifold />,
    },
    {
      id: 7,
      route: "/dashboard/tripulacao",
      name: "Tripulação",
      icon: <UsersThree />
    },
  ];
  const { pathname } = useRouter()
  const [showside, setShowSide] = useState(true);

  return (
    <div className="relative">
      <aside className={`${showside ? "w-[19rem]" : "w-[5.5rem]"} bg-violet-900 min-h-screen flex flex-col relative transition-all duration-300 overflow-hidden`}>
        <div>
          <div className="mx-auto w-fit my-5">
            {showside ? (
              <Image
                width={160}
                height={32}
                src="/images/logoCosmosBranco.svg"
                alt="Logo Cosmos"
              />
            ) : (
              <Image
                width={32}
                height={0}
                src="/images/Ccosmos.svg"
                alt="Logo Cosmos"
              />
            )}
          </div>

          {showside &&
            <Link
              href={"/painelprincipal/painel"}
              className="block mx-auto mb-2 text-center text-blue-400 font-semibold"
            >
              Voltar ao Painel Principal
            </Link>
          }

          <div className="flex flex-col px-2 relative">

            {SideBarItems.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`${pathname === item.route ? "bg-white/10" : ""} z-[1] p-2 flex items-center gap-4 w-72 text-white rounded-lg border border-transparent border-solid hover:border-violet-500 transition-colors`}
                >
                  <span className={`${pathname === item.route ? "bg-purple-600" : "bg-white/10"} p-4 rounded-full text-2xl`}>
                    {item.icon}
                  </span>
                  <strong>
                    {item.name}
                  </strong>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col bg-blue-900 text-white mt-auto p-2">
          <Link href="/">{showside ?
            "Precisa de ajuda?" : "?"}</Link>
          <Link href="/" className="text-blue-400">
            {showside ? "Chat do Controle da Missão" : "Chat"}
          </Link>
        </div>


      </aside>
      <button
        onClick={() => setShowSide(!showside)}
        className={`absolute left-full top-1/2 -translate-y-1/2  py-5 px-1 bg-violet-900 h-fit text-lg text-white rounded-r-lg`}
      >
        <ArrowLeft className={`${!showside && "rotate-180"} transition-transform duration-300`} />
      </button>
    </div>
  );
};
