import { Trash, X } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { SocialOrganizationProps } from '../../../../types/socialOrganization'
import { Button } from '../../../Button/ButtonSubmit'
import { emailSchema } from '../../../../utils/ValidationSchemas'
import { InputEmailList } from '../../../Input/InputEmailList'
import { toast } from 'react-toastify'
import { inviteMemberTemplate } from '../../../../lib/email/templates/templates'
import { sendEmail } from '../../../../lib/aws/sesSendMail'

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

  async function handleForm(data: FormProps) {
    const { subject, html } = inviteMemberTemplate(
      socialOrganization.name,
      socialOrganization.id || 0,
      requestMemberName
    )
    const emails = data.emails.map((e) => {
      return e.email
    })
    sendEmail(emails, subject, html)
      .then(() => {
        toast.success('Convites enviados!')
      })
      .catch(() => {
        toast.error('Erro ao enviar convites')
      })
      .finally(() => closeModal())
  }

  return (
    <section className="absolute left-0 top-0 z-[60] flex min-h-screen w-full items-center justify-center bg-black/25">
      <section className="min-h-[423px] min-w-[640px] rounded-md bg-white p-10 shadow-lg">
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
  )
}
