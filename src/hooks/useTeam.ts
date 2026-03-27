import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { UserSocialOrganizationProps } from '../types/userSocialOrganization'
import { api } from '../services/api'

export function useTeam(socialOrganizationId: number) {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ['user', socialOrganizationId],
    queryFn: async () => {
      const response = await api.get('/user')
      if (response.status === 200) {
        const parsed = response.data
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
    enabled: !!socialOrganizationId,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  })

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ['users', socialOrganizationId],
    queryFn: async () => {
      const payload = { socialOrganizationId }
      const response = await api.get('/social-organization/users', {
        params: payload,
      })
      return response.data
    },
    enabled: !!socialOrganizationId,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
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
        const payload = {
          userId: userId,
          role: newPermission,
          socialOrganizationId: socialOrganizationId,
        }
        const response = await api.put(
          '/social-organization/member/role',
          payload
        )
        return response.data
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
      const payload = {
        userId: userId,
        socialOrganizationId: socialOrganizationId,
      }
      const response = await api.delete('/social-organization/member', {
        data: payload,
      })
      return response.data
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
