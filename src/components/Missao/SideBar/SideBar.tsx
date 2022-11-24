import {
  BackButton,
  Container,
  Content,
  HelpSection,
  SideBarItem,
} from "./style";


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
import Link from "next/link";
import Image from "next/image";

export function SideBar() {
  const SideBarItems = [
    {
      id: 1,
      route: "painel-missao",
      name: "Painel da Missão",
      icon: <HouseLine />,
    },
    { id: 2, route: "diario-bordo", name: "Diário de Bordo", icon: <File /> },
    {
      id: 3,
      route: "imagens-satelite",
      name: "Imagens de Satétile",
      icon: <Star />,
    },
    {
      id: 4,
      route: "calendario-eventos",
      name: "Calendário de Eventos",
      icon: <Calendar />,
    },
    { id: 5, route: "chat", name: "Chat", icon: <ChatCenteredDots /> },
    {
      id: 6,
      route: "mapa-navegacao",
      name: "Mapa de Navegação",
      icon: <MapTrifold />,
    },
    { id: 7, route: "tripulacao", name: "Tripulação", icon: <UsersThree /> },
  ];

  const [showside, setShowSide] = useState(false);
  const [isSelected, setIsSelected] = useState("painel-missao");

  return (
    <>
      <Container showside={showside}>
        <Content showside={showside}>
          <Image src={+showside ? "/images/Ccosmos.svg" : "/images/logoCosmosBranco.svg"} alt="Logo Cosmos" />
          {SideBarItems.map((item) => {
            return (
              <SideBarItem
                href={item.route}
                key={item.id}
                showside={showside}
                isselected={isSelected}
                name={item.route}
                onClick={() => setIsSelected(item.route)}
              >
                <span>{item.icon}</span>
                <strong>{item.name}</strong>
              </SideBarItem>
            );
          })}
        </Content>

        <HelpSection>
          <Link href="">{showside ? "?" : "Precisa de ajuda?"}</Link>
          <Link href="">
            {showside ? "Chat" : "Chat do Controle da Missão"}
          </Link>
        </HelpSection>
      </Container>  

      <BackButton onClick={() => setShowSide(!showside)} showside={showside}>
        <button>
          <ArrowLeft />
        </button>
      </BackButton>
    </>
  );
}
