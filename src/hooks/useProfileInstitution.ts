import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { UserSocialOrganizationProps } from '../types/userSocialOrganization'
import { api } from '../services/api'

export function useProfileInstitution(socialOrganizationId: number) {
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
  })

  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: async ({
      fullname,
      email,
      phone,
      professionalRole,
      professionalSector,
      socialOrganizationId,
    }: {
      fullname: string
      email: string
      phone: string
      professionalRole: string
      professionalSector: string
      socialOrganizationId: number
    }) => {
      const payload = {
        fullname,
        email,
        phone,
        professionalRole,
        professionalSector,
        socialOrganizationId,
      }
      const response = await api.put('/user', payload)
      return response.data
    },
    onSuccess: () => {
      toast.success('Alterações salvas com sucesso')
      queryClient.invalidateQueries(['user', socialOrganizationId])
    },
    onError: () => {
      toast.error('Erro ao salvar alterações')
    },
  })

  const { mutate: updateUserImage, isLoading: isUpdatingUserImage } =
    useMutation({
      mutationFn: async ({
        storageId,
        imageType,
      }: {
        storageId: number
        imageType: string
      }) => {
        const payload = {
          storageId,
          imageType,
        }
        const response = await api.put('/user/images', payload)
        return response.data
      },
      onSuccess: () => {
        toast.success('Alterações salvas com sucesso')
        queryClient.invalidateQueries(['user', socialOrganizationId])
      },
      onError: () => {
        toast.error('Erro ao salvar alterações')
      },
    })

  return {
    user,
    isLoadingUser,
    errorUser,
    updateUser,
    updateUserImage,
    isUpdatingUser,
    isUpdatingUserImage,
  }
}
