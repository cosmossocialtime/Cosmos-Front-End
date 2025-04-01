import { Trash, X } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'

const schema = z.object({
  emails: z
    .array(
      z.object({
        email: z
          .string()
          .min(5, 'O e-mail deve ter pelo menos 5 caracteres')
          .email('E-mail inválido'),
      }),
    )
    .min(1, 'Mínimo um e-mail obrigatório'),
})

type FormProps = z.infer<typeof schema>

type InviteFormProps = {
  onOpenInviteForm: () => void
}

export const InviteForm = ({ onOpenInviteForm }: InviteFormProps) => {
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
    console.log(data)
  }

  return (
    <section className="absolute left-0 top-0 z-[60] flex min-h-screen w-full items-center justify-center bg-black/25">
      <section className="rounded-md bg-white p-10 shadow-lg md:min-w-[500px]">
        <div className="flex items-center justify-between border-b pb-3">
          <h1>Convite para Nome da organização na Cosmos</h1>
          <button type="button" onClick={onOpenInviteForm}>
            <X
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              size={20}
            />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleForm)} className="mt-5">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative mb-3 flex items-center gap-2"
            >
              <div
                className="flex w-full items-center rounded-md border border-gray-300 p-2"
                style={{ border: '1px solid gray' }}
              >
                <input
                  className="w-full bg-transparent focus:outline-none"
                  {...register(`emails.${index}.email`)}
                  type="email"
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
              {errors.emails?.[index]?.email && (
                <span className="absolute left-0 top-[42px] text-sm text-red-500">
                  {errors.emails[index]?.email?.message}
                </span>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ email: '' })}
            className="my-5 block text-violet-500 hover:underline"
          >
            + Adicionar mais um email
          </button>
          <div className="w-[248px]">
            <button
              className="w-full rounded-md bg-violet-600 p-3 text-white hover:bg-violet-700"
              type="submit"
            >
              Convidar
            </button>
          </div>
        </form>
      </section>
    </section>
  )
}
