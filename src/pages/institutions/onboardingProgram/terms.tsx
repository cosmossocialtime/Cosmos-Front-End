import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import { useState } from 'react';
import ProgressBar from '../../../components/main-painel/ProgressBar';
import { Button } from '../../../components/Button/ButtonSubmit';
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { TermsCheckbox } from '../../../components/Button/TernsCheckbox';
import { TermsText } from '../../../components/TitlesAndLinks/TermsText';

const steps = [
    { id: 1, label: 'Termos' },
    { id: 2, label: 'Ponto focal' },
    { id: 3, label: 'Sobre a instituição' },
    { id: 4, label: 'Dados Descritivos' },
    { id: 5, label: 'Finalização' }
];

export default function TermsPage() {
    const [acceptTerms, setAcceptTerms] = useState(false);

    return (
        <div className={styles.container}>
            {/* Logo */}
            <Image className={styles.logo} src={Logo} alt="Logo cosmos" height={24} quality={100} />
            <main className="flex flex-col items-center">
                {/* Barra de Progresso */}
                <div className="w-[980px] mb-4">
                    <ProgressBar steps={steps} currentStep={1} />


                    <TermsText
                        title="Coloque seu capacete, ajuste seu traje e prepare-se para uma aventura!"
                        paragraphs={["Precisamos de mais algumas informações para te inscrever nessa aventura.",
                            "É importante que você esteja ciente de que suas respostas poderão ser compartilhadas com a organização do programa e empresa parceira."
                        ]}
                        linkText="Termo de Consentimento ao Tratamento de Dados"
                        linkHref="#"
                    />
                    <div className='pt-12'>
                        <TermsCheckbox
                            acceptTerms={acceptTerms}
                            setAcceptTerms={setAcceptTerms}
                            labelText="Aceito que a Cosmos, a empresa parceira e seus colaboradores tenham acesso às minhas respostas"
                        />

                    </div>

                    <div className=" pt-[12px] w-[248px]">
                        <Button text="Embarcar nesta jornada" disabled={!acceptTerms} />
                    </div>
                </div>

            </main>
        </div>
    );
}