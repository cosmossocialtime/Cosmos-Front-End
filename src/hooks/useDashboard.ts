import { invokeLambda } from '../lib/aws/invokeLambda'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useDashboard(socialOrganizationId: number | null) {
  const queryClient = useQueryClient()

  const {
    data: dashboard,
    isLoading: isLoadingDashboard,
    error: errorDashboard,
  } = useQuery({
    queryKey: ['dashboard', socialOrganizationId],
    queryFn: async () => {
      const payload = { socialOrganizationId: socialOrganizationId || 0 }
      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('dashboard-select-lambda', payload)
      if (response.statusCode === 200) {
        const parsed = JSON.parse(response.body)
        return parsed
      } else {
        return null
      }
    },
  })

  const {
    mutate: updateSocialOrganizationLogo,
    isLoading: isUpdatingSocialOrganizationLogo,
  } = useMutation({
    mutationFn: async ({
      storageId,
      socialOrganizationId,
    }: {
      storageId: number
      socialOrganizationId: number
    }) => {
      const payload = {
        storageId,
        socialOrganizationId,
      }
      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('social-organization-logo-update-lambda', payload)
      return JSON.parse(response.body)
    },
    onSuccess: () => {
      toast.success('Alterações salvas com sucesso')
      queryClient.invalidateQueries(['dashboard', socialOrganizationId])
    },
    onError: () => {
      toast.error('Erro ao salvar alterações')
    },
  })

  return {
    dashboard,
    isLoadingDashboard,
    isUpdatingSocialOrganizationLogo,
    errorDashboard,
    updateSocialOrganizationLogo,
  }
}
