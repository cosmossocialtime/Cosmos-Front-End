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
import { useRouter } from 'next/router'
import { MentorshipProps } from '../../types/mentorship'

type NavigationMapContextProps = {
  currentMentorship?: MentorshipProps
  goals: GoalProps[]
  selectedGoalId: number | null
  editEnable: boolean
  editTitle: boolean
  changeEdit: (editEnable: boolean) => void
  changeEditTitle: (editEnable: boolean) => void
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
  const route = useRouter()
  const { mentorshipId } = route.query

  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship) => String(mentorship.mentorshipId) === mentorshipId,
  )

  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null)
  const [editEnable, setEditEnable] = useState(false)
  const [editTitle, setEditTitle] = useState(false)

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
        setEditTitle(true)

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

  function changeEditTitle(editTitle: boolean) {
    setEditTitle(editTitle)
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
        currentMentorship,
        goals,
        selectedGoalId,
        editEnable,
        editTitle,
        changeGoal,
        selectGoalId,
        changeEdit,
        deleteGoal,
        createGoal,
        updateGoals,
        changeEditTitle,
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
