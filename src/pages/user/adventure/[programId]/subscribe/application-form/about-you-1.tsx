import { Button } from '../../../../../../components/Button'
import { Input } from '../../../../../../components/Input'
import { Header } from '../../../../../../components/adventure/Header'
import { Controller, useForm } from 'react-hook-form'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Loading } from '../../../../../../components/Loading'
import Link from 'next/link'
import { useSubscribe } from '../../../../../../hooks/useSubscribe'
import { api } from '../../../../../../services/api'

const schema = z.object({
  professionalPreviousExperiences: z.string(),
  mainCompetencies: z.string(),
})

type formProps = z.infer<typeof schema>

export default function AboutYou1() {
  const { user, programId } = useSubscribe()

  const { handleSubmit, control } = useForm<formProps>()

  async function submitForm({
    professionalPreviousExperiences,
    mainCompetencies,
  }: formProps) {
    const payload = {
      professionalPreviousExperiences: professionalPreviousExperiences,
      mainCompetencies: mainCompetencies,
    }
    try {
      const response = await api.put('user-volunteering-update', payload)
      if (response.data.statusCode === 201) {
        Router.push(
          `/user/adventure/${programId}/subscribe/application-form/about-you-2`
        )
      } else {
        toast.error(
          'Não foi possível enviar os dados. Tente novamente mais tarde!'
        )
      }
    } catch (error) {
      console.error(error)
      toast.error(
        'Não foi possível enviar os dados. Tente novamente mais tarde!'
      )
    }
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
          <strong className="font-bold">2</strong>/5
        </span>
      </Header>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-12 px-32 py-14"
      >
        <Input.Root ariaLabel="Quais as suas principais experiências profissionais até agora?">
          <Controller
            name="professionalPreviousExperiences"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                required
                defaultValue={user.professionalPreviousExperiences || ''}
                text={field.value}
                onChange={field.onChange}
                className="h-32"
                placeholder="Descreva aqui"
                minChar={100}
                maxChar={300}
              />
            )}
          />
        </Input.Root>

        <Input.Root ariaLabel="Quais competências você considera que são os seus pontos fortes?">
          <Controller
            name="mainCompetencies"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                required
                defaultValue={user.mainCompetencies || ''}
                text={field.value}
                onChange={field.onChange}
                className="h-32"
                placeholder="Descreva aqui"
                minChar={100}
                maxChar={300}
              />
            )}
          />
        </Input.Root>

        <Link href={`/user/adventure/${programId}/subscribe/application-form`}>
          <Button.ArrowLeft type="button" />
        </Link>
        <Button.ArrowRight type="submit" />
      </form>
    </div>
  )
}
