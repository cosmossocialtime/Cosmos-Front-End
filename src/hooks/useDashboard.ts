import { useEffect, useState } from 'react'
import { DashboardProps } from '../types/dashboard'
import { invokeLambda } from '../lib/aws/invokeLambda'

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardProps | null>(null)

  useEffect(() => {
    invokeLambda<
      Record<string, never>,
      {
        statusCode: number
        body: string
      }
    >('dashboard-select-lambda', {})
      .then((response) => {
        setDashboard(JSON.parse(response.body))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return { dashboard }
}
