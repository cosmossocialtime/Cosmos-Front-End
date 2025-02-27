import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import { useEffect, useState } from 'react';
import ProgressBar from '../../../components/main-painel/ProgressBar';
import { Button } from '../../../components/Button/ButtonSubmit';
import { useForm } from 'react-hook-form';
import { aliasSchema, multiSelectSchema, nameSchema } from '../../../utils/ValidationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Router from 'next/router';
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css';
import MultiSelectComboBox from '../../../components/combobox/MultiSelectComboBox';
import { MultiValue } from 'react-select';
import { Option } from "../../../types/MultiselectCombobox";

// Opções disponíveis
const options = [
    { value: "acessibilidade", label: "Acessibilidade e Inclusão de PcDs" },
    { value: "cultura", label: "Acesso à Cultura" },
    { value: "educacao", label: "Acesso à Educação" },
    { value: "esporte", label: "Acesso ao Esporte" },
    { value: "moradia", label: "Acesso à Moradia" },
    { value: "saude", label: "Acesso à Saúde" },
    { value: "pobreza", label: "Combate à Pobreza" },
    { value: "violencia_domestica", label: "Combate à Violência Doméstica" },
    { value: "trafico", label: "Combate ao Tráfico de Pessoas" },
    { value: "criancas", label: "Direitos das Crianças e Adolescentes" },
    { value: "animais", label: "Direitos dos Animais" },
    { value: "idosos", label: "Direitos dos Idosos" },
    { value: "indigenas", label: "Direitos dos Povos Indígenas" },
    { value: "humanos", label: "Direitos Humanos" },
    { value: "lgbtqia", label: "Direitos LGBTQIA+" },
    { value: "genero", label: "Equidade de Gênero" },
    { value: "justica", label: "Justiça Econômica e Tributária" },
    { value: "racial", label: "Justiça Racial" },
    { value: "sustentabilidade", label: "Meio Ambiente e Sustentabilidade" },
    { value: "seguranca_alimentar", label: "Segurança Alimentar" },
    { value: "outra", label: "Outra" },
];

const steps = [
    { id: 1, label: 'Cadastro inicial' },
    { id: 2, label: 'Sobre a organização' },
    { id: 3, label: 'Sobre você' }
];

const schema = z.object({
    name: nameSchema,
    // multiSelect: multiSelectSchema
});

type formProps = z.infer<typeof schema>;

export default function MultiStepForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(2);
    const [isDisabled, setIsDisabled] = useState(true);
    //const [selectedOptions] = useState<MultiValue<Option>>([]);
    const handleNextStep = () => {
        if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm<formProps>({ resolver: zodResolver(schema),
        mode: 'onChange'
     });

    // Atualiza o estado do botão sempre que os inputs mudam
    useEffect(() => {
        setIsDisabled(!isValid);
    }, [isValid]);
    // useEffect(() => {
    //     const nomePreenchido = watch("name");

    //     if (nomePreenchido && nomePreenchido.length >= 2) {
    //         setIsDisabled(false);
    //     } else {
    //         setIsDisabled(true);
    //     }
    // }, [watch("name")]);
    // if (selectedOptions.length > 0 && selectedOptions.length <= 3 && nomePreenchido) {
    //     setIsDisabled(false);
    // } else {
    //     setIsDisabled(true);
    // }
    //[selectedOptions, watch]);  

    async function handleForm(data: formProps) {
        setIsLoading(true);
        try {
            //toast.success('Criado com sucesso!');
            Router.push({
                pathname: '/onboarding/institutions/aboutYou',
            });
        } catch (error: any) {
            toast.error('Não foi possível criar sua conta, tente novamente');
        } finally {
            setIsLoading(false);
        }
    }



    return (

        <div className={styles.container}>
            {/* Logo */}
            <Image className={styles.logo} src={Logo} alt="Logo cosmos" height={24} quality={100} />

            <main className="flex flex-col items-center">
                {/* Barra de Progresso - 554px */}
                <div className="w-[607px] mb-4">
                    <ProgressBar steps={steps} currentStep={currentStep} />
                </div>

                {/* Formulário - 384px */}
                <div className="w-[384px] p-6 bg-white rounded-lg shadow-md">
                    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
                        {/* Nome */}
                        <div>
                            <label htmlFor="Nome" className="text-sm font-medium text-gray-700">
                                Nome da organização
                            </label>
                            <input
                                {...register('name')}
                                required
                                id="Nome"
                                placeholder="Ex: Amigos da Cosmos"
                                className=" mt-1 p-2 rounded-md border border-solid border-gray-400 transition-all  w-full duration-200 mt-1 p-2  hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* <MultiSelectComboBox options={options} maxSelections={3} label="Causa(s) em que atua (até 3)" /> */}

                        <Button
                            text={isLoading ? "Carregando..." : "Finalizar"}
                            disabled={isDisabled || isLoading}
                            type="submit"
                            isLoading={isLoading}
                            onClick={handleNextStep}
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}