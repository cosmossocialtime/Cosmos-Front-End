import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { invokeLambda } from '../lib/aws/invokeLambda'
import { toast } from 'react-toastify'
import { UserSocialOrganizationProps } from '../types/userSocialOrganization'

export function useTeam(socialOrganizationId: number) {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery({
    queryFn: async () => {
      const response = await invokeLambda<
        Record<string, never>,
        { statusCode: number; body: string }
      >('user-select-lambda', {})
      if (response.statusCode === 200) {
        const parsed = JSON.parse(response.body)
        const userSocialOrganizations =
          parsed.socialOrganizations &&
          parsed.socialOrganizations.filter(
            (so: UserSocialOrganizationProps) =>
              so.socialOrganizationId === socialOrganizationId
          )
        parsed.socialOrganizations = userSocialOrganizations
        return parsed
      } else {
        return null
      }
    },
  })

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ['users', socialOrganizationId],
    queryFn: async () => {
      const payload = { socialOrganizationId }
      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('social-organization-users-select-lambda', payload)
      return JSON.parse(response.body)
    },
    enabled: !!socialOrganizationId,
  })

  const { mutate: changePermission, isLoading: isChangingPermission } =
    useMutation({
      mutationFn: async ({
        userId,
        newPermission,
      }: {
        userId: number
        newPermission: string
      }) => {
        const payload = { userId, role: newPermission, socialOrganizationId }
        const response = await invokeLambda<
          typeof payload,
          { statusCode: number; body: string }
        >('user-role-update-lambda', payload)
        return JSON.parse(response.body)
      },
      onSuccess: () => {
        toast.success('Permissão alterada com sucesso!')
        queryClient.invalidateQueries(['users', socialOrganizationId])
      },
      onError: () => {
        toast.error('Erro ao alterar permissão.')
      },
    })

  const { mutate: deleteUser, isLoading: isDeletingUser } = useMutation({
    mutationFn: async (userId: number) => {
      const payload = { userId }
      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('user-delete-lambda', payload)
      return JSON.parse(response.body)
    },
    onSuccess: () => {
      toast.success('Membro removido com sucesso!')
      queryClient.invalidateQueries(['users', socialOrganizationId])
    },
    onError: () => {
      toast.error('Erro ao remover membro.')
    },
  })

  return {
    user,
    isLoadingUser,
    errorUser,
    users,
    isLoadingUsers,
    errorUsers,
    changePermission,
    isChangingPermission,
    deleteUser,
    isDeletingUser,
  }
}
