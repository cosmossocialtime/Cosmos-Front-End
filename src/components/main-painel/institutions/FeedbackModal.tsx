import { X } from 'phosphor-react'
import TextAreaField from '../../Input/TextAreaField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Button } from '../../Button/ButtonSubmit'
import { textAreaFeedbackSchema } from '../../../utils/ValidationSchemas'
import { toast } from 'react-toastify'
import { invokeLambda } from '../../../lib/aws/invokeLambda'

interface FeedbackModalProps {
  closeModal: () => void
}

const schema = z.object({
  feedback: textAreaFeedbackSchema,
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
      if (feedbackW?.length >= 1) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }

    checkInput()
  }, [feedbackW])

  async function handleForm(data: formProps) {
    try {
      const payload = {
        feedback: data.feedback,
      }
      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('user-feedback-create-lambda', payload)
      if (response.statusCode == 201) {
        toast.success('Feedback enviado com sucesso')
      } else {
        toast.error('Erro ao enviar feedback')
      }
    } catch (error) {
      toast.error('Erro ao enviar feedback')
    } finally {
      closeModal()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <section className="flex h-screen w-full items-center justify-center">
        <section
          className="gap-6 rounded-md bg-white  p-6 md:h-[391px] md:w-[720px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              Ajude a Cosmos a alcançar novos horizontes
            </h1>

            <X className="cursor-pointer" onClick={closeModal} />
          </div>

          <form onSubmit={handleSubmit(handleForm)} className="text-m">
            <div className="mb-6">
              <TextAreaField
                label="Conte-nos a sua sugestão ou feedback para a plataforma"
                rows={6}
                name="feedback"
                value={feedbackW}
                register={register}
                error={errors.feedback?.message}
                minLength={1}
                maxLength={2500}
              />
            </div>

            <div className="max-w-[240px]">
              <Button text="Enviar" disabled={isDisabled} type="submit" />
            </div>
          </form>
        </section>
      </section>
    </div>
  )
}
