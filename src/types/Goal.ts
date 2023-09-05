import { TaskProps } from './Task'

export type GoalProps = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  tasks: TaskProps[]
}
