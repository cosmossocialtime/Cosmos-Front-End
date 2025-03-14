import Image from 'next/image';
import Logo from '../../../assets/logotipoCosmos.svg';
import { useEffect, useState } from 'react';
import ProgressBar from '../../../components/main-painel/ProgressBar';
import { Button } from '../../../components/Button/ButtonSubmit';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Router from 'next/router';
import InputField from '../../../components/Input/InputField';
import MaskedInputField from '../../../components/Input/MaskedInputField';
import { nameSchema, cnpjSchema, receitaSchema, dataFundacaoSchema, estadoSchema, cidadeSchema, numeroSchema, fileSchema, createMultiSelectSchema, phoneSchema, emailSchema } from '../../../utils/ValidationSchemas';
import { getFormData, saveFormData } from '../../../utils/localStroge';
import { z } from 'zod';
import MaskedDateField from '../../../components/Input/MaskedDateField';
import { CustomCheckbox } from '../../../components/Button/CustomCheckbox';
import SingleSelectComboBox from '../../../components/combobox/SingleSelectComboBox';
import FileUpload from '../../../components/file/FileUpload';
import MultiSelectComboBox from '../../../components/combobox/MultiSelectComboBox';
import { MultiValue } from 'react-select';

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
    { id: 1, label: 'Termos' },
    { id: 2, label: 'Ponto focal' },
    { id: 3, label: 'Sobre a instituição' },
    { id: 4, label: 'Dados Descritivos' },
    { id: 5, label: 'Finalização' }
];

const schema = z.object({
    nomeInstituicao: nameSchema,
    cause: createMultiSelectSchema(0, null),
    cnpj: cnpjSchema,
    receitaAnual: receitaSchema,
    dataFundacao: dataFundacaoSchema,
    estado: estadoSchema,
    cidade: cidadeSchema,
    nFuncionarios: numeroSchema,
    nBeneficiarios: numeroSchema,
    estatuto: fileSchema,
    semCnpj: z.boolean().optional(),
    foraDoBrasil: z.boolean().optional(),
    nomeResponsavel: nameSchema.optional(),
    emailResponsavel: emailSchema.optional(),
    celularResponsavel: phoneSchema.optional(),
    cargoResponsavel: nameSchema.optional(),
});

interface Option {
    value: string;
    label: string;
}

type formProps = z.infer<typeof schema>

export default function AboutInstitution() {
    const [semCnpj, setSemCnpj] = useState(false);
    const [semEstatuto, setSemEstatuto] = useState(false);
    const [foraDoBrasil, setForaDoBrasil] = useState(false);
    const [selectedEstado, setSelectedEstado] = useState<Option | null>(null);
    const [selectedCidade, setSelectedCidade] = useState<Option | null>(null);
    const [cidades, setCidades] = useState<Option[]>([]);
    const [selectedFile] = useState<File | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([] as MultiValue<Option>);
    const [currentStep] = useState(3);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        watch,
        formState: { errors, isValid }
    } = useForm<formProps>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    const [isLoading, setIsLoading] = useState(false);
    const estados: Option[] = [
        { value: "sp", label: "São Paulo" },
        { value: "rj", label: "Rio de Janeiro" },
        { value: "mg", label: "Minas Gerais" },
        { value: "ba", label: "Bahia" },
    ];

    const cidadesPorEstado: Record<string, Option[]> = {
        sp: [{ value: "sao_paulo", label: "São Paulo" }, { value: "campinas", label: "Campinas" }],
        rj: [{ value: "rio", label: "Rio de Janeiro" }, { value: "niteroi", label: "Niterói" }],
        mg: [{ value: "bh", label: "Belo Horizonte" }, { value: "uberlandia", label: "Uberlândia" }],
        ba: [{ value: "salvador", label: "Salvador" }, { value: "feira", label: "Feira de Santana" }],
    };

    const handleEstadoChange = (selected: Option | null) => {
        setSelectedEstado(selected);
        setSelectedCidade(null);
        setValue("estado", selected?.value || "", { shouldValidate: true });

        if (selected) {
            setForaDoBrasil(false);
            setValue("foraDoBrasil", false);
        }

        setCidades(selected ? cidadesPorEstado[selected.value as keyof typeof cidadesPorEstado] || [] : []);
    };

    const handleCidadeChange = (selected: Option | null) => {
        setSelectedCidade(selected);
        setValue("cidade", selected?.value || "", { shouldValidate: true });

        if (selected) {
            setForaDoBrasil(false);
            setValue("foraDoBrasil", false);
        }
    };

    const handleSemCnpjChange = (value: boolean) => {
        setSemCnpj(value);
        setValue("semCnpj", value, { shouldValidate: true });
        
        if (value) {
            setValue("cnpj", "");
        }
        
    };

    const handleForaDoBrasilChange = (value: boolean) => {
        setForaDoBrasil(value);
        setValue("foraDoBrasil", value, { shouldValidate: true });

        if (value) {
            setSelectedEstado(null);
            setSelectedCidade(null);
            setValue("estado", "Selecione");
            setValue("cidade", "Selecione");
            setCidades([]);
        }
    };

    const handleChange = (selected: MultiValue<Option>) => {
        setSelectedOptions(selected);
        setValue("cause", { selectedOptions: [...selected] }, { shouldValidate: true });

        if (selected.length === 0) {
            setError("cause", {
                type: "manual",
                message: "Você precisa selecionar pelo menos 1 opção."
            });
        } else {
            clearErrors("cause");
        }
    };
    const [previousTermsAccepted, setPreviousTermsAccepted] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    useEffect(() => {
        const nomeInstituicao = watch("nomeInstituicao")?.trim() !== ""; // Nome preenchido
        const cause = selectedOptions.length > 0; // Pelo menos uma causa
        const cnpjValido = watch("cnpj")?.trim() !== "" || semCnpj; // CNPJ preenchido ou checkbox marcada
        //const cnpjValido = !!watch("cnpj")?.trim();
        const sesemCnpj = semCnpj;
        const cnpjValor = watch("cnpj"); // Capturando o valor do CNPJ para depuração
        const receitaValida = watch("receitaAnual")?.trim() !== ""; // Receita preenchida
        const dataFundacaoValida = watch("dataFundacao")?.trim() !== ""; // Data de Fundação preenchida
        const estadoValido = selectedEstado !== null || foraDoBrasil; // Estado selecionado ou checkbox marcada
        const cidadeValida = selectedCidade !== null || foraDoBrasil; // Cidade selecionada ou checkbox marcada
        const nFuncionariosValido = watch("nFuncionarios")?.trim() !== ""; // Número de funcionários preenchido
        const nBeneficiariosValido = watch("nBeneficiarios")?.trim() !== ""; // Número de beneficiários preenchido
        const estatutoValido = selectedFile !== null || semEstatuto; // Estatuto enviado ou checkbox marcada

        console.log("📢 sem CNPJ:", semCnpj); 
        console.log("📢 Valor do CNPJ:", cnpjValor); // Depuração
        console.log("📢 CNPJ válido?:", cnpjValido); // Depuração
        console.log("📢 Checkbox 'Não possui CNPJ' marcada?:", semCnpj); // Depuração

        const todosCamposPreenchidos =
            nomeInstituicao &&
            cause &&
            cnpjValido &&
            receitaValida &&
            dataFundacaoValida &&
            estadoValido &&
            cidadeValida &&
            nFuncionariosValido &&
            nBeneficiariosValido &&
            estatutoValido;
            console.log("📢 Checkbox 'Não possui CNPJ' marcada?:", cnpjValido)
            // 🔹 Recupera os dados da tela "Ponto Focal"
        const focalPointData = getFormData("focalPoint");
        if (focalPointData) {
            console.log("📢 Dados do FocalPoint recuperados:", focalPointData);

            setValue("nomeResponsavel", focalPointData.nome || "");
            setValue("emailResponsavel", focalPointData.email || "");
            setValue("celularResponsavel", focalPointData.celular || "");
            setValue("cargoResponsavel", focalPointData.cargo || "");

            // ✅ Recuperando os termos aceitos
            if (focalPointData.termsAccepted !== undefined) {
                console.log("📢 Termos aceitos na tela anterior:", focalPointData.termsAccepted);
                setPreviousTermsAccepted(focalPointData.termsAccepted);
            }
            if (focalPointData.focalPointAccepted !== undefined) {
                console.log("📢 Termos aceitos nesta tela:", focalPointData.focalPointAccepted);
                setAcceptTerms(focalPointData.focalPointAccepted);
            }
        } else {
            console.log("⚠️ Nenhum dado encontrado no localStorage para FocalPoint");
        }

        // 🔹 Recupera os dados da tela "Sobre a Instituição"
        const aboutInstitutionData = getFormData("aboutInstitution");
        if (aboutInstitutionData) {
            console.log("📢 Dados da AboutInstitution recuperados:", aboutInstitutionData);

            setValue("nomeInstituicao", aboutInstitutionData.nomeInstituicao || "");
            setValue("cause", aboutInstitutionData.cause || []);
            setValue("cnpj", aboutInstitutionData.cnpj || "");
            setValue("receitaAnual", aboutInstitutionData.receitaAnual || "");
            setValue("dataFundacao", aboutInstitutionData.dataFundacao || "");
            setValue("nFuncionarios", aboutInstitutionData.nFuncionarios || "");
            setValue("nBeneficiarios", aboutInstitutionData.nBeneficiarios || "");

            if (aboutInstitutionData.estado) {
                setSelectedEstado(estados.find(e => e.value === aboutInstitutionData.estado) || null);
            }
            if (aboutInstitutionData.cidade) {
                setSelectedCidade(cidades.find(c => c.value === aboutInstitutionData.cidade) || null);
            }
        } else {
            console.log("⚠️ Nenhum dado encontrado no localStorage para AboutInstitution.");
        }
        setIsButtonDisabled(!todosCamposPreenchidos);
    }, [
        watch("nomeInstituicao"),
        selectedOptions,
        watch("cnpj"),
        semCnpj,
        watch("receitaAnual"),
        watch("dataFundacao"),
        selectedEstado,
        selectedCidade,
        foraDoBrasil,
        watch("nFuncionarios"),
        watch("nBeneficiarios"),
        selectedFile,
        semEstatuto,
    ]);

    async function handleForm(data: formProps) {
        setIsLoading(true);
        // try {
        //     await api
        //         .post('/auth/signup', {
        //             email: data.email,
        //             password: data.password,
        //         })
        //         .then((res) => {
        //             if (res.status === 201) {
        //                 setCookie(undefined, 'cosmos.user', data.email, {
        //                     maxAge: 60 * 60 * 12,
        //                 })
        toast.success('Criado com sucesso!')
        Router.push({
            pathname: '/institutions/onboarding/verifyEmail',
            //query: { email: data.email, password: data.password }
        })
        //         })
        // } catch (error: any) {
        //     if (error.response.status === 400) {
        //         return toast.error(
        //             'Não foi possivel criar sua conta, pois este email já existe',
        //         )
        //     }
        //     if (error.response.status === 404 || error.response.status === 500) {
        //         return toast.error(
        //             'Não foi possivel criar sua conta, por favor tente novamente',
        //         )
        //     } 
        // } finally {
        setIsLoading(false);
    }

    // async function handleForm(data: any) {
    //     try {
    //         saveFormData("aboutInstitution", data);
    //         toast.success('Cadastro salvo com sucesso!');
    //         Router.push('/institutions/onboarding/descriptiveData');
    //     } catch (error) {
    //         toast.error('Erro ao salvar dados, tente novamente.');
    //     }
    // }

    return (
        <div className="container">
            <Image className="logo" src={Logo} alt="Logo cosmos" height={24} quality={100} />
            <main className="flex flex-col items-center">
                <div className="w-[980px] mb-4">
                    <ProgressBar steps={steps} currentStep={currentStep} />
                </div>
                <div className="w-[450px] p-6">
                    <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
                        <InputField
                            label="Nome da organização"
                            name="name"
                            placeholder="Ex: Amigos da Cosmos"
                            register={register}
                            error={errors.nomeInstituicao?.message}
                        />

                        <MultiSelectComboBox options={options} maxSelections={3} onChange={handleChange} label="Causa(s) em que atua (até 3)" />

                        <div className="flex gap-4">
                            {/* CNPJ */}
                            <MaskedInputField
                                label="CNPJ"
                                name="cnpj"
                                placeholder="00.000.000/0000-00"
                                register={register}
                                setValue={setValue}
                                error={errors.cnpj?.message}
                                disabled={semCnpj}
                            />

                            <MaskedInputField
                                label="Receita Anual"
                                name="receitaAnual"
                                placeholder="R$ 0,00"
                                register={register}
                                setValue={setValue}
                                error={errors.receitaAnual?.message}
                            />
                        </div>
                        <div className="flex items-center mt-[-25px]">
                            <CustomCheckbox
                                checked={semCnpj}
                                setChecked={handleSemCnpjChange}
                                labelText="Não possui CNPJ"
                            />
                        </div>
                        <MaskedDateField
                            label="Data de Fundação"
                            name="dataFundacao"
                            register={register}
                            setValue={setValue}
                            error={errors.dataFundacao?.message}
                        />

                        <div className="flex gap-4">
                            <SingleSelectComboBox
                                instanceId="estado-instance"
                                options={estados}
                                label="Estado"
                                onChange={handleEstadoChange}
                                value={selectedEstado}
                                isDisabled={foraDoBrasil}
                            />
                            <SingleSelectComboBox
                                instanceId="cidade-instance"
                                options={cidades}
                                label="Cidade"
                                onChange={handleCidadeChange}
                                value={selectedCidade}
                                isDisabled={!selectedEstado || foraDoBrasil}
                            />
                        </div>

                        <div className="flex items-center mt-[-25px]">
                            <CustomCheckbox
                                checked={foraDoBrasil}
                                setChecked={handleForaDoBrasilChange}
                                labelText="Organização localizada fora do Brasil"
                            />
                        </div>
                        <div className="flex gap-4">
                            <InputField
                                label="Número de Funcionários"
                                name="nFuncionarios"
                                register={register}
                                placeholder="0"
                                error={errors.nFuncionarios?.message}
                            />
                            <InputField
                                label="Número de Beneficiários"
                                name="nBeneficiarios"
                                register={register}
                                placeholder="0"
                                error={errors.nBeneficiarios?.message}
                            />
                        </div>
                        <FileUpload
                            label="Estatuto ou Contrato Social"
                            onFileChange={(file) => {
                                if (file) {
                                    setValue("estatuto", file, { shouldValidate: true });
                                }
                            }}
                            error={errors.estatuto}
                        />
                        <div className="flex items-center mt-[-25px]">
                            <CustomCheckbox
                                checked={semEstatuto}
                                setChecked={(value) => setSemEstatuto(value)}
                                labelText="Não possui Estatuto ou Contrato Social"
                            />
                        </div>
                        <Button
                            text="Continuar"
                            disabled={isButtonDisabled}
                            type="submit" />
                    </form>
                </div>
            </main>
        </div>
    );
}


