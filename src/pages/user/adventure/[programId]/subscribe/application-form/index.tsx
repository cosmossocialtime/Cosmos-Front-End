import { Header } from '../../../../../../components/adventure/Header'
import { api } from '../../../../../../services/api'
import Link from 'next/link'
import { Button } from '../../../../../../components/Button'
import { Input } from '../../../../../../components/Input'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { useSubscribe } from '../../../../../../hooks/useSubscribe'
import Router from 'next/router'

const schema = z.object({
  professionalExperience: z.string(),
  professionalSector: z.string(),
  professionalRole: z.string(),
  availableTime: z.string(),
  linkedinUrl: z.string(),
})

type formProps = z.infer<typeof schema>

export default function ApplicationForm() {
  const { program, user, programId } = useSubscribe()

  const timeExperienceOpts = [
    'Menos de 2 anos',
    'Entre 2 e 5 anos',
    'Entre 6 e 10 anos',
    'Mais de 10 anos',
  ]
  const timesAvaiable = [
    'Menos de 2 horas por mês',
    'Entre 2 e 4 horas por mês',
    'Entre 5 e 8 horas por mês',
    'Mais de 8 horas por mês',
  ]

  const defaultTimeExperience = user?.professionalExperience
    ? timeExperienceOpts[user.professionalExperience]
    : undefined

  const defaultAvaiable = user?.availableTime
    ? timesAvaiable[user.availableTime]
    : undefined

  const { control, handleSubmit, register } = useForm<formProps>()

  function submitForm({
    professionalExperience,
    professionalSector,
    professionalRole,
    availableTime,
    linkedinUrl,
  }: formProps) {
    const professionalExperienceId = timeExperienceOpts.findIndex(
      (option) => option === professionalExperience,
    )
    const avaiableId = timesAvaiable.findIndex(
      (option) => option === availableTime,
    )
    api
      .patch('user/volunteering', {
        professionalExperience: professionalExperienceId,
        professionalSector,
        professionalRole,
        availableTime: avaiableId,
        linkedinUrl,
      })
      .then((response) => {
        if (response.status === 200) {
          Router.push(
            `/user/adventure/${programId}/subscribe/application-form/about-you-1`,
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
  if (!program || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-900 text-zinc-50">
        <h1 className="text-lg">Carregando...</h1>
      </div>
    )
  }
  return (
    <div>
      <Header title={program.name} subtitle="Formulário de Inscrição">
        <span className="mr-24 flex-1 text-end text-violet-600">
          <strong className="font-bold">1</strong>/5
        </span>
      </Header>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="mx-auto mt-14 flex w-[29rem] flex-col gap-10 text-gray-800"
      >
        <Input.Root ariaLabel="Quanto tempo de experiência profissional você possui?">
          <Controller
            name="professionalExperience"
            control={control}
            defaultValue={defaultTimeExperience}
            render={({ field }) => (
              <Input.Select
                required
                placeholder="Opções"
                items={timeExperienceOpts}
                option={field.value}
                changeOption={(option) => field.onChange(option)}
              />
            )}
          />
        </Input.Root>

        <Input.Root
          ariaLabel="Em que cargo e em que setor você atua?"
          className="gap-4 text-sm"
        >
          <Input.Root ariaLabel="Cargo">
            <Input.Content
              required
              type="text"
              defaultValue={user.professionalRole || ''}
              placeholder="Analista"
              className="w-1/2 text-base"
              {...register('professionalRole')}
            />
          </Input.Root>
          <Input.Root ariaLabel="Setor">
            <Input.Content
              required
              type="text"
              defaultValue={user.professionalSector || ''}
              placeholder="Marketing"
              className="w-1/2 text-base"
              {...register('professionalSector')}
            />
          </Input.Root>
        </Input.Root>

        <Input.Root ariaLabel="Quanto tempo você tem disponível para o programada?">
          <Controller
            name="availableTime"
            control={control}
            defaultValue={defaultAvaiable}
            render={({ field }) => (
              <Input.Select
                required
                placeholder="Opções"
                items={timesAvaiable}
                option={field.value}
                changeOption={(option) => field.onChange(option)}
              />
            )}
          />
        </Input.Root>

        <Input.Root ariaLabel="Link para o LinkedIn (opcional)">
          <Input.Content
            type="text"
            defaultValue={user.linkedinUrl || ''}
            placeholder="https://linkedin.com.br"
            className="w-1/2"
            {...register('linkedinUrl')}
          />
        </Input.Root>

        <Link href={`/user/adventure/${programId}/subscribe/terms-of-use`}>
          <Button.ArrowLeft type="button" />
        </Link>

        <Button.ArrowRight type="submit" />
      </form>
    </div>
  )
}
