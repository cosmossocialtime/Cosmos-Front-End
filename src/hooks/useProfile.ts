import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { UserProps } from '../types/user'
import { api } from '../services/api'

export function useProfile() {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get('user-select')
      if (response.data.statusCode === 200) {
        const parsed = JSON.parse(response.data.body)
        return parsed
      } else {
        return null
      }
    },
  })

  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: async (newUserData: UserProps) => {
      const payload = {
        fullName: newUserData.fullName,
        byname: newUserData.byname,
        birthdate: newUserData.birthdate,
        gender: newUserData.gender,
        country: newUserData.country,
        state: newUserData.state,
        city: newUserData.city,
      }
      const response = await api.put('user-update', payload)
      return JSON.parse(response.data.body)
    },
    onSuccess: () => {
      toast.success('Dados atualizados com sucesso!')
      queryClient.invalidateQueries(['user'])
    },
    onError: () => {
      toast.error('Erro ao atualizar informações do usuário')
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
          origin: 'volunteer',
        }
        const response = await api.put('user-images-update', payload)
        return JSON.parse(response.data.body)
      },
      onSuccess: () => {
        toast.success('Alterações salvas com sucesso')
        queryClient.invalidateQueries(['user'])
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
