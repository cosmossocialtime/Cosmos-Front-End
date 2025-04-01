import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../../../../components/Button/ButtonSubmit'
import { useEffect, useState } from 'react'
import { textAreaSchema } from '../../../../utils/ValidationSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputText } from '../../../../components/Input/InputEmail copy'
import TextAreaField from '../../../../components/Input/TextAreaField'

const schema = z.object({
  history: textAreaSchema,
  impact: textAreaSchema,
  challenges: textAreaSchema,
  support: textAreaSchema,
})

type formProps = z.infer<typeof schema>
const programName = 'Cosmos Social'

interface DescriptiveDataProps {
  nextPage: () => void
}

export function DescriptiveData({ nextPage }: DescriptiveDataProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const history = watch('history', '')
  const impact = watch('impact', '')
  const challenges = watch('challenges', '')
  const support = watch('support', '')
  console.log(history)

  useEffect(() => {
    const checkInput = () => {
      if (
        history.length >= 100 &&
        impact.length >= 100 &&
        challenges.length >= 100 &&
        support.length >= 100
      ) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }

    checkInput()
  }, [history, impact, challenges, support])

  function handleForm(data: any) {
    setIsLoading(true)
    toast.success('Dados salvos com sucesso!')
  }

  return (
    <div className="w-[890px] p-6">
      <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
        <TextAreaField
          label="Escreva brevemente a história da instituição?"
          name="history"
          placeholder="Digite aqui"
          value={history}
          register={register}
          error={errors.history?.message}
        />
        <TextAreaField
          label="Qual a atuação e o impacto da organização?"
          name="impact"
          placeholder="Digite aqui"
          value={impact}
          register={register}
          error={errors.impact?.message}
        />
        <TextAreaField
          label="Quais são as principais necessidades e desafios que a sua organização enfrenta no momento?"
          name="challenges"
          value={challenges}
          placeholder="Digite aqui"
          register={register}
          error={errors.challenges?.message}
        />
        <TextAreaField
          label="Como você acredita que o programa [Nome do programa] poderá apoiar a sua organização?"
          name="support"
          value={support}
          placeholder="Digite aqui"
          register={register}
          dynamicLabel={programName}
          error={errors.support?.message}
        />
        <div className="w-[248px] px-4">
          <Button
            onClick={nextPage}
            text="Continuar"
            disabled={isDisabled}
            type="submit"
            isLoading={true}
          />
        </div>
      </form>
    </div>
  )
}
