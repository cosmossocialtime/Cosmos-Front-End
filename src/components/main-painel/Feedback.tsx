import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { api } from '../../services/api'
import { toast } from 'react-toastify'

interface FeedbackProps {
  closeFeedback: () => void
}

export function Feedback({ closeFeedback }: FeedbackProps) {
  const [feedbackContent, setFeedbackContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function sendFeedback() {
    if (feedbackContent === '') {
      toast.error('Por favor, escreva seu feedback')
      return
    }
    setIsSubmitting(true)
    await api
      .post('/user/feedback', {
        feedback: feedbackContent,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success('Seu feedback foi enviado. Vamos analisá-lo em breve.')
          closeFeedback()
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error(
          'Não foi possível enviar seu feedback, tente novamente mais tarde.',
        )
      })
    setIsSubmitting(false)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-gray-500 mix-blend-multiply" />
      <Dialog.Content className="fixed top-1/2 left-1/2 z-10 flex w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-blue-900 py-9 px-12 text-gray-100">
        <Dialog.Close>
          <X size={24} className="absolute right-5 top-5" />
        </Dialog.Close>
        <h1 className="mb-2 text-2xl font-semibold">
          Ajude a Cosmos a alcançar novos horizontes
        </h1>
        <span className="text-xs">
          Conte-nos a sua sugestão para a plataforma
        </span>
        <textarea
          required
          value={feedbackContent}
          onChange={(e) => setFeedbackContent(e.target.value)}
          className="mt-3 mb-6 h-40 resize-none rounded-lg border border-solid border-violet-400 bg-transparent p-3 outline-none"
        />

        <button
          disabled={isSubmitting}
          onClick={sendFeedback}
          className="max-w-max cursor-pointer self-end rounded-lg bg-violet-500 py-4 px-32 text-lg font-semibold transition-colors hover:bg-violet-600 disabled:cursor-not-allowed disabled:bg-violet-600"
        >
          Enviar
        </button>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
