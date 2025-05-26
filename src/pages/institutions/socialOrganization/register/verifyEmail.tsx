import Image from 'next/image'
// import Logo from '../../../assets/logotipoCosmos.svg'
import Mensagem from '../../../assets/icons/Envelope.svg'
import { useEffect, useState } from 'react'
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css' // Importando CSS
import { getFormData } from '../../../../utils/localStorage'
import { invokeLambda } from '../../../../lib/aws/invokeLambda'
import { toast } from 'react-toastify'
import DynamicHeader from '../../../../components/header/DynamicHeader'
import { resendConfirmationTemplate } from '../../../../lib/email/templates/templates'
import { sendEmail } from '../../../../lib/aws/sesSendMail'

export default function VerifyEmail() {
  const [secondsAmount, setSecondsAmount] = useState(60)
  const [timeExpire, setTimeExpire] = useState(false)
  const [email, setEmail] = useState('')

  const minutes = Math.floor(secondsAmount / 60)
  const seconds = secondsAmount % 60

  useEffect(() => {
    if (secondsAmount > 0) {
      setTimeout(() => {
        setSecondsAmount((state) => state - 1)
      }, 1000)
    }
    if (secondsAmount === 0) {
      setTimeExpire(true)
    }
  }, [secondsAmount])

  useEffect(() => {
    const email = getFormData('cosmos.user')
    setEmail(email)
  }, [])

  async function resendCode() {
    try {
      const payload = { email: email }

      const response = await invokeLambda<
        {
          email: string
        },
        { statusCode: number; body: string }
      >('user-resend-confirmation-lambda', payload)

      if (response.statusCode === 200) {
        const parsed = JSON.parse(response.body)
        const { subject, html } = resendConfirmationTemplate(
          parsed.confirmationCode
        )
        sendEmail([email], subject, html)
          .then(() => {
            toast.success('Email reenviado')
          })
          .catch(() => {
            toast.error(
              'Não foi possivel enviar, tente novamente em alguns instantes'
            )
          })
      } else {
        toast.error(
          'Não foi possivel enviar, tente novamente em alguns instantes'
        )
      }
    } catch (error) {
      toast.error(
        'Não foi possivel enviar, tente novamente em alguns instantes'
      )
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DynamicHeader />

      {/* Container principal */}
      <div className="flex w-full flex-1 items-center justify-center px-4">
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <div className="flex w-full flex-col items-center justify-center px-4">
              <Image
                src={Mensagem}
                alt="Envelope"
                width={72}
                height={72}
                quality={100}
              />
              <h1 className={styles.title}>Verifique seu e-mail</h1>
              <p className={styles.description}>
                Confirme sua conta clicando no link que enviamos para o e-mail{' '}
                <span className="font-semibold">{email}</span> e depois finalize
                seu cadastro.
              </p>
              <p className="mt-4 text-center text-sm text-gray-500">
                Caso não tenha recebido o link, verifique sua caixa de spam.
              </p>

              <a
                className={`${styles.resendLink} ${
                  timeExpire ? styles.enabled : styles.disabled
                }`}
                href="#"
                onClick={resendCode}
              >
                {timeExpire
                  ? 'Enviar novo link de confirmação'
                  : `Enviar novo link em: ${String(
                      Math.floor(seconds / 60)
                    ).padStart(2, '0')}:${String(seconds % 60).padStart(
                      2,
                      '0'
                    )}`}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
