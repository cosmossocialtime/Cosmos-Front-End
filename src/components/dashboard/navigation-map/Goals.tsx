import * as Dialog from '@radix-ui/react-dialog'
import { useNavigationMap } from '../../../context/NavigationMapProvider'
import { Button } from '../../Button'
import GoalPopUp from './GoalPopUp'
import GoalCard from './GoalCard'
import { useState } from 'react'
import WarningEdit from './WarningEdit'
import { GoalProps } from '../../../types/Goal'
import dayjs from 'dayjs'

export function Goals() {
  const [onWarningEdit, setOnWarningEdit] = useState(false)

  const {
    currentMentorship,
    goals,
    selectGoalId,
    selectedGoalId,
    createGoal,
    editEnable,
  } = useNavigationMap()

  function openChangeGoal(open: boolean, goal: GoalProps) {
    if (open) {
      selectGoalId(goal.id)
      return
    }
    if (editEnable) {
      setOnWarningEdit(true)
      return
    }

    selectGoalId(null)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center gap-10">
        {goals.length !== 0 ? (
          goals.map((goal, index) => {
            const ordenedTasks = goal.tasks.sort((a, b) =>
              dayjs(b.createdAt).diff(dayjs(a.createdAt)),
            )
            const organizedGoal: GoalProps = { ...goal, tasks: ordenedTasks }
            return (
              <Dialog.Root
                key={goal.id}
                open={selectedGoalId === goal.id}
                onOpenChange={(open) => openChangeGoal(open, goal)}
              >
                <Dialog.Trigger>
                  <GoalCard goal={goal} index={index} />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-10 bg-black/70" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 z-20 flex  w-[900px] flex-1 -translate-x-1/2 -translate-y-1/2 flex-col gap-10 rounded-2xl bg-violet-900 px-10 py-8">
                    <GoalPopUp goal={organizedGoal} index={index} />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )
          })
        ) : (
          <p className="rounded-lg bg-gray-700 bg-opacity-5 p-8 text-center font-normal text-white backdrop-blur-3xl">
            {currentMentorship?.socialOrganization} ainda não tem nenhum
            objetivo... <br />
            Aguarde o encontro do Mapa da Navegação para criá-los.
          </p>
        )}
      </div>
      {goals.length < 4 && (
        <Button.Primary className="px-28 py-3" onClick={createGoal}>
          Criar novo objetivo
        </Button.Primary>
      )}

      <WarningEdit open={onWarningEdit} onOpenChange={setOnWarningEdit} />
    </div>
  )
}
