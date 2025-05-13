import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { invokeLambda } from '../lib/aws/invokeLambda'
import { toast } from 'react-toastify'
import { UserSocialOrganizationProps } from '../types/userSocialOrganization'

export function useProfile(socialOrganizationId: number) {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ['user', socialOrganizationId],
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
      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('user-update-lambda', payload)
      return JSON.parse(response.body)
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
        const response = await invokeLambda<
          typeof payload,
          { statusCode: number; body: string }
        >('user-images-update-lambda', payload)
        return JSON.parse(response.body)
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
