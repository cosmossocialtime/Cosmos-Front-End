import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import { useEffect, useState } from 'react';
import ProgressBar from '../../../components/menu/ProgressBar';
import { Button } from '../../../components/Button/ButtonSubmit';
import { useForm } from 'react-hook-form';
import { nameSchema, phoneSchema } from '../../../utils/ValidationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Router from 'next/router';
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css';
import InputField from '../../../components/Input/InputField';
import { getFormData, saveFormData } from '../../../utils/localStroge';
import MaskedInputField from '../../../components/Input/MaskedInputField';
import MultiSelectComboBox from '../../../components/combobox/MultiSelectComboBox';

// Opções disponíveis
const options = [
    { value: "recursos_humanos", label: "Recursos Humanos" },
    { value: "financas", label: "Finanças" },
    { value: "marketing", label: "Marketing" },
    { value: "juridico", label: "Jurídico" },
    { value: "gestao_projetos", label: "Gestão de projetos" },
    { value: "sustentabilidade", label: "Sustentabilidade" },
    { value: "captacao_recursos", label: "Captação de Recursos" },
    { value: "estrategia", label: "Estratégia" },
    { value: "avaliacao_impacto", label: "Avaliação de Impacto" },
    { value: "lideranca", label: "Liderança" },
];

const steps = [
    { id: 1, label: 'Cadastro inicial' },
    { id: 2, label: 'Sobre a organização' },
    { id: 3, label: 'Sobre você' }
];

const schema = z.object({
    nome: nameSchema,
    celular: phoneSchema,
    cargo: nameSchema
});

type formProps = z.infer<typeof schema>;

export default function AboutYou() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep,setCurrentStep] = useState(3);
    const [isDisabled, setIsDisabled] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid }
    } = useForm<formProps>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    useEffect(() => {
        const savedData = getFormData("aboutYou");

        setIsDisabled(!isValid);
        if (savedData?.nameYou && savedData?.phone && savedData?.position) {
            setValue("nome", savedData.nameYou);
            setValue("celular", savedData.phone);
            setValue("cargo", savedData.position);
        }
    }, [setValue, isValid]);

    async function handleForm(data: formProps) {
        setIsLoading(true);
        console.log(data);
        try { 
            const savedOrganization = getFormData("aboutOrganization") || {};

            const fullData = {
                ...data,
                nomeOrganizacao: savedOrganization.nameOrganization || "", 
            };

            console.log("Dados completos a serem salvos:", fullData);

            saveFormData("aboutYou", fullData);
            console.log(data);
            toast.success('Cadastro concluído!');
            Router.push('/institutions/onboarding/verifyEmail');
        } catch (error) {
            toast.error('Erro ao criar conta, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
           
            <Image className={styles.logo} src={Logo} alt="Logo cosmos" height={24} quality={100} />
            <main className="flex flex-col items-center">
                
                <div className="w-[607px] mb-4">
                    <ProgressBar steps={steps} currentStep={currentStep} onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 1))} />
                </div>
              
                <div className="w-[384px] p-6">
                    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
                       
                        <InputField
                            label="Seu nome"
                            name="nome"
                            placeholder="Ex: Maria Gomes"
                            register={register}
                            error={errors.nome?.message}
                        />
                        
                        <MaskedInputField
                            label="Celular"
                            name="celular"
                            placeholder="Ex:+55 (00) 00000-0000"
                            register={register}
                            setValue={setValue}
                            error={errors.celular?.message}
                        />

                        <MultiSelectComboBox options={options} label="Área de Trabalho" />
                        
                        <InputField
                            label="Seu cargo na organização"
                            name="cargo"
                            placeholder="Ex: Analista financeiro"
                            register={register}
                            error={errors.cargo?.message}
                        />
                        
                        <Button
                            text={isLoading ? "Carregando..." : "Finalizar"}
                            disabled={isDisabled || isLoading}
                            type="submit"
                            isLoading={isLoading}
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}