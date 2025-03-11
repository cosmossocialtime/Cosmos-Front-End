import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import Mensagem from '../../../assets/icons/Envelope.svg';
import { useEffect, useState } from 'react';
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css'; // Importando CSS
 
export default function VerifyEmail() {
  const [seconds, setSeconds] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const userEmail = 'email@email.com';
 
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [seconds]);
 
  return (
    <div className={styles.container}>
      <Image className={styles.logo} src={Logo} alt="Logo cosmos" height={24} quality={100} />
 
      <div className={styles.mainContent}>
        <Image src={Mensagem} alt="Envelope" width={72} height={72} quality={100} />
        <h1 className={styles.title}>Verifique seu e-mail</h1>
        <p className={styles.description}>
          Confirme sua conta clicando no link que enviamos para o e-mail{' '}
          <span className="font-semibold">{userEmail}</span> e depois finalize seu cadastro.
        </p>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Caso não tenha recebido o link, verifique sua caixa de spam.
        </p>
 
        <a
          className={`${styles.resendLink} ${isResendEnabled ? styles.enabled : styles.disabled}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (isResendEnabled) {
              setSeconds(60);
              setIsResendEnabled(false);
              console.log('Simulando envio do link...');
            }
          }}
        >
          {isResendEnabled
            ? 'Enviar novo link de confirmação'
            : `Enviar novo link em: ${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(
                seconds % 60
              ).padStart(2, '0')}`}
        </a>
      </div>
    </div>
  );
}
