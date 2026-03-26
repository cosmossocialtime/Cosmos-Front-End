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
      const response = await api.get('/dashboard', {
        params: payload,
      })
      if (response.status === 200) {
        const parsed = response.data
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
      const response = await api.put('/social-organization/logo', payload)
      return response.data
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
