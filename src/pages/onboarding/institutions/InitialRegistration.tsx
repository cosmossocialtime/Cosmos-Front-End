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


// Componente customizado para adicionar Checkbox dentro do Select

// // **Componente Customizado para adicionar Checkbox dentro do Select**
// const CustomOption = (props: any) => {
//     const { data, isSelected, innerRef, innerProps, selectOption } = props;

//     return (
//         <div
//             ref={innerRef}
//             {...innerProps}
//             onClick={() => selectOption(data)} // Atualiza o react-select ao clicar na opção
//             className={`flex items-center px-3 py-2 transition-colors cursor-pointer rounded gap-2
//                         ${isSelected ? "bg-gradient-to-r from-blue-300 to-purple-500 text-white" : "hover:bg-purple-100 text-purple-700"}`} // Agora o fundo também muda
//         >
//             {/* Checkbox Controlado pelo react-select */}
//             <Checkbox.Root
//                 className={`flex  h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-zinc-50
//                     ${isSelected && '&& border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'}`}
//                 checked={isSelected}
//                 onCheckedChange={() => {
//                     selectOption(data)
//                     if (checked === true) { }
//                 }
//                 } // Atualiza o estado do react-select
//             >
//                 {isSelected && <Check size={16} className="text-purple-600" />}
//             </Checkbox.Root>

//             {/* Texto da Opção */}
//             <span className={`transition-all ${isSelected ? "text-white font-medium" : "text-gray-700"}`}>
//                 {data.label}
//             </span>
//         </div>
//     );
// };

// **Componente Customizado para adicionar Checkbox dentro do Select**

// const CustomOption = (props: any) => {
//     const { data, isSelected, innerRef, innerProps, selectOption } = props;

//     const handleCheckedChange = (event: any) => {
//         event.stopPropagation(); // Impede que o clique feche o dropdown
//         selectOption(data); // Atualiza o react-select
//     };

//     return (
//         <components.Option {...props}>
//             <div
//                 ref={innerRef}
//                 {...innerProps}
//                 className={`flex items-center px-3 py-2 transition-colors cursor-pointer rounded gap-2
//                             ${isSelected ? "bg-gradient-to-r from-blue-300 to-purple-500 text-white" : "hover:bg-purple-100 text-purple-700"}`}
//             >
//                 {/* Checkbox sincronizado corretamente */}
//                 <Checkbox.Root
//                     className={`flex h-6 w-6 items-center justify-center rounded border-2 transition-all
//                         ${isSelected ? "border-none bg-gradient-to-r from-blue-300 to-purple-600" : "border-gray-400 bg-white"}`}
//                     checked={isSelected}
//                     onCheckedChange={handleCheckedChange} // Agora o clique no checkbox atualiza corretamente
//                 >
//                     {isSelected && <Check size={16} className="text-white" />}
//                 </Checkbox.Root>

//                 {/* Texto da Opção */}
//                 <span className={`transition-all ${isSelected ? "text-white font-medium" : "text-gray-700"}`}>
//                     {data.label}
//                 </span>
//             </div>
//         </components.Option>
//     );
// };



const CustomOption = (props: any) => {
    const [acceptTerms, setAcceptTerms] = useState(false);
    const { data, isSelected, innerRef, innerProps } = props;

    return (
        <div className="my-4 flex gap-2 px-3 py-2">
            <Checkbox.Root
                className={`flex  h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-zinc-50 ${acceptTerms &&
                    '&& border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'
                    }`}
                id="checkbox"
                required
                checked={acceptTerms}
                onCheckedChange={(checked) => {
                    if (checked === true) {
                        setAcceptTerms(true)
                    } else {
                        setAcceptTerms(false)
                    }
                }}
            >
                <Checkbox.Indicator>
                    <Check size={32} className="p-1 font-bold text-zinc-50" />
                </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-gray-700">{data.label}</span>
        </div>

    );
};

// **Componente Customizado para adicionar Checkbox dentro do Select**
// const CustomOption = (props: any) => {
//     const { data, isSelected, innerRef, innerProps, selectOption } = props;

//     return (
//         <div
//             ref={innerRef}
//             {...innerProps}
//             onClick={() => selectOption(data)} // Garante que o react-select receba a seleção
//             className={`flex items-center px-3 py-2 transition-colors cursor-pointer rounded gap-2 
//                         ${isSelected ? "bg-purple-100" : "hover:bg-gray-200"}`} // Corrige o hover
//         >
//             {/* Checkbox Controlado */}
//             <Checkbox.Root
//                 className="flex h-5 w-5 items-center justify-center border border-gray-400 bg-white rounded-md"
//                 checked={isSelected}
//                 onCheckedChange={() => selectOption(data)}
//             >
//                 {isSelected && <Check size={16} className="text-purple-600" />}
//             </Checkbox.Root>

//             {/* Texto da Opção */}
//             <span className="text-gray-700">{data.label}</span>
//         </div>
//     );
// };

// Componente customizado para adicionar Checkbox dentro do Select
// const CustomOption = (props: any) => {
//     const { data, isSelected, innerRef, innerProps, selectOption } = props;

//     return (
//   <div
//         ref={innerRef}
//         {...innerProps}
//         onClick={() => selectOption(data)}
//         className="flex items-center px-3 py-2 hover:bg-gray-200 transition-colors cursor-pointer rounded gap-2"
//   >
//         {/* Checkbox */}
//   <Checkbox.Root
//           className="flex h-5 w-5 items-center justify-center border border-gray-400 bg-white rounded-md"
//           checked={isSelected}
//           onCheckedChange={() => selectOption(data)}
//   >
//           {isSelected && <Check size={16} className="text-purple-600" />}
//   </Checkbox.Root>

//         {/* Texto da opção */}
//   <span className="text-gray-700">{data.label}</span>
//   </div>
//     );
//   };

// **1️⃣ Criar um `DropdownIndicator` que usa a seta exportada**
const DropdownIndicator = (props: any) => {
    const { menuIsOpen } = props;

    return (
        <components.DropdownIndicator {...props}>
            <Image
                src="/images/arrow-down.svg" // Caminho do SVG na pasta public/icons
                alt="Abrir dropdown"
                width={16}
                height={12}
                style={{
                    transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)", // Gira ao abrir
                    transition: "transform 0.2s ease-in-out",
                }}
            />
        </components.DropdownIndicator>
    );
};

// Definição dos estilos customizados
const customStyles: StylesConfig<any, true> = {
    control: (base, state) => ({
        ...base,
        border: "1px solid #9CA3AF", // Cinza padrão border-gray-400
        borderRadius: "6px", // Borda arredondada como no Tailwind `rounded-md`
        padding: "6px 8px",
        transition: "all 0.2s ease-in-out",
        width: "100%", // Garante que ocupa toda a largura
        "&:hover": {
            borderColor: "#9333EA", boxShadow: "0 1px 2px rgba(147, 51, 234, 0.2)",
        }, // Hover roxo
        boxShadow: state.isFocused ? "0 0 0 2px rgba(147, 51, 234, 0.4)" : "none", // Foco com roxo
        borderColor: state.isFocused ? "#9333EA" : "#9CA3AF",

    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "#E6E6FA" : "white", // Fundo lilás claro para selecionados
        color: "black",
        "&:hover": {
            backgroundColor: "#F3E8FF", // Cor mais clara ao passar o mouse
        },
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "#E6F4FF", // Fundo do item selecionado
        borderRadius: "100px", // Bordas arredondadas para os itens selecionados
        padding: "6px 8px", // Padding interno
        border: "1px solid #0890F7", // Cor da borda
        // borderRadius: "100px", // Borda arredondada
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: "#000", // Cor do texto dos itens selecionados
    }),
    multiValueRemove: (base) => ({
        ...base,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#E6F4FF",
            color: "#0890F7", // Ícone de remover na cor azul ao passar o mouse
        },
    }),
    indicatorsContainer: (base) => ({
        gap: "0",
    }),
    indicatorSeparator: () => ({
        display: "none"
    }),
};

// **Remover o "X |" extra**
const ClearIndicator = (props: any) => {
    return null; // Não exibe o botão de limpar tudo
};
export default function MultiStepForm() {

    const [currentStep, setCurrentStep] = useState(2);
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
                // pathname: '/onboarding/institutions/verifyEmail',
            });
        } catch (error: any) {
            toast.error('Não foi possível criar sua conta, tente novamente');
        } finally {
            setIsLoading(false);
        }
    }


    const [selectedOptions, setSelectedOptions] = useState<
        MultiValue<{ value: string; label: string }>
    >([]);

    // Função para lidar com a seleção
    const handleChange = (selected: MultiValue<{ value: string; label: string }>) => {
        if (selected.length <= 3) {
            setSelectedOptions(selected);
        }
    };


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


                        {/* Área de trabalho */}
                        <div>
                            <label htmlFor="causas" className="text-sm font-medium text-gray-700">
                                Causa(s) em que atua (até 3)
                            </label>
                            <Select
                                id="causas"
                                options={options}
                                isMulti
                                value={selectedOptions}
                                onChange={handleChange}
                                placeholder="Selecione uma ou mais opções"
                                closeMenuOnSelect={false}
                                styles={customStyles}
                                className="mt-1"
                                components={{ ClearIndicator, DropdownIndicator, Option: CustomOption }} // Remove o "X |" extra
                            />
                        </div>

                        {/* Celular */}
                        {/* <div>
                            <label htmlFor="Celular" className="text-sm font-medium text-gray-700">
                                Celular
                            </label>
                            <input
                                type="text"
                                id="Celular"
                                placeholder="+55 (00) 00000 - 0000"
                                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div> */}

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

                        <div className="my-4 flex gap-2">
                            <Checkbox.Root
                                className={`flex  h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-zinc-50 ${acceptTerms &&
                                    '&& border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'
                                    }`}
                                id="checkbox"
                                required
                                checked={acceptTerms}
                                onCheckedChange={(checked) => {
                                    if (checked === true) {
                                        setAcceptTerms(true)
                                    } else {
                                        setAcceptTerms(false)
                                    }
                                }}
                            >
                                <Checkbox.Indicator>
                                    <Check size={32} className="p-1 font-bold text-zinc-50" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
}