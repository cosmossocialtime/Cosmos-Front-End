import { z } from 'zod'
import TextAreaField from '../../Input/TextAreaField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import InputField from '../../Input/InputField'
import { Button } from '../../Button/ButtonSubmit'

const schema = z.object({
  history: z.string().min(100).max(300),
  impact: z.string().min(100).max(300),
  necessity: z.string().min(100).max(300),
})

type formProps = z.infer<typeof schema>

export const Descritives = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  // Observe the history field value
  const historyW = watch('history')
  const impactW = watch('impact')
  const necessityW = watch('necessity')

  useEffect(() => {
    // Log the value of the 'history' field every time it changes
    console.log(historyW)
    const checkInputs = () => {
      if (
        historyW?.length >= 100 &&
        impactW?.length >= 100 &&
        necessityW?.length >= 100
      ) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }

    checkInputs()
  }, [historyW, impactW, necessityW])

  const onSubmit = (data: formProps) => {
    console.log(data)
    // Handle form submission here
  }

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <div className="w-full">
          <TextAreaField
            label="Escreva brevemente a história da instituição "
            name="history"
            placeholder="Ex: Amigos da Cosmos"
            register={register}
            error={errors.history?.message}
            minLength={100} // Set the minLength validation here
            maxLength={300} // Set the maxLength validation here
            value={historyW} // Bind value to historyW
          />
        </div>
        <div className="w-full">
          <TextAreaField
            label="Qual a atuação e o impacto da organização?"
            name="impact"
            placeholder="Ex: Amigos da Cosmos"
            register={register}
            error={errors.impact?.message}
            minLength={100} // Set the minLength validation here
            maxLength={300} // Set the maxLength validation here
            value={impactW} // Bind value to historyW
          />
        </div>
        <div className="w-full">
          <TextAreaField
            label="Quais são as principais necessidades e desafios que a sua organização enfrenta no momento?"
            name="necessity"
            placeholder="Ex: Amigos da Cosmos"
            register={register}
            error={errors.necessity?.message}
            minLength={100} // Set the minLength validation here
            maxLength={300} // Set the maxLength validation here
            value={necessityW} // Bind value to historyW
          />
        </div>

        <div className="max-w-[240px]">
          <Button text="Continuar" disabled={isDisabled} />
        </div>
      </form>
    </section>
  )
}
