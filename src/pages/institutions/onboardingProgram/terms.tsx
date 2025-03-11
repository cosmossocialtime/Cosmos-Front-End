import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from '../../../assets/logotipoCosmos.svg';
import ProgressBar from '../../../components/main-painel/ProgressBar';
import { Button } from '../../../components/button/ButtonSubmit';
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css';
import { CustomCheckbox } from '../../../components/button/CustomCheckbox';
import { saveFormData } from '../../../utils/localStroge';
import { TermsText } from '../../../components/titlesAndLinks/TermsText';

const steps = [
    { id: 1, label: 'Termos' },
    { id: 2, label: 'Ponto focal' },
    { id: 3, label: 'Sobre a instituição' },
    { id: 4, label: 'Dados Descritivos' },
    { id: 5, label: 'Finalização' }
];

export default function TermsPage() {
    const [acceptTerms, setAcceptTerms] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setAcceptTerms(false);
    }, []);

    const handleAcceptTerms = (value: boolean) => {
        setAcceptTerms(value);
        console.log(value)
        saveFormData("termsAccepted", value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (acceptTerms) {
            router.push("/institutions/onboardingProgram/focalPoint");
        }
    };

    return (
        <div className={styles.container}>
            <Image className={styles.logo} src={Logo} alt="Logo cosmos" height={24} quality={100} />
            <main className="flex flex-col items-start"> 
                <div className="w-[980px] mb-4">
                    <ProgressBar steps={steps} currentStep={1} />

                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-start gap-6"> 
                        <TermsText
                            title="Coloque seu capacete, ajuste seu traje e prepare-se para uma aventura!"
                            paragraphs={[
                                "Precisamos de mais algumas informações para te inscrever nessa aventura.",
                                "É importante que você esteja ciente de que suas respostas poderão ser compartilhadas com a organização do programa e empresa parceira."
                            ]}
                            linkText="Termo de Consentimento ao Tratamento de Dados"
                            linkHref="#"
                        />
                        <div className="pt-12 flex items-center"> 
                            <div className="mr-4">
                                <CustomCheckbox
                                    checked={acceptTerms}
                                    setChecked={handleAcceptTerms}
                                    labelText="Aceito que a Cosmos, a empresa parceira e seus colaboradores tenham acesso às minhas respostas"
                                />
                            </div>
                        </div>
                        
                        <div className="pt-[12px] w-[248px]">
                            <Button text="Embarcar nesta jornada" disabled={!acceptTerms} type="submit" />
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}