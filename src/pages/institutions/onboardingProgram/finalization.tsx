import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import { useEffect, useState } from 'react';
import ProgressBar from '../../../components/menu/ProgressBar';
import { Button } from '../../../components/Button/ButtonSubmit';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css';
import { getFormData } from '../../../utils/localStroge';
import SingleSelectComboBox from '../../../components/combobox/SingleSelectComboBox';
import DynamicHeader from '../../../components/main-painel/DynamicHeader';

const options = [
    { value: "busca_google", label: "Busca no Google" },
    { value: "divulgacao", label: "E-mail de divulgação" },
    { value: "Evento_Palestra", label: "Evento ou palestra" },
    { value: "indicacao_amigos_colegas", label: "Indicação de amigos ou colegas" },
    { value: "Noticia_artigo_midia", label: "Notícia ou artigo na Mídia" },
    { value: "redes_sociais", label: "Redes sociais" },
    { value: "site_Cosmos", label: "Site da Cosmos" },
    { value: "outro", label: "Outro" },
];

const steps = [
    { id: 1, label: 'Termos' },
    { id: 2, label: 'Ponto focal' },
    { id: 3, label: 'Sobre a instituição' },
    { id: 4, label: 'Dados Descritivos' },
    { id: 5, label: 'Finalização' }
];

const schema = z.object({
    como_soube: z.string().nonempty("Este campo é obrigatório")
});

type formProps = z.infer<typeof schema>;

export default function finalization() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(5);
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);

    const {
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<formProps>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    useEffect(() => {
        const savedData = getFormData("finalization");

        if (savedData?.como_soube) {
            setSelectedOption(savedData.como_soube);
        }
    }, [setValue]);

    const handleSelectChange = (selected: { value: string; label: string } | null) => {
        setSelectedOption(selected);
        setValue("como_soube", selected?.value || "");
    };

    async function handleForm(data: formProps) {
        setIsLoading(true);
        console.log(data);
        try {
            const savedOrganization = getFormData("aboutOrganization") || {};

            // const fullData = {
            //     ...data,
            //     nomeOrganizacao: savedOrganization.nameOrganization || "",
            // };

            // console.log("Dados completos a serem salvos:", fullData);

            // saveFormData("finalization", fullData);
            console.log(data);
            toast.success('Cadastro concluído!');
            //Router.push('/institutions/onboarding/verifyEmail');
        } catch (error) {
            toast.error('Erro ao criar conta, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col">
            <DynamicHeader />
            <main className="flex flex-col items-center w-full mt-[32px] px-4">
                <div className="w-[1017px] mb-4">
                    <ProgressBar steps={steps} currentStep={currentStep} onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 1))} />
                </div>
                <div className="w-[450px] p-6">
                    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
                        <SingleSelectComboBox
                            options={options}
                            label="Como você ficou sabendo sobre o programa?"
                            onChange={handleSelectChange}
                            value={selectedOption}
                        />
                        {errors.como_soube && <span className="text-red-500 text-sm">{errors.como_soube.message}</span>}

                        <Button
                            text={isLoading ? "Carregando..." : "Finalizar inscrição"}
                            disabled={!selectedOption || isLoading}
                            type="submit"
                            isLoading={isLoading}
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}