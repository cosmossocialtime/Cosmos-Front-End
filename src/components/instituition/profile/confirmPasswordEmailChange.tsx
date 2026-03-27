import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Button } from '../../Button/ButtonSubmit'
import { passwordSchema } from '../../../utils/ValidationSchemas'
import { toast } from 'react-toastify'
import { InputPassword } from '../../Input/InputPassword'
import { confirmChangeEmailInstitutionTemplate } from '../../../lib/email/templates/templates'
import { Warning } from 'phosphor-react'
import { saveFormData } from '../../../utils/localStorage'
import { useRouter } from 'next/router'
import { api } from '../../../services/api'
import axios from 'axios'

interface ConfirmPasswordEmailChangeProps {
  closeModal: () => void
  email: string
}

const schema = z.object({
  password: passwordSchema,
})

type formProps = z.infer<typeof schema>

export const ConfirmPasswordEmailChange = ({
  closeModal,
  email,
}: ConfirmPasswordEmailChangeProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
  })
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const route = useRouter()
  const { socialOrganizationId } = route.query

  useEffect(() => {
    setIsDisabled(!isValid)
  }, [isValid])

  async function handleForm(data: formProps) {
    try {
      const isPasswordValid = await validatePassword(data.password)
      if (!isPasswordValid) {
        toast.error('Senha inválida')
        return
      }

      const confirmationData = await requestEmailChange(email)
      if (!confirmationData) {
        return
      }
      saveFormData('cosmos.newEmail', email)
      await sendConfirmationEmail(
        email,
        confirmationData,
        String(socialOrganizationId)
      )
      route.push({
        pathname:
          '/institutions/socialOrganization/[socialOrganizationId]/profile/verifyChangeEmail',
        query: { socialOrganizationId },
      })
      toast.success('Alterações salvas com sucesso')
    } catch (error) {
      toast.error('Erro inesperado ao tentar alterar e-mail')
      console.error(error)
    } finally {
      closeModal()
    }
  }

  async function validatePassword(password: string): Promise<boolean> {
    try {
      const payload = { password: password }
      const response = await api.post('/user/validate-password', payload)
      return response.status === 200
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async function requestEmailChange(
    email: string
  ): Promise<null | { confirmationCode: string; name: string }> {
    try {
      const payload = { email: email }
      const response = await api.put('/user/email/request', payload)

      if (response.status === 200) {
        return response.data
      }
      return null
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 400) {
          toast.error(
            <div className="flex items-center gap-3 bg-white">
              <div className="flex items-center">
                <Warning size={40} className="text-red-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-semibold text-gray-800">
                  E-mail já cadastrado
                </h2>
                <p className="text-sm text-gray-500">
                  Tente outro endereço de e-mail para salvar as alterações
                </p>
              </div>
            </div>,
            {
              icon: false,
            }
          )
          return null
        }
      }
      toast.error('Erro ao solicitar alteração de e-mail')
      console.error(error)
      return null
    }
  }

  async function sendConfirmationEmail(
    email: string,
    data: { confirmationCode: string; name: string },
    socialOrganizationId: string
  ) {
    const { subject, html } = confirmChangeEmailInstitutionTemplate(
      data.confirmationCode,
      data.name,
      socialOrganizationId
    )
    try {
      const payloadMail = {
        toAddresses: [email],
        subject: subject,
        message: html,
      }

      await api.post('/email/send', payloadMail)
    } catch (err) {
      toast.error('Não foi possível enviar e-mail de confirmação de alteração')
      throw err
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
              Confirme sua senha para alterar o e-mail
            </h1>
            <X className="cursor-pointer" onClick={closeModal} />
          </div>
          <div className="mt-[20px] w-full">
            <InputPassword
              id="password"
              label="Sua senha"
              register={register}
              error={errors.password?.message}
              placeholder="Escreva sua senha"
            />
          </div>
          <div className="mb-[20px] mt-[30px] w-[263px]">
            <Button
              text="Confirmar e alterar e-mail"
              disabled={isDisabled || isSubmitting}
              onClick={handleSubmit(handleForm)}
            />
          </div>
        </section>
      </section>
    </div>
  )
}
