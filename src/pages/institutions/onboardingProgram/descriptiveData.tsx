import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Router from 'next/router';
import TextAreaField from '../../../components/Input/TextAreaField';
import ProgressBar from '../../../components/main-painel/ProgressBar';
import { Button } from '../../../components/Button/ButtonSubmit';

import { useState, useEffect } from 'react';
import { textAreaSchema } from '../../../utils/ValidationSchemas';
import { z } from 'zod';


const steps = [
    { id: 1, label: 'Termos' },
    { id: 2, label: 'Ponto focal' },
    { id: 3, label: 'Sobre a instituição' },
    { id: 4, label: 'Dados Descritivos' },
    { id: 5, label: 'Finalização' }
];

const schema = z.object({
    history: textAreaSchema,
    impact: textAreaSchema,
    challenges: textAreaSchema,
    support: textAreaSchema,
});
 

const programName = "Cosmos Social";

export default function DescriptiveData() {
    const [currentStep] = useState(4);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const {
        register,
        trigger,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all', 
    });

    useEffect(() => {
        console.log("isValid atualizado:", isValid);
        console.log("Erros:", errors);
        setIsButtonDisabled(!isValid);
    }, [isValid, errors, watch()]);

    function handleForm(data: any) {
        toast.success('Dados salvos com sucesso!');
        Router.push('/institutions/onboarding/finalization');
    }

    return (
        <div className="container">
            <Image className="logo" src={Logo} alt="Logo cosmos" height={24} quality={100} />
            <main className="flex flex-col items-center">
                <div className="w-[980px] mb-4">
                    <ProgressBar steps={steps} currentStep={currentStep} />
                </div>
                <div className="w-[890px] p-6">
                    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
                        <TextAreaField
                            label="Escreva brevemente a história da instituição"
                            name="history"
                            placeholder="Digite aqui"
                            register={register}
                            trigger={trigger}
                          
                            error={errors.history?.message?.toString()}
                        />
                        <TextAreaField
                            label="Qual a atuação e o impacto da organização?"
                            name="impact"
                            placeholder="Digite aqui"
                            register={register}
                            trigger={trigger}
                         
                            error={errors.impact?.message?.toString()}
                        />
                        <TextAreaField
                            label="Quais são as principais necessidades e desafios que a sua organização enfrenta no momento?"
                            name="challenges"
                            placeholder="Digite aqui"
                            register={register}
                            trigger={trigger}
                           
                            error={errors.challenges?.message?.toString()}
                        />
                        <TextAreaField
                            label="Como você acredita que o programa [Nome do programa] poderá apoiar a sua organização?"
                            name="support"
                            placeholder="Digite aqui"
                            register={register}
                            trigger={trigger}
                            dynamicLabel={programName}
                           
                            error={errors.support?.message?.toString()}
                        />
                        <div className="px-4 w-[248px]">
                            <Button text="Continuar" disabled={isButtonDisabled} type="submit" />
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}