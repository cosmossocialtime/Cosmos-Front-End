import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Logo from '../../../assets/logotipoCosmos.svg'
import ProgressBar from '../../../components/menu/ProgressBar'
import { Button } from '../../../components/Button/ButtonSubmit'
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css'
import { CustomCheckbox } from '../../../components/Button/CustomCheckbox'
import { saveFormData } from '../../../utils/localStroge'
import { TermsText } from '../../../components/TitlesAndLinks/TermsText'
import DynamicHeader from '../../../components/main-painel/DynamicHeader'

const steps = [
    { id: 1, label: 'Termos' },
    { id: 2, label: 'Ponto focal' },
    { id: 3, label: 'Sobre a instituição' },
    { id: 4, label: 'Dados Descritivos' },
    { id: 5, label: 'Finalização' },
]

export default function TermsPage() {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setAcceptTerms(false)
  }, [])

  const handleAcceptTerms = (value: boolean) => {
    setAcceptTerms(value)
    console.log(value)
    saveFormData('termsAccepted', value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (acceptTerms) {
      router.push('/institutions/onboardingProgram/focalPoint')
    }
  }

    return (
        <Layout>
            <div className="mb-4 w-[980px]">
                <ProgressBar steps={steps} currentStep={1} />

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 flex flex-col items-start gap-6"
                >
                    <TermsText
                        title="Coloque seu capacete, ajuste seu traje e prepare-se para uma aventura!"
                        paragraphs={[
                            'Precisamos de mais algumas informações para te inscrever nessa aventura.',
                            'É importante que você esteja ciente de que suas respostas poderão ser compartilhadas com a organização do programa e empresa parceira.',
                        ]}
                        linkText="Termo de Consentimento ao Tratamento de Dados"
                        linkHref="#"
                    />
                    <div className="flex items-center pt-12">
                        <div className="mr-4">
                            <CustomCheckbox
                                checked={acceptTerms}
                                setChecked={handleAcceptTerms}
                                labelText="Aceito que a Cosmos, a empresa parceira e seus colaboradores tenham acesso às minhas respostas"
                            />
                        </div>
                    </div>

                    <div className="w-[248px] pt-[12px]">
                        <Button
                            text="Embarcar nesta jornada"
                            disabled={!acceptTerms}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </Layout>
    )
}
