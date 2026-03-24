import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Button } from '../../Button/ButtonSubmit'
import { passwordSchema } from '../../../utils/ValidationSchemas'
import { toast } from 'react-toastify'
import { InputPassword } from '../../Input/InputPassword'
import { api } from '../../../services/api'

interface ChangePasswordInstitutionModalProps {
  closeModal: () => void
}

const schema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
})

type formProps = z.infer<typeof schema>

export const ChangePasswordInstitutionModal = ({
  closeModal,
}: ChangePasswordInstitutionModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
  })
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  useEffect(() => {
    setIsDisabled(!isValid)
  }, [isValid])

  async function handleForm(data: formProps) {
    try {
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }
      const response = await api.put('user-password-update', payload)
      if (response.data.statusCode == 201) {
        toast.success('Senha alterada com sucesso')
      } else {
        toast.error('Erro ao alterar senha')
      }
    } catch (error) {
      toast.error('Erro ao alterar senha')
    } finally {
      closeModal()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <section className="flex h-screen w-full items-center justify-center">
        <section
          className="gap-6 rounded-md bg-white p-6 md:w-[720px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              Alteração de senha
            </h1>
            <X className="cursor-pointer" onClick={closeModal} />
          </div>
          <div className="mt-[20px] w-full">
            <InputPassword
              id="currentPassword"
              label="Senha antiga"
              register={register}
              error={errors.currentPassword?.message}
              placeholder="Escreva sua senha antiga"
            />
          </div>
          <div className="mt-[20px] w-full">
            <InputPassword
              id="newPassword"
              label="Crie sua nova senha"
              register={register}
              error={errors.newPassword?.message}
              placeholder="Escreva sua nova senha"
              helperText="A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula e 1 número"
            />
          </div>
          <div className="mb-[20px] mt-[30px] w-[240px]">
            <Button
              text="Alterar senha"
              disabled={isDisabled}
              onClick={handleSubmit(handleForm)}
            />
          </div>
        </section>
      </section>
    </div>
  )
}
