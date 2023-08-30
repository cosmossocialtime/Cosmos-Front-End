import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { GoalProps } from '../../types/Goal'
import { useDashboard } from '../../hooks/useDashboard'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../../services/queryClient'

type NavigationMapContextProps = {
  goals: GoalProps[]
  selectedGoalId: number | null
  editEnable: boolean
  changeEdit: (editEnable: boolean) => void
  selectGoalId: (goalId: number | null) => void
  changeGoal: (goal: GoalProps) => void
  deleteGoal: () => void
  createGoal: () => void
  updateGoals: () => void
}

const NavigationMapContext = createContext<NavigationMapContextProps>(
  {} as NavigationMapContextProps,
)

const NavigationMapProvider = ({ children }: { children: React.ReactNode }) => {
  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorship

  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null)
  const [editEnable, setEditEnable] = useState(false)

  async function getGoals() {
    const response = await api.get<GoalProps[]>(`/mentorship/1/goals`)

    return response.data
  }

  const { data: goals = [], refetch } = useQuery({
    queryKey: ['goals'],
    queryFn: getGoals,
  })

  const updateGoals = useCallback(() => {
    refetch()
  }, [refetch])

  function selectGoalId(goalId: number | null) {
    setSelectedGoalId(goalId)
  }

  function changeGoal(updatedGoal: GoalProps) {
    const newGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal,
    )
    queryClient.setQueriesData(['goals'], newGoals)
  }

  function createGoal() {
    api
      .post(`/mentorship/${currentMentorship?.programId}/goal`, {
        name: 'Novo objetivo',
      })
      .then((response) => {
        selectGoalId(response.data.id)
        updateGoals()
        setEditEnable(true)

        toast.success('Objetivo criado com sucesso!')
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível criar o objetivo. Tente novamente mais tarde!',
        )
      })
  }

  function deleteGoal() {
    if (!selectedGoalId) {
      toast.error('Objetivo não encontrado!')
      return
    }
    api
      .delete(`/mentorship/goal/${selectedGoalId}`)
      .then((response) => {
        if (response.status === 200) {
          const newGoals = goals.filter((goal) => goal.id !== selectedGoalId)
          queryClient.setQueriesData(['goals'], newGoals)

          toast.success('Objetivo deletado com sucesso!')
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível deletar o objetivo. Tente novamente mais tarde!',
        )
      })
  }

  function changeEdit(editEnable: boolean) {
    setEditEnable(editEnable)
  }

  useEffect(() => {
    if (!currentMentorship) {
      return
    }

    updateGoals()
  }, [currentMentorship, updateGoals])

  return (
    <NavigationMapContext.Provider
      value={{
        goals,
        selectedGoalId,
        editEnable,
        changeGoal,
        selectGoalId,
        changeEdit,
        deleteGoal,
        createGoal,
        updateGoals,
      }}
    >
      {children}
    </NavigationMapContext.Provider>
  )
}

const useNavigationMap = () => {
  const context = useContext(NavigationMapContext)

  return context
}

export { NavigationMapProvider, NavigationMapContext, useNavigationMap }
