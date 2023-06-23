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

export default function SideBar() {
  const SideBarItems = [
    {
      id: 1,
      route: "/dashboard/mission-painel",
      name: "Painel da Missão",
      icon: <HouseLine />,
    },
    {
      id: 2,
      route: "/dashboard/log-book",
      name: "Diário de Bordo",
      icon: <File />
    },
    {
      id: 3,
      route: "/dashboard/satellite-images",
      name: "Imagens de Satétile",
      icon: <Star />,
    },
    {
      id: 4,
      route: "/dashboard/events-calendar",
      name: "Calendário de Eventos",
      icon: <Calendar />,
    },
    {
      id: 6,
      route: "/dashboard/navigation-map",
      name: "Mapa de Navegação",
      icon: <MapTrifold />,
    },
    {
      id: 7,
      route: "/dashboard/crew",
      name: "Tripulação",
      icon: <UsersThree />
    },
  ];
  const { pathname } = useRouter()
  const [showside, setShowSide] = useState(true);

  return (
    <div className="relative">
      <aside className={`${showside ? "w-[19rem]" : "w-20 2xl:w-[5.5rem]"} bg-violet-900 min-h-screen flex flex-col relative transition-all duration-300 overflow-hidden`}>
        <div>
          <div className="mx-auto w-fit my-7">
            <Link href={"/main-painel/painel"}>
              {showside ? (
                <Image
                  width={160}
                  height={30}
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
            </Link>
          </div>

          {showside &&
            <Link
              href={"/main-painel/painel"}
              className="block mx-auto text-center text-blue-400 font-semibold"
            >
              Voltar ao Painel Principal
            </Link>
          }

          <div className="flex flex-col px-2 mt-2 relative">

            {SideBarItems.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`${pathname === item.route ? "bg-white/10" : ""} z-[1] p-3 my-1 flex items-center gap-4 text-white rounded-lg border border-transparent border-solid hover:border-violet-500 transition-colors`}
                >
                  <span className={`${pathname === item.route ? "bg-purple-600" : "bg-white/10"} p-2 2xl:p-4 rounded-full text-2xl`}>
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

        <div className={`${showside ? "" : "hidden"} mt-auto flex flex-col gap-1 bg-blue-900 text-white px-2 py-4`}>
          <Link href="/">
            Precisa de ajuda?
          </Link>
          <Link href="/" className="text-blue-400">
            Chat do Controle da Missão
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
