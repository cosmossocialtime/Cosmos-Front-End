import { X } from 'phosphor-react'
import TextAreaField from '../../../../components/Input/TextAreaField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Button } from '../../../../components/Button/ButtonSubmit'

interface FeedbackModalProps {
  closeModal: () => void
}

const schema = z.object({
  feedback: z.string().min(100).max(300),
})

type formProps = z.infer<typeof schema>

export const FeedbackModal = ({ closeModal }: FeedbackModalProps) => {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
  })
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const feedbackW = watch('feedback')

  useEffect(() => {
    const checkInput = () => {
      if (feedbackW?.length >= 100) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }

    checkInput()
  }, [feedbackW])

  const handleForm = (data: formProps) => {
    console.log(data)
  }

  return (
    <section className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black/10">
      <section className="rounded-md bg-white p-5 md:w-[650px]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Ajude a Cosmos a alcançar novos horizontes
          </h1>

          <X className="cursor-pointer" onClick={closeModal} />
        </div>

        <form onSubmit={handleSubmit(handleForm)} className="mt-5">
          <TextAreaField
            label="Conte-nos a sua sugestão ou feedback para a plataforma"
            maxLength={300}
            minLength={100}
            name="feedback"
            value={feedbackW}
            register={register}
            error={errors.feedback?.message}
          />

          <div className="max-w-[240px]">
            <Button text="Enviar" disabled={isDisabled} type="submit" />
          </div>
        </form>
      </section>
    </section>
  )
}
