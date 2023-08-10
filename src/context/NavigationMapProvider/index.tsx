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

type NavigationMapContextProps = {
  goals: GoalProps[]
  selectedGoal: GoalProps | null
  editEnable: boolean
  changeEdit: (editEnable: boolean) => void
  selectGoal: (goal: GoalProps | null) => void
  changeGoal: (goal: GoalProps) => void
  deleteGoal: () => void
  createGoal: () => void
  getGoals: () => void
}

const NavigationMapContext = createContext<NavigationMapContextProps>(
  {} as NavigationMapContextProps,
)

const NavigationMapProvider = ({ children }: { children: React.ReactNode }) => {
  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorship

  const [goals, setGoals] = useState<GoalProps[]>([])
  const [selectedGoal, setSelectedGoal] = useState<GoalProps | null>(null)
  const [editEnable, setEditEnable] = useState(false)

  const getGoals = useCallback(() => {
    api
      .get(`/mentorship/${currentMentorship?.programId}/goals`)
      .then((response) => {
        if (response.status === 200) {
          setGoals(response.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [currentMentorship])

  function selectGoal(goal: GoalProps | null) {
    setSelectedGoal(goal)
  }

  function changeGoal(goal: GoalProps) {
    setGoals((prevGoals) =>
      prevGoals.map((prevGoal) => (prevGoal.id === goal.id ? goal : prevGoal)),
    )
  }

  function createGoal() {
    api
      .post(`/mentorship/${currentMentorship?.programId}/goal`)
      .then((response) => {
        if (response.status === 201) {
          const newGoal: GoalProps = {
            id: Number(new Date()),
            name: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            tasks: [],
          }
          setGoals([...goals, newGoal])
          selectGoal(newGoal)
          setEditEnable(true)

          // getGoals()
          toast.success('Objetivo criado com sucesso!')
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível criar o objetivo. Tente novamente mais tarde!',
        )
      })
  }

  function deleteGoal() {
    if (!selectedGoal) {
      toast.error('Objetivo não encontrado!')
      return
    }
    api
      .delete(`/mentorship/goal/${selectedGoal.id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Objetivo deletado com sucesso!')
          setGoals((prevGoals) =>
            prevGoals.filter((prevGoal) => prevGoal.id !== selectedGoal.id),
          )
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
    getGoals()
  }, [currentMentorship, getGoals])

  return (
    <NavigationMapContext.Provider
      value={{
        goals,
        selectedGoal,
        editEnable,
        changeGoal,
        selectGoal,
        changeEdit,
        deleteGoal,
        createGoal,
        getGoals,
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
