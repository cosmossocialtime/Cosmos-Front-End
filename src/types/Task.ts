export type TaskProps = {
  id: number
  name: string
  completed: boolean
  completedBy: string | null
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
