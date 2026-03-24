import { Trash, X } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { SocialOrganizationProps } from '../../../../types/socialOrganization'
import { Button } from '../../../Button/ButtonSubmit'
import { emailSchema } from '../../../../utils/ValidationSchemas'
import { InputEmailList } from '../../../Input/InputEmailList'
import { toast } from 'react-toastify'
import {
  inviteMemberExistingUserTemplate,
  inviteMemberTemplate,
} from '../../../../lib/email/templates/templates'
import { api } from '../../../../services/api'
import axios from 'axios'
import { sendEmail } from '../../../../pages/api/send-email'

const schema = z.object({
  emails: z
    .array(
      z.object({
        email: emailSchema,
      })
    )
    .min(1, 'Mínimo um e-mail obrigatório')
    .refine(
      (emails) => {
        const emailList = emails.map((item) => item.email.toLowerCase().trim())
        const uniqueEmails = new Set(emailList)
        return uniqueEmails.size === emailList.length
      },
      {
        message: 'Não é permitido e-mails duplicados',
        path: ['emails'],
      }
    ),
})

type FormProps = z.infer<typeof schema>

type InviteFormProps = {
  onOpenInviteForm: () => void
  closeModal: () => void
  socialOrganization: SocialOrganizationProps
  requestMemberName: string
}

export const InviteForm = ({
  onOpenInviteForm,
  closeModal,
  socialOrganization,
  requestMemberName,
}: InviteFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: { emails: [{ email: '' }] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emails',
  })

  async function getUser(email: string) {
    try {
      const payload = { email }
      const response = await api.get('user-select', {
        params: payload,
      })
      if (response.data.statusCode === 200) {
        return JSON.parse(response.data.body)
      }
    } catch (error) {
      return null
    }
  }

  async function handleForm(data: FormProps) {
    try {
      const emails = data.emails.map((e) => e.email)

      for (const email of emails) {
        const user = await getUser(email)
        if (user !== null) {
          try {
            const payload = {
              userId: user.id || 0,
              socialOrganizationId: socialOrganization.id || 0,
              userType: 'social_organization_member',
            }

            const response = await api.post(
              'social-organization-member-create',
              payload
            )
            if (response.data.statusCode === 201) {
              const { subject, html } = inviteMemberExistingUserTemplate(
                socialOrganization.name,
                socialOrganization.id || 0,
                requestMemberName,
                user.fullName || ''
              )
              await sendEmail([email], subject, html)
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const status = error.response?.status
              if (status === 400) {
                toast.error(
                  `Usuário já cadastrado como voluntário, não é possível convidá-lo para fazer parte de uma organização.`
                )
              } else if (status === 409) {
                toast.error(`Este usuário já faz parte desta organização.`)
              } else {
                toast.error(`Erro ao processar o usuário: ${email}`)
              }
              return
            }
          }
        } else {
          const { subject, html } = inviteMemberTemplate(
            socialOrganization.name,
            socialOrganization.id || 0,
            requestMemberName
          )
          await sendEmail([email], subject, html)
        }
      }

      toast.success('Convite(s) enviado(s)!')
    } catch (error) {
      toast.error('Erro ao enviar convites')
      console.error(error)
    } finally {
      closeModal()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <section className="flex min-h-screen w-full items-center justify-center">
        <section
          className="min-h-[423px] min-w-[640px] rounded-md bg-white p-10 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b pb-3">
            <h1 className="mb-2 text-xl font-semibold text-gray-900">
              Convite para {socialOrganization.name} na Cosmos
            </h1>
            <button type="button" onClick={onOpenInviteForm}>
              <X
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                size={20}
              />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleForm)} className="mt-5">
            {errors.emails?.message && (
              <div className="mb-3 text-sm text-red-500">
                {errors.emails.message}
              </div>
            )}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative mb-3 flex items-center gap-2"
              >
                <div className="flex w-full items-center rounded-md p-2">
                  <InputEmailList
                    id={`${index}email`}
                    label={`${index === 0 ? 'E-mail' : ''}`}
                    register={register}
                    error={errors.emails?.[index]?.email?.message}
                    autoFocus
                    placeholder="nome@email.com.br"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-2 text-red-500 hover:text-red-700"
                    >
                      <Trash size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ email: '' })}
              className="my-5 block text-violet-500 hover:underline"
            >
              + Adicionar mais um
            </button>
            <div className="w-[248px]">
              <Button text="Convidar" type="submit" />
            </div>
          </form>
        </section>
      </section>
    </div>
  )
}
