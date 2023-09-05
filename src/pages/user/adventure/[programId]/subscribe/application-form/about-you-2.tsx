import { z } from 'zod'
import { Input } from '../../../../../../components/Input'
import { Controller, useForm } from 'react-hook-form'
import { api } from '../../../../../../services/api'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { Button } from '../../../../../../components/Button'
import { Header } from '../../../../../../components/adventure/Header'
import { Loading } from '../../../../../../components/Loading'
import Link from 'next/link'
import { useSubscribe } from '../../../../../../hooks/useSubscribe'

const schema = z.object({
  reasonToJoin: z
    .string()
    .min(100, 'O campo precisa de ao menos 100 caracteres!')
    .max(300),
  previousMentorship: z.string(),
})

type formProps = z.infer<typeof schema>

export default function AboutYou2() {
  const { user, programId } = useSubscribe()

  const { handleSubmit, control } = useForm<formProps>()

  function submitForm({ reasonToJoin, previousMentorship }: formProps) {
    api
      .patch('/user/volunteering', {
        reasonToJoin,
        previousMentorship,
      })
      .then((response) => {
        if (response.status === 200) {
          Router.push(
            `/user/adventure/${programId}/subscribe/application-form/mission-role`,
          )
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível enviar os dados. Tente novamente mais tarde!',
        )
      })
  }

  if (!user) {
    return <Loading />
  }

  return (
    <div>
      <Header
        title="Conte um pouco sobre você"
        subtitle="Formulário de Inscrição"
      >
        <span className="mr-24 flex-1 text-end text-violet-600">
          <strong className="font-bold">3</strong>/5
        </span>
      </Header>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-12 px-32 py-14"
      >
        <Input.Root ariaLabel="O que motiva você a querer participar desse programa?">
          <Controller
            name="reasonToJoin"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                required
                className="h-32"
                placeholder="Descreva aqui"
                defaultValue={user.reasonToJoin || ''}
                minChar={100}
                maxChar={300}
                text={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Input.Root>

        <Input.Root ariaLabel="Você já mentorou alguma pessoa ou organização antes? Se sim, como foi esta experiência? (Opcional) ">
          <Controller
            name="previousMentorship"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                className="h-32"
                defaultValue={user.previousMentorship || ''}
                placeholder="Descreva aqui"
                text={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Input.Root>
        <Link
          href={`/user/adventure/${programId}/subscribe/application-form/about-you-1`}
        >
          <Button.ArrowLeft type="button" />
        </Link>
        <Button.ArrowRight type="submit" />
      </form>
    </div>
  )
}
