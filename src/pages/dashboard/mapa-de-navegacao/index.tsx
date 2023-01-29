import * as Dialog from '@radix-ui/react-dialog';

import { objectiveCardsData } from "./objectiveCardsData";

import { SideBar } from "../sideBar";
import { ObjectiveCard } from "./Card/ObjectiveCard";
import { ModalTask } from "./ModalTask";

export default function MapaNavegacaoPage() {
    return (
        <div className='flex'>
            <SideBar />

            <div className="w-screen h-screen bg-art-board bg-no-repeat bg-center flex flex-col">
                <header className="py-4 px-20 text-slate-100 bg-blue-900 bg-opacity-50">
                    <h1 className="mb-2 text-4xl font-semibold">Mapa da Navegação</h1>
                    <span>O plano de objetivos e atividades a serem alcançados no decorrer desta missão</span>
                </header>

                <div className="flex-1 flex flex-col">
                    <div className="flex flex-1 gap-10 items-center justify-center">
                        {objectiveCardsData.map((cardData, key) => {
                            const amount = cardData.tasks.length;
                            const completed = cardData.tasks.filter(task => task.checked).length;

                            return (
                                <Dialog.Root key={key}>
                                    <ObjectiveCard
                                        description={cardData.description}
                                        index={key + 1}
                                        amountTask={amount}
                                        completedTask={completed}
                                    />
                                    <ModalTask tasks={cardData.tasks} />
                                </Dialog.Root>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}