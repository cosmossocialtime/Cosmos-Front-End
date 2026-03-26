import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { GoalProps } from '../../types/Goal'
import { useDashboard } from '../../hooks/useDashboard'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'
import { MentorshipProps } from '../../types/mentorship'
import { SocialOrganizationProps } from '../../types/socialOrganization'
import { api } from '../../services/api'

type NavigationMapContextProps = {
  currentMentorship?: MentorshipProps
  socialOrganization?: SocialOrganizationProps
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
  {} as NavigationMapContextProps
)

const NavigationMapProvider = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter()
  const { mentorshipId, socialOrganizationId } = route.query
  const { dashboard } = useDashboard(
    socialOrganizationId ? Number(socialOrganizationId) : null
  )

  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship: MentorshipProps) =>
      String(mentorship.mentorshipId) === mentorshipId
  )

  const socialOrganization = dashboard?.socialOrganization

  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null)
  const [editEnable, setEditEnable] = useState(false)
  const [editTitle, setEditTitle] = useState(false)

  async function getGoals(id: number) {
    if (!id) return []
    const payload = { mentorshipId: id }
    const response = await api.get('/mentorship/goal', {
      params: payload,
    })
    if (response.status === 200) {
      return response.data
    }
    console.error('Falha ao obter objetivos da missão')
    return []
  }

  const { data: goals = [], refetch } = useQuery({
    queryKey: ['goals', mentorshipId],
    queryFn: () => getGoals(Number(mentorshipId)),
    enabled: !!mentorshipId && route.isReady,
  })

  const updateGoals = useCallback(() => {
    refetch()
  }, [refetch])

  function selectGoalId(goalId: number | null) {
    setSelectedGoalId(goalId)
  }

  function changeGoal(updatedGoal: GoalProps) {
    const newGoals = goals.map((goal: GoalProps) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    )
    queryClient.setQueriesData(['goals'], newGoals)
  }

  function createGoal() {
    const payload = {
      mentorshipId: Number(mentorshipId || '0'),
      name: 'Novo objetivo',
    }
    api
      .post('/mentorship/goal', payload)
      .then((response) => {
        if (response.status === 201) {
          const parsed = response.data
          selectGoalId(parsed.id)
          updateGoals()
          setEditEnable(true)
          setEditTitle(true)

          toast.success('Objetivo criado com sucesso!')
        } else {
          toast.error(
            'Não foi possível criar o objetivo. Tente novamente mais tarde!'
          )
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível criar o objetivo. Tente novamente mais tarde!'
        )
      })
  }

  function deleteGoal() {
    if (!selectedGoalId) {
      toast.error('Objetivo não encontrado!')
      return
    }
    const payload = { goalId: selectedGoalId }
    api
      .delete('/mentorship/goal', { data: payload })
      .then((response) => {
        if (response.status === 200) {
          const newGoals = goals.filter(
            (goal: GoalProps) => goal.id !== selectedGoalId
          )
          queryClient.setQueriesData(['goals'], newGoals)

          toast.success('Objetivo deletado com sucesso!')
        } else {
          toast.error(
            'Não foi possível deletar o objetivo. Tente novamente mais tarde!'
          )
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível deletar o objetivo. Tente novamente mais tarde!'
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
        socialOrganization,
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
