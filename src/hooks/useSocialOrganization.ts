import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

export function useSocialOrganization(socialOrganizationId: number) {
  const {
    data: socialOrganization,
    isLoading: isLoadingSocialOrganization,
    error: errorSocialOrganization,
  } = useQuery({
    queryKey: ['socialOrganization', socialOrganizationId],
    queryFn: async () => {
      const payload = { socialOrganizationId }
      const response = await api.get('/social-organization', {
        params: payload,
      })
      return response.data
    },
    enabled: !!socialOrganizationId,
  })

  return {
    socialOrganization,
    isLoadingSocialOrganization,
    errorSocialOrganization,
  }
}
