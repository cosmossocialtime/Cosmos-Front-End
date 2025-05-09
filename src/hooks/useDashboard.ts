import { useEffect, useState } from 'react'
import { DashboardProps } from '../types/dashboard'
import { invokeLambda } from '../lib/aws/invokeLambda'

export function useDashboard(socialOrganizationId: number | null) {
  const [dashboard, setDashboard] = useState<DashboardProps | null>(null)

  useEffect(() => {
    const payload = { socialOrganizationId: socialOrganizationId || 0 }
    invokeLambda<
      typeof payload,
      {
        statusCode: number
        body: string
      }
    >('dashboard-select-lambda', payload)
      .then((response) => {
        setDashboard(JSON.parse(response.body))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return { dashboard }
}
