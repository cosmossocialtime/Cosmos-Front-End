import { useEffect, useState } from 'react'
import { DashboardProps } from '../types/dashboard'
import { api } from '../services/api'

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardProps | null>(null)

  useEffect(() => {
    api
      .get('/dashboard')
      .then((response) => {
        setDashboard(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return { dashboard }
}
