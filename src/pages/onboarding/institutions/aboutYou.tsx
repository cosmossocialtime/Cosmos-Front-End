import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import { useState } from 'react';
import ProgressBar from '../../../components/main-painel/ProgressBar';
import { Button } from '../../../components/Button/ButtonSubmit';
import { useForm } from 'react-hook-form';
import { aliasSchema } from '../../../utils/ValidationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Router from 'next/router';
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css';
import Select, { components, MultiValue, StylesConfig } from "react-select";
import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import MultiSelectComboBox from '../../../components/combobox/MultiSelectComboBox';


const steps = [
    { id: 1, label: 'Cadastro inicial' },
    { id: 2, label: 'Sobre a organização' },
    { id: 3, label: 'Sobre você' }
];

const schema = z.object({
    nome: aliasSchema,
});

type formProps = z.infer<typeof schema>;

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


export default function MultiStepForm() {

    const [currentStep, setCurrentStep] = useState(3);
    const nextStep = () => {
        if (currentStep < steps.length) { setCurrentStep(currentStep + 1); }
    };
    const [acceptTerms, setAcceptTerms] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<formProps>({ resolver: zodResolver(schema) });

    const isDisabled = false;

    const [isLoading, setIsLoading] = useState(false);

    async function handleForm(data: formProps) {
        setIsLoading(true);
        try {
            toast.success('Criado com sucesso!');
            Router.push({
                 pathname: '/onboarding/institutions/verifyEmail',
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
                                {...register('nome')}
                                required
                                id="Nome"
                                placeholder="Ex: Amigos da Cosmos"
                                //  className=" rounded-md border border-solid border-gray-400 p-2 transition-all w-full duration-200 mt-1 p-2 border rounded-md hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500  focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                className=" mt-1 p-2 rounded-md border border-solid border-gray-400 transition-all  w-full duration-200 mt-1 p-2  hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                        </div>


                         {/* Celular */}
                        <div>
                            <label htmlFor="Celular" className="text-sm font-medium text-gray-700">
                                Celular
                            </label>
                            <input
                                type="text"
                                id="Celular"
                                placeholder="+55 (00) 00000 - 0000"
                                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>

                        <MultiSelectComboBox options={options} label="Área de Trabalho" />

                       

                       

                      

                        {/* Cargo na organização */}
                        {/* <div>
                            <label htmlFor="cargo" className="text-sm font-medium text-gray-700">
                                Seu cargo na organização
                            </label>
                            <input
                                type="text"
                                id="cargo"
                                placeholder="Ex.: Analista financeiro"
                                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div> */}
                        {/* Botão de continuar */}
                        {currentStep < steps.length && (
                            //                     <button onClick={nextStep}
                            //                         className={`mt-4 px-4 py-2 rounded w-full
                            //   ${currentStep < steps.length ? "bg-[#9D37F2] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                            //                         disabled={currentStep >= steps.length}>
                            //                         Continuar
                            //                     </button>
                            <Button text="Finalizar" disabled={isDisabled} type="submit" isLoading={isLoading} onClick={nextStep} />
                        )}

                    </form>
                </div>
            </main>
        </div>
    );
}