import Image from 'next/image'
// import Logo from '../../../assets/logotipoCosmos.svg'
import Mensagem from '../../../assets/icons/Envelope.svg'
import { useEffect, useState } from 'react'
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css' // Importando CSS
// import DynamicHeader from '../../../components/main-painel/DynamicHeader'
import StaticHeader from '../../../components/instituition/StaticHeader'

export default function VerifyEmail() {
  const [seconds, setSeconds] = useState(60)
  const [isResendEnabled, setIsResendEnabled] = useState(false)
  const userEmail = 'email@email.com'

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsResendEnabled(true)
    }
  }, [seconds])

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <StaticHeader />

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
                <span className="font-semibold">{userEmail}</span> e depois
                finalize seu cadastro.
              </p>
              <p className="mt-4 text-center text-sm text-gray-500">
                Caso não tenha recebido o link, verifique sua caixa de spam.
              </p>

              <a
                className={`${styles.resendLink} ${
                  isResendEnabled ? styles.enabled : styles.disabled
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (isResendEnabled) {
                    setSeconds(60)
                    setIsResendEnabled(false)
                    console.log('Simulando envio do link...')
                  }
                }}
              >
                {isResendEnabled
                  ? 'Enviar novo link de confirmação'
                  : `Enviar novo link em: ${String(
                      Math.floor(seconds / 60),
                    ).padStart(2, '0')}:${String(seconds % 60).padStart(
                      2,
                      '0',
                    )}`}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
