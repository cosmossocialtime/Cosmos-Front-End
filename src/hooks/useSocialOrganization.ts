import { useQuery } from '@tanstack/react-query'
import { invokeLambda } from '../lib/aws/invokeLambda'

export function useSocialOrganization(socialOrganizationId: number) {
  const {
    data: socialOrganization,
    isLoading: isLoadingSocialOrganization,
    error: errorSocialOrganization,
  } = useQuery({
    queryKey: ['socialOrganization', socialOrganizationId],
    queryFn: async () => {
      const payload = { socialOrganizationId }
      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('social-organization-select-lambda', payload)
      return JSON.parse(response.body)
    },
    enabled: !!socialOrganizationId,
  })

  return {
    socialOrganization,
    isLoadingSocialOrganization,
    errorSocialOrganization,
  }
}
