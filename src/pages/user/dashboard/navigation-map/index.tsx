import { useState } from 'react'

import SideBar from '../sideBar'
import { objectiveCardsData } from '../../../data/objectiveCardsData'
import DialogObjective from '../../../components/dashboard/navigation-map/DialogObjective'
const { v4: uuidv4 } = require('uuid')

export default function MapaNavegacaoPage() {
  const [objectiveCards, setObjectiveCards] = useState(objectiveCardsData)

  function deleteObjective(id: string) {
    setObjectiveCards((prevObjectiveCards) => {
      const updateObjectiveCards = prevObjectiveCards.filter(
        (objective) => objective.id !== id,
      )

      return updateObjectiveCards
    })
  }

  function createNewGoal() {
    setObjectiveCards((prevObjectiveCards) => {
      const updateObjectiveCards = [
        ...prevObjectiveCards,
        {
          id: uuidv4(),
          title: '',
          tasks: [],
        },
      ]

      return updateObjectiveCards
    })
  }

  return (
    <div className="flex">
      <SideBar />

      <div className="flex h-screen w-screen flex-col bg-art-board bg-cover bg-center bg-no-repeat">
        <header className="bg-blue-900 bg-opacity-50 py-4 px-20 text-slate-100">
          <h1 className="mb-2 text-4xl font-semibold">Mapa da Navegação</h1>
          <span>
            O plano de objetivos e atividades a serem alcançados no decorrer
            desta missão
          </span>
        </header>

        <div className="flex flex-1 flex-col items-center">
          <div className="flex flex-1 items-center justify-center gap-10">
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
              <p className="rounded-lg bg-gray-700 bg-opacity-5 p-8 font-normal text-white backdrop-blur-3xl">
                Nome da organização ainda não tem nenhum objetivo... <br />
                Aguarde o encontro do Mapa da Navegação para criá-los.
              </p>
            )}
          </div>
          {objectiveCards.length < 4 && (
            <button
              className="mb-24 max-w-max rounded-lg bg-violet-500 py-4 px-28 text-lg font-semibold text-white transition-all hover:bg-violet-600"
              onClick={createNewGoal}
            >
              Criar novo objetivo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
