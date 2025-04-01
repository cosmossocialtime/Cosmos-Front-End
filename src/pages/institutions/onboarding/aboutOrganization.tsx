// import Image from 'next/image'
// import Logo from '../../../assets/logotipoCosmos.svg'
import { useEffect, useState } from 'react'
import ProgressBar from '../../../components/menu/ProgressBar'
import { Button } from '../../../components/Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import {
  // aliasSchema,
  createMultiSelectSchema,
  nameSchema,
} from '../../../utils/ValidationSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Router from 'next/router'
// import styles from '../../../components/instituition/verifyEmail/verifyEmail.module.css'
import MultiSelectComboBox from '../../../components/combobox/MultiSelectComboBox'
import { MultiValue } from 'react-select'
import { Option } from '../../../types/MultiselectCombobox'
import InputField from '../../../components/Input/InputField'
import { saveFormData } from '../../../utils/localStroge' // se necessário: getFormData
// import DynamicHeader from '../../../components/main-painel/DynamicHeader'
import StaticHeader from '../../../components/instituition/StaticHeader'

// Opções disponíveis
const options = [
  { value: 'acessibilidade', label: 'Acessibilidade e Inclusão de PcDs' },
  { value: 'cultura', label: 'Acesso à Cultura' },
  { value: 'educacao', label: 'Acesso à Educação' },
  { value: 'esporte', label: 'Acesso ao Esporte' },
  { value: 'moradia', label: 'Acesso à Moradia' },
  { value: 'saude', label: 'Acesso à Saúde' },
  { value: 'pobreza', label: 'Combate à Pobreza' },
  { value: 'violencia_domestica', label: 'Combate à Violência Doméstica' },
  { value: 'trafico', label: 'Combate ao Tráfico de Pessoas' },
  { value: 'criancas', label: 'Direitos das Crianças e Adolescentes' },
  { value: 'animais', label: 'Direitos dos Animais' },
  { value: 'idosos', label: 'Direitos dos Idosos' },
  { value: 'indigenas', label: 'Direitos dos Povos Indígenas' },
  { value: 'humanos', label: 'Direitos Humanos' },
  { value: 'lgbtqia', label: 'Direitos LGBTQIA+' },
  { value: 'genero', label: 'Equidade de Gênero' },
  { value: 'justica', label: 'Justiça Econômica e Tributária' },
  { value: 'racial', label: 'Justiça Racial' },
  { value: 'sustentabilidade', label: 'Meio Ambiente e Sustentabilidade' },
  { value: 'seguranca_alimentar', label: 'Segurança Alimentar' },
  { value: 'outra', label: 'Outra' },
]

const steps = [
  { id: 1, label: 'Cadastro inicial' },
  { id: 2, label: 'Sobre a organização' },
  { id: 3, label: 'Sobre você' },
]

const schema = z.object({
  name: nameSchema,
  cause: createMultiSelectSchema(1, 3),
})

type formProps = z.infer<typeof schema>

export default function AboutOrganization() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep] = useState(2)
  const [isDisabled, setIsDisabled] = useState(true)
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(
    [] as MultiValue<Option>,
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected)
    setValue(
      'cause',
      { selectedOptions: [...selected] },
      { shouldValidate: true },
    )

    if (selected.length === 0) {
      setError('cause', {
        type: 'manual',
        message: 'Você precisa selecionar pelo menos 1 opção.',
      })
    } else {
      console.log('Erro foi setado!', errors.cause)
      clearErrors('cause')
    }

    trigger('cause')
  }

  //  useEffect(() => {
  //     const savedData = getFormData("aboutOrganization");

  //     setIsDisabled(!isValid);
  //     if (savedData?.nameOrganization) {
  //         setValue("name", savedData.nameOrganization)
  //     }
  // }, [setValue, isValid]);
  useEffect(() => {
    const nomePreenchido = watch('name')
    setIsDisabled(
      !(
        nomePreenchido &&
        nomePreenchido.length >= 2 &&
        selectedOptions.length >= 1
      ),
    )
  }, [watch('name'), selectedOptions])

  // useEffect(() => {
  //     const nomePreenchido = watch("name");
  //     if (nomePreenchido && nomePreenchido.length >= 2 && selectedOptions.length === 3) {
  //         setIsDisabled(false);
  //     } else {
  //         setIsDisabled(true);
  //     }
  // }, [watch("name"), selectedOptions]);
  // // Atualiza o estado do botão sempre que os inputs mudam
  // useEffect(() => {
  //     setIsDisabled(!isValid);
  // }, [isValid]);
  // // useEffect(() => {
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
  // [selectedOptions, watch]);

  async function handleForm(data: formProps) {
    setIsLoading(true)
    console.log(data)
    try {
      saveFormData('aboutOrganization', { nameOrganization: data.name })
      // toast.success('Criado com sucesso!');
      Router.push({
        pathname: '/institutions/onboarding/aboutYou',
      })
    } catch (error) {
      toast.error('Não foi possível criar sua conta, tente novamente')
    } finally {
      setIsLoading(false)
    }
  }
  console.log(errors)
  return (
    <div className="flex min-h-screen w-full flex-col">
      <StaticHeader />
      <main className="mt-[32px] flex w-full flex-col items-center px-4">
        <div className="mb-4 w-[650px]">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        <div className="w-[384px] p-6">
          <form
            onSubmit={handleSubmit(handleForm)}
            className="flex flex-col gap-4"
          >
            <InputField
              className={`${errors.name ? 'border-red-500' : ''}`}
              label="Nome da organização"
              name="name"
              placeholder="Ex: Amigos da Cosmos"
              register={register}
              error={errors.name?.message}
            />

            <MultiSelectComboBox
              options={options}
              maxSelections={3}
              onChange={handleChange}
              label="Causa(s) em que atua (até 3)"
              error={errors.cause?.message}
              // {errors.cause && <p className="text-red-500 text-sm mt-1">{errors.cause.message}</p>}
            />

            <Button
              text={isLoading ? 'Carregando...' : 'Finalizar'}
              disabled={isDisabled || isLoading}
              type="submit"
              isLoading={isLoading}
            />
          </form>
        </div>
      </main>
    </div>
  )
}
