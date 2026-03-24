import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../services/api'

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
      const response = await api.get('dashboard-select', {
        params: payload,
      })
      if (response.data.statusCode === 200) {
        const parsed = JSON.parse(response.data.body)
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
        storageId: storageId,
        socialOrganizationId: socialOrganizationId,
      }
      const response = await api.put('social-organization-logo-update', payload)
      return JSON.parse(response.data.body)
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
