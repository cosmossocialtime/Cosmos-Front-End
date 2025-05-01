import { useEffect, useState } from 'react'
import { Button } from '../../../../../../components/Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from '../../../../../../components/Input/InputField'
import MaskedInputField from '../../../../../../components/Input/MaskedInputField'
import {
  nameSchema,
  cnpjSchema,
  receitaSchema,
  dataFundacaoSchema,
  estadoSchema,
  cidadeSchema,
  numeroSchema,
  fileSchema,
  createMultiSelectSchema,
} from '../../../../../../utils/ValidationSchemas'
import { z } from 'zod'
import MaskedDateField from '../../../../../../components/Input/MaskedDateField'
import { CustomCheckbox } from '../../../../../../components/Button/CustomCheckbox'
import SingleSelectComboBox from '../../../../../../components/combobox/SingleSelectComboBox'
import FileUpload from '../../../../../../components/file/FileUpload'
import MultiSelectComboBox from '../../../../../../components/combobox/MultiSelectComboBox'
import { Option } from '../../../../../../types/MultiselectCombobox'
import { MultiValue } from 'react-select'
import { invokeLambda } from '../../../../../../lib/aws/invokeLambda'
import { useQuery } from '@tanstack/react-query'
import useFetch from '../../../../../../hooks/useFetch'
import axios from 'axios'
import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import ProgressBar from '../../../../../../components/menu/ProgressBar'
import Router from 'next/router'
import { useOnboardingInstitution } from '../../../../../../context/OnboardingInstituionProvider'
import dayjs from 'dayjs'
import formatCurrency from '../../../../../../utils/formatCurrency'

const steps = [
  { id: 1, label: 'Termos' },
  { id: 2, label: 'Ponto focal' },
  { id: 3, label: 'Sobre a instituição' },
  { id: 4, label: 'Dados Descritivos' },
  { id: 5, label: 'Finalização' },
]

const schema = z.object({
  nomeInstituicao: nameSchema,
  causes: createMultiSelectSchema(1, 3),
  cnpj: cnpjSchema,
  receitaAnual: receitaSchema,
  dataFundacao: dataFundacaoSchema,
  estado: estadoSchema,
  cidade: cidadeSchema,
  nFuncionarios: numeroSchema,
  nBeneficiarios: numeroSchema,
  estatuto: fileSchema,
})

type formProps = z.infer<typeof schema>

interface cityProps {
  id: number
  nome: string
}
interface stateProps extends cityProps {
  sigla: string
}
interface CustomFile {
  name: string
  size: number
  type: string
  fileObject?: File
}

export default function AboutInstitution() {
  const [semCnpj, setSemCnpj] = useState(false)
  const [semEstatuto, setSemEstatuto] = useState(false)
  const [foraDoBrasil, setForaDoBrasil] = useState(false)
  const [selectedEstado, setSelectedEstado] = useState<Option | null>(null)
  const [selectedCidade, setSelectedCidade] = useState<Option | null>(null)
  const [selectedCreationDate, setSelectedCreationDate] = useState<Date | null>(
    null
  )
  const [selectedReceitaAnual, setSelectedReceitaAnual] = useState('')
  const [cidades, setCidades] = useState<Option[]>([])
  const [selectedFile, setSelectedFile] = useState<CustomFile | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(
    [] as MultiValue<Option>
  )
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [currentStep, setCurrentStep] = useState(3)
  const { program, socialOrganization, changeSocialOrganization } =
    useOnboardingInstitution()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const [isLoading, setIsLoading] = useState(false)

  const { data: statesOfBrazil } = useFetch<stateProps[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
  )

  const estados: Option[] =
    (statesOfBrazil &&
      statesOfBrazil.map((st) => {
        return {
          value: st.sigla,
          label: st.nome,
        }
      })) ||
    []

  async function getCauses() {
    const response = await invokeLambda<
      Record<string, never>,
      { statusCode: number; body: string }
    >('cause-select-lambda', {})
    return JSON.parse(response.body)
  }

  const { data: causes } = useQuery({
    queryKey: ['causes'],
    queryFn: getCauses,
  })

  const handleEstadoChange = (selected: Option | null) => {
    setSelectedEstado(selected)
    setValue('estado', selected?.value || '', { shouldValidate: true })

    if (selected) {
      setForaDoBrasil(false)
    }

    const estadoEncontrado = statesOfBrazil?.find(
      (e) => e.sigla === selected?.value
    )
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoEncontrado?.id}/municipios`
      )
      .then(({ data: cidades }: { data: cityProps[] }) => {
        setCidades(
          cidades.map((c) => {
            return {
              value: String(c.id),
              label: c.nome,
            }
          })
        )
      })
      .catch(() => {
        console.error('Não foi possível obter a lista de cidades:')
        setCidades([])
      })
  }

  const handleCidadeChange = (selected: Option | null) => {
    setSelectedCidade(selected)
    setValue('cidade', selected?.value || '', { shouldValidate: true })

    if (selected) {
      setForaDoBrasil(false)
    }
  }

  const handleSemCnpjChange = (value: boolean) => {
    setSemCnpj(value)

    if (value) {
      setValue('cnpj', '')
    }
  }

  const handleForaDoBrasilChange = (value: boolean) => {
    setForaDoBrasil(value)

    if (value) {
      setSelectedEstado(null)
      setSelectedCidade(null)
      setValue('estado', 'Selecione')
      setValue('cidade', 'Selecione')
      setCidades([])
    }
  }

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected)
    setValue(
      'causes',
      { selectedOptions: [...selected] },
      { shouldValidate: true }
    )

    if (selected.length === 0) {
      setError('causes', {
        type: 'manual',
        message: 'Você precisa selecionar pelo menos 1 opção.',
      })
    } else {
      clearErrors('causes')
    }

    trigger('causes')
  }

  useEffect(() => {
    const nomeInstituicao = watch('nomeInstituicao')?.trim() !== '' // Nome preenchido
    const cause = selectedOptions.length > 0 // Pelo menos uma causa
    const cnpjValido = watch('cnpj')?.trim() !== '' || semCnpj // CNPJ preenchido ou checkbox marcada
    const receitaValida = watch('receitaAnual')?.trim() !== '' // Receita preenchida
    const dataFundacaoValida = watch('dataFundacao')?.trim() !== '' // Data de Fundação preenchida
    const estadoValido = selectedEstado !== null || foraDoBrasil // Estado selecionado ou checkbox marcada
    const cidadeValida = selectedCidade !== null || foraDoBrasil // Cidade selecionada ou checkbox marcada
    const nFuncionariosValido = watch('nFuncionarios')?.trim() !== '' // Número de funcionários preenchido
    const nBeneficiariosValido = watch('nBeneficiarios')?.trim() !== '' // Número de beneficiários preenchido
    const estatutoValido = watch('estatuto') !== undefined || semEstatuto // Estatuto enviado ou checkbox marcada

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
      estatutoValido

    setIsButtonDisabled(!todosCamposPreenchidos)
  }, [
    watch('nomeInstituicao'),
    selectedOptions,
    watch('cnpj'),
    semCnpj,
    watch('receitaAnual'),
    watch('dataFundacao'),
    selectedEstado,
    selectedCidade,
    foraDoBrasil,
    watch('nFuncionarios'),
    watch('nBeneficiarios'),
    watch('estatuto'),
    semEstatuto,
  ])

  useEffect(() => {
    if (socialOrganization !== null) {
      axios
        .get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
        )
        .then(({ data: estados }: { data: stateProps[] }) => {
          const states = estados.map((c) => {
            return {
              id: c.id,
              value: c.sigla,
              label: c.nome,
            }
          })
          const estadoEncontrado = states.find(
            (e) => e.value === String(socialOrganization?.state)
          )
          if (estadoEncontrado !== undefined) {
            handleEstadoChange({
              value: estadoEncontrado.value,
              label: estadoEncontrado.label,
            })
          }
          if (
            socialOrganization.city !== null &&
            socialOrganization.city !== undefined
          ) {
            axios
              .get(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoEncontrado?.id}/municipios`
              )
              .then(({ data: cidades }: { data: cityProps[] }) => {
                const cidadeEncontrado = cidades.find(
                  (c) => c.id === Number(socialOrganization.city || 0)
                )
                if (cidadeEncontrado !== undefined) {
                  handleCidadeChange({
                    value: String(cidadeEncontrado.id),
                    label: cidadeEncontrado.nome,
                  })
                }
              })
              .catch(() => {
                console.error('Não foi possível obter a lista de cidades:')
                setCidades([])
              })
          }
        })
        .catch(() => {
          console.error('Não foi possível obter a lista de estados:')
        })
      setSemCnpj(socialOrganization.semCnpj || false)
      setSemEstatuto(socialOrganization.semEstatuto || false)
      setForaDoBrasil(socialOrganization.foraDoBrasil || false)
      setSelectedCreationDate(
        socialOrganization.creationDate !== undefined
          ? socialOrganization.creationDate
          : null
      )
      setSelectedReceitaAnual(
        socialOrganization.annualRevenue !== undefined
          ? formatCurrency(String(socialOrganization.annualRevenue))
          : ''
      )
      setValue('nomeInstituicao', socialOrganization.name, {
        shouldValidate: true,
      })
      handleChange(socialOrganization.causes)
      setValue('cnpj', socialOrganization.cnpj)
      setValue(
        'receitaAnual',
        socialOrganization.annualRevenue !== undefined
          ? formatCurrency(String(socialOrganization.annualRevenue))
          : '',
        { shouldValidate: true }
      )
      setValue(
        'dataFundacao',
        dayjs(socialOrganization.creationDate).format('DD/MM/YYYY'),
        { shouldValidate: true }
      )
      setValue(
        'nFuncionarios',
        socialOrganization.collaborators !== undefined &&
          socialOrganization.collaborators !== null
          ? String(socialOrganization.collaborators)
          : ''
      )
      setValue(
        'nBeneficiarios',
        socialOrganization.beneficiaries !== undefined &&
          socialOrganization.beneficiaries !== null
          ? String(socialOrganization.beneficiaries)
          : ''
      )
    }
  }, [socialOrganization])

  async function handleForm(data: formProps) {
    setIsLoading(true)
    const dateParts = data.dataFundacao.split('/')
    const [day, month, year] = dateParts.map((part) => parseInt(part, 10))
    const date = new Date(year, month - 1, day)

    changeSocialOrganization({
      name: data.nomeInstituicao,
      causes: data.causes.selectedOptions,
      cnpj: data.cnpj,
      annualRevenue: Number(data.receitaAnual || 0),
      creationDate: date,
      state: selectedEstado?.value,
      city: selectedCidade?.value,
      collaborators:
        data.nFuncionarios !== undefined
          ? Number(data.nFuncionarios)
          : undefined,
      beneficiaries:
        data.nBeneficiarios !== undefined
          ? Number(data.nBeneficiarios)
          : undefined,
      semCnpj: semCnpj,
      semEstatuto: semEstatuto,
      foraDoBrasil: foraDoBrasil,
    })
    Router.push(
      `/institutions/adventure/${program?.id}/subscribe/descriptiveData`
    )
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DynamicHeader />
      <main className="mt-[32px] flex w-full flex-col items-center px-4">
        <div className="mb-4 w-[1018px]">
          <ProgressBar
            steps={steps}
            currentStep={currentStep}
            onBack={() =>
              Router.push(
                `/institutions/adventure/${program?.id}/subscribe/focalPoint`
              )
            }
          />
        </div>
        <div className="w-[450px] p-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleForm, (formErrors) => {
              console.error('ERROS DE VALIDAÇÃO:', formErrors)
            })}
          >
            <InputField
              label="Nome da organização"
              name="nomeInstituicao"
              placeholder="Ex: Amigos da Cosmos"
              register={register}
              error={errors.nomeInstituicao?.message}
            />

            <MultiSelectComboBox
              options={causes}
              maxSelections={3}
              value={selectedOptions}
              onChange={handleChange}
              label="Causa(s) em que atua (até 3)"
            />

            <div className="flex gap-4">
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
                defaultValue={selectedReceitaAnual}
                error={errors.receitaAnual?.message}
              />
            </div>
            <div className="mt-[-25px] flex items-center">
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
              defaultDate={selectedCreationDate}
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

            <div className="mt-[-25px] flex items-center">
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
                if (typeof window !== 'undefined' && file) {
                  setSelectedFile({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    fileObject: file,
                  })
                  setValue('estatuto', file, { shouldValidate: true })
                } else {
                  setSelectedFile(null)
                  setValue('estatuto', undefined, { shouldValidate: true })
                }
              }}
              error={errors.estatuto}
            />
            <div className="mt-[-25px] flex items-center">
              <CustomCheckbox
                checked={semEstatuto}
                setChecked={(value) => setSemEstatuto(value)}
                labelText="Não possui Estatuto ou Contrato Social"
              />
            </div>
            <Button
              text="Continuar"
              disabled={isButtonDisabled}
              type="submit"
            />
          </form>
        </div>
      </main>
    </div>
  )
}
