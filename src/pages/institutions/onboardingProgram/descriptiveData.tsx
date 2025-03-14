import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Router from 'next/router';
import TextAreaField from '../../../components/Input/TextAreaField';
import ProgressBar from '../../../components/menu/ProgressBar';
import { Button } from '../../../components/Button/ButtonSubmit';
import { useState, useEffect } from 'react';
import { textAreaSchema } from '../../../utils/ValidationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from '../../../components/Input/InputEmail copy';


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
 
type formProps = z.infer<typeof schema>
const programName = "Cosmos Social";

export default function DescriptiveData() {
    const [currentStep] = useState(4);

    const {
        register,
        trigger,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm<formProps>({
        resolver: zodResolver(schema),
        mode: 'onChange', 
    });
    const [isLoading, setIsLoading] = useState(false)
    const history = watch("history", "");
    const impact = watch("impact", "");
    const challenges = watch("challenges", "");
    const support = watch("support", "");
    console.log(history)
 
    const disabled = !history || !impact || !challenges || !support || isLoading;

    // useEffect(() => {
    //     console.log("isValid atualizado:", isValid);
    //     console.log("Erros:", errors);
    //     setIsButtonDisabled(!isValid);
    // }, [isValid, errors, watch()]);

    function handleForm(data: any) {
        setIsLoading(true);
        toast.success('Dados salvos com sucesso!');
        Router.push('/institutions/onboardingProgram/finalization');
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
                        <InputText
                            label="Escreva brevemente a história da instituição?"
                            id="history"
                            placeholder="Digite aqui"
                            register={register}
                            error={errors.history?.message}
                        />
                        <InputText
                            label="Qual a atuação e o impacto da organização?"
                            id="impact"
                            placeholder="Digite aqui"
                            register={register}
                            error={errors.impact?.message}
                        />
                        <InputText
                            label="Quais são as principais necessidades e desafios que a sua organização enfrenta no momento?"
                            id="challenges"
                            placeholder="Digite aqui"
                            register={register}
                            error={errors.challenges?.message}
                        />
                        <InputText
                            label="Como você acredita que o programa [Nome do programa] poderá apoiar a sua organização?"
                            id="support"
                            placeholder="Digite aqui"
                            register={register}
                            dynamicLabel={programName}
                            error={errors.support?.message}
                            
                        />
                        <div className="px-4 w-[248px]">
                            <Button text="Continuar" disabled={disabled} type="submit" isLoading={true}/>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}