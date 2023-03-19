const { v4: uuidv4 } = require('uuid');
import { useState } from 'react';

import { objectiveCardsData } from "./data/objectiveCardsData";

import { SideBar } from "../sideBar";
import { DialogObjective } from './DialogObjective';

export default function MapaNavegacaoPage() {
    const [objectiveCards, setObjectiveCards] = useState(objectiveCardsData)


    function deleteObjective(id: string) {
        setObjectiveCards((prevObjectiveCards) => {
            const updateObjectiveCards = prevObjectiveCards.filter(objective => objective.id !== id);

            return updateObjectiveCards;
        })
    }

    function createNewGoal() {
        setObjectiveCards((prevObjectiveCards) => {
            const updateObjectiveCards = [...prevObjectiveCards, {
                id: uuidv4(),
                title: "",
                tasks: []
            }]

            return updateObjectiveCards;
        })
    }

    return (
        <div className='flex'>
            <SideBar />

            <div className="w-screen h-screen bg-art-board bg-no-repeat bg-cover bg-center flex flex-col">
                <header className="py-4 px-20 text-slate-100 bg-blue-900 bg-opacity-50">
                    <h1 className="mb-2 text-4xl font-semibold">Mapa da Navegação</h1>
                    <span>O plano de objetivos e atividades a serem alcançados no decorrer desta missão</span>
                </header>

                <div className="flex-1 flex flex-col items-center">
                    <div className="flex flex-1 gap-10 items-center justify-center">
                        {objectiveCards.length !== 0 ? (
                            objectiveCards.map((cardData, key) => (
                                <DialogObjective
                                    key={cardData.id}
                                    index={key}
                                    cardData={cardData}
                                    deleteObjective={deleteObjective}
                                />
                            ))
                        ) : (
                            <p className='p-8 text-white font-normal bg-gray-700 bg-opacity-5 backdrop-blur-3xl rounded-lg'>
                                Nome da organização ainda não tem nenhum objetivo... <br />
                                Aguarde o encontro do Mapa da Navegação para criá-los.
                            </p>
                        )
                        }
                    </div>
                    {objectiveCards.length < 4 &&
                        <button 
                            className='mb-24 max-w-max py-4 px-28 text-white text-lg font-semibold bg-violet-500 rounded-lg hover:bg-violet-600 transition-all'
                            onClick={createNewGoal}
                        >
                            Criar novo objetivo
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}