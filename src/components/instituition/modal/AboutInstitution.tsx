import { useEffect, useState } from 'react'
import { Button } from '../../Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from '../../Input/InputField'
import MaskedInputField from '../../Input/MaskedInputField'
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
  textAreaSchema,
} from '../../../utils/ValidationSchemas'
import { z } from 'zod'
import MaskedDateField from '../../Input/MaskedDateField'
import { CustomCheckbox } from '../../Button/CustomCheckbox'
import SingleSelectComboBox from '../../combobox/SingleSelectComboBox'
import dynamic from 'next/dynamic'
import MultiSelectComboBox from '../../combobox/MultiSelectComboBox'
import { Option } from '../../../types/MultiselectCombobox'
import { MultiValue } from 'react-select'
import { invokeLambda } from '../../../lib/aws/invokeLambda'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useFetch from '../../../hooks/useFetch'
import axios from 'axios'
import dayjs from 'dayjs'
import formatCurrency from '../../../utils/formatCurrency'
import ProgressBar from '../../menu/ProgressBar'
import { X } from 'phosphor-react'
import TextAreaField from '../../Input/TextAreaField'
import { SocialOrganizationProps } from '../../../types/socialOrganization'
import { EditButton } from '../../Button/EditButton'
import StarFour from '../../../assets/star-four.svg'
import Image from 'next/image'
import { toast } from 'react-toastify'

interface AboutInstitutionModalProps {
  closeModal: () => void
  socialOrganization: SocialOrganizationProps
  isFilled: boolean
}
// Carregamento dinâmico do FileUpload com SSR desabilitado
const FileUpload = dynamic(() => import('../../file/FileUpload'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Estatuto ou Contrato Social
      </label>
      <div className="h-[72px] rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"></div>
    </div>
  ),
})

const steps = [
  { id: 1, label: 'Sobre a organização' },
  { id: 2, label: 'Dados descritivos' },
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
  history: textAreaSchema,
  impact: textAreaSchema,
  challenges: textAreaSchema,
})

type formProps = z.infer<typeof schema>

interface cityProps {
  id: number
  nome: string
}
interface stateProps extends cityProps {
  sigla: string
}

export const AboutInstitutionModal = ({
  closeModal,
  socialOrganization,
  isFilled,
}: AboutInstitutionModalProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isEditing, setIsEditing] = useState<boolean>(!isFilled)
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
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const queryClient = useQueryClient()

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

  const history = watch('history', '')
  const impact = watch('impact', '')
  const challenges = watch('challenges', '')

  useEffect(() => {
    const checkInput = () => {
      if (
        history.length >= 100 &&
        impact.length >= 100 &&
        challenges.length >= 100
      ) {
        setIsButtonDisabled(false)
      } else {
        setIsButtonDisabled(true)
      }
    }

    checkInput()
  }, [history, impact, challenges])

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
    try {
      const response = await invokeLambda<
        Record<string, never>,
        { statusCode: number; body: string }
      >('cause-select-lambda', {})
      return JSON.parse(response.body)
    } catch (error) {
      console.error('Erro ao buscar causas!')
      throw error
    }
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

  const backBtn = () => {
    setCurrentStep((prev) => prev - 1)
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

  const values = watch()

  useEffect(() => {
    const nomeInstituicao = values.nomeInstituicao?.trim() !== ''
    const cause = selectedOptions.length > 0
    const cnpjValido = values.cnpj?.trim() !== '' || semCnpj
    const receitaValida = values.receitaAnual?.trim() !== ''
    const dataFundacaoValida = values.dataFundacao?.trim() !== ''
    const estadoValido = selectedEstado !== null || foraDoBrasil
    const cidadeValida = selectedCidade !== null || foraDoBrasil
    const nFuncionariosValido = values.nFuncionarios?.trim() !== ''
    const nBeneficiariosValido = values.nBeneficiarios?.trim() !== ''
    const estatutoValido =
      values.estatuto !== undefined ||
      semEstatuto ||
      socialOrganization?.estatutoFileLocation !== undefined ||
      socialOrganization?.estatutoFileLocation !== null

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
    values,
    selectedOptions,
    semCnpj,
    selectedEstado,
    selectedCidade,
    foraDoBrasil,
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
        socialOrganization.creationDate !== undefined &&
          socialOrganization.creationDate !== null
          ? new Date(socialOrganization.creationDate)
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
      setValue('history', socialOrganization.history || '')
      setValue('impact', socialOrganization.socialImpact || '')
      setValue('challenges', socialOrganization.mainChallenges || '')
    }
  }, [socialOrganization])

  const uploadFile = async (
    file: File,
    key: string
  ): Promise<number | null> => {
    try {
      // Requisição da Presigned URL para upload do arquivo
      const res = await fetch('/api/get-presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          key,
        }),
      })

      if (!res.ok) throw new Error('Erro ao obter Presigned URL')

      const { uploadUrl } = await res.json()

      // Upload para S3
      const upload = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })

      if (!upload.ok) throw new Error('Erro ao enviar o arquivo para o S3')

      // Invoca Lambda para salvar metadados
      const payload = {
        bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        directoryPath: key,
        mime: file.type,
      }

      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('storage-create-lambda', payload)

      if (response.statusCode === 201) {
        const { storageId } = JSON.parse(response.body)
        return Number(storageId)
      } else {
        toast.error('Erro ao salvar metadados no storage')
        return null
      }
    } catch (err) {
      toast.error('Erro ao salvar metadados no storage')
      return null
    }
  }

  async function handleForm(data: formProps) {
    try {
      setIsLoading(true)
      const dateParts = data.dataFundacao.split('/')
      const [day, month, year] = dateParts.map((part) => parseInt(part, 10))
      const date = new Date(year, month - 1, day)

      let storageId: number | null = null
      let downloadUrl: { downloadUrl: string | null } = { downloadUrl: null }

      if (!semEstatuto) {
        if (data.estatuto) {
          const key = `social-organization/${
            socialOrganization?.id || 0
          }/statute/${data.estatuto.name}`
          storageId = await uploadFile(data.estatuto, key)
          const res = await fetch('/api/get-download-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key,
            }),
          })
          downloadUrl = await res.json()
        } else {
          storageId = socialOrganization?.storageId ?? null
          downloadUrl.downloadUrl =
            socialOrganization?.estatutoFileLocation ?? null
        }
      }
      const payload = {
        socialOrganization: {
          id: socialOrganization.id || 0,
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
          storageId: storageId ?? undefined,
          estatutoFileLocation: downloadUrl?.downloadUrl ?? undefined,
          history: data.history,
          socialImpact: data.impact,
          mainChallenges: data.challenges,
        },
      }
      const response = await invokeLambda<
        {
          socialOrganization: SocialOrganizationProps
        },
        { statusCode: number; body: string }
      >('social-organization-update-lambda', payload)
      if (response.statusCode == 201) {
        toast.success('Informações salvas com sucesso!')
        queryClient.invalidateQueries([
          'socialOrganization',
          socialOrganization.id || 0,
        ])
        closeModal()
      } else {
        toast.error('Erro ao salvar informações!')
      }
    } catch (error) {
      toast.error('Erro ao salvar informações!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="fixed left-0 top-0 z-[50] flex h-screen w-full items-center justify-center bg-black/50">
      <section className="relative flex h-[672px] w-[800px] flex-col items-center overflow-y-scroll  rounded-xl bg-white p-6 shadow-lg">
        <main
          className={`mt-[32px] flex w-full flex-col px-4 ${
            isEditing ? 'items-center' : ''
          }`}
        >
          {!isEditing ? (
            <div className="flex items-center">
              <Image
                src={StarFour}
                alt="Estrela de quatro pontas"
                className="h-[38px] w-[38px]"
              />
              <h1 className="ml-4 text-3xl font-semibold">
                {socialOrganization.name}
              </h1>
              <div className="ml-6">
                <EditButton
                  text="Editar"
                  onClick={() => setIsEditing(true)}
                  type="submit"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-8 text-gray-500 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          ) : (
            <section className="flex items-center">
              <ProgressBar
                steps={steps}
                currentStep={currentStep}
                onBack={() => (currentStep === 2 ? backBtn() : null)}
              />
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-8 text-gray-500 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
              </div>
            </section>
          )}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleForm, (formErrors) => {
              console.error('ERROS DE VALIDAÇÃO:', formErrors)
            })}
          >
            {!isEditing ? (
              <>
                <div className="p-6">
                  <div className="mt-6 grid grid-cols-1 gap-6 text-sm text-gray-800">
                    {/* Bloco 1: Dados básicos */}
                    <div className="text-left">
                      <span className="font-medium text-gray-400">
                        Nome da organização
                      </span>
                      <p className="whitespace-pre-line text-gray-800">
                        {socialOrganization.name}
                      </p>
                    </div>

                    <div className="text-left">
                      <span className="mb-1 block font-medium text-gray-400">
                        Causa(s) em que atua
                      </span>
                      <div className="flex flex-row gap-1">
                        {socialOrganization.causes.map((causa, index) => (
                          <span
                            key={index}
                            className="w-fit rounded-full border-solid border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-gray-600"
                          >
                            {causa.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Grid de 2 colunas: CNPJ, Receita, Estado, Cidade, etc */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="text-left">
                        <span className="font-medium text-gray-400">CNPJ</span>
                        <p className="whitespace-pre-line text-gray-800">
                          {socialOrganization.cnpj || ''}
                        </p>
                      </div>
                      <div className="text-left">
                        <span className="font-medium text-gray-400">
                          Receita anual
                        </span>
                        <p className="whitespace-pre-line text-gray-800">
                          {socialOrganization.annualRevenue !== undefined
                            ? formatCurrency(
                                String(socialOrganization.annualRevenue)
                              )
                            : ''}
                        </p>
                      </div>
                      <div className="text-left">
                        <span className="font-medium text-gray-400">
                          Estado
                        </span>
                        <p className="whitespace-pre-line text-gray-800">
                          {socialOrganization.state || ''}
                        </p>
                      </div>
                      <div className="text-left">
                        <span className="font-medium text-gray-400">
                          Cidade
                        </span>
                        <p className="whitespace-pre-line text-gray-800">
                          {selectedCidade?.label || ''}
                        </p>
                      </div>
                      <div className="text-left">
                        <span className="font-medium text-gray-400">
                          Nº de funcionários
                        </span>
                        <p className="whitespace-pre-line text-gray-800">
                          {socialOrganization.collaborators || ''}
                        </p>
                      </div>
                      <div className="text-left">
                        <span className="font-medium text-gray-400">
                          Nº de beneficiários
                        </span>
                        <p className="whitespace-pre-line text-gray-800">
                          {socialOrganization.beneficiaries || ''}
                        </p>
                      </div>
                    </div>

                    {/* Bloco de arquivos */}
                    <div className="text-left">
                      <span className="font-medium text-gray-400">
                        Estatuto ou Contrato Social
                      </span>
                      {socialOrganization.estatutoFileLocation ? (
                        <div>
                          <a
                            href={socialOrganization.estatutoFileLocation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-blue-600 underline"
                          >
                            Arquivo
                          </a>
                        </div>
                      ) : (
                        <p className="whitespace-pre-line text-gray-800">
                          Sem estatuto
                        </p>
                      )}
                    </div>

                    {/* Blocos de texto longo */}
                    <div className="text-left">
                      <span className="font-medium text-gray-400">
                        Escreva brevemente a história da instituição
                      </span>
                      <p className="whitespace-pre-line text-gray-800">
                        {socialOrganization.history || ''}
                      </p>
                    </div>

                    <div className="text-left">
                      <span className="font-medium text-gray-400">
                        Qual a atuação e o impacto da organização?
                      </span>
                      <p className="whitespace-pre-line text-gray-800">
                        {socialOrganization.socialImpact || ''}
                      </p>
                    </div>

                    <div className="text-left">
                      <span className="font-medium text-gray-400">
                        Quais são as principais necessidades e desafios que a
                        sua organização enfrenta no momento?
                      </span>
                      <p className="whitespace-pre-line text-gray-800">
                        {socialOrganization.mainChallenges || ''}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {currentStep === 1 && (
                  <div className="w-[736px] p-6">
                    <InputField
                      label="Nome da organização"
                      name="nomeInstituicao"
                      placeholder="Ex: Amigos da Cosmos"
                      register={register}
                      error={errors.nomeInstituicao?.message}
                    />
                    <br />

                    <MultiSelectComboBox
                      options={causes}
                      maxSelections={3}
                      value={selectedOptions}
                      onChange={handleChange}
                      label="Causa(s) em que atua (até 3)"
                    />

                    <div className="mb-4 mt-4 flex gap-4">
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
                    <div className="mb-2 mt-[-25px] flex items-center">
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

                    <div className="mb-4 mt-4 flex gap-4">
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

                    <div className="mb-2 mt-[-25px] flex items-center">
                      <CustomCheckbox
                        checked={foraDoBrasil}
                        setChecked={handleForaDoBrasilChange}
                        labelText="Organização localizada fora do Brasil"
                      />
                    </div>
                    <div className="mb-4 flex gap-4">
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
                        setValue('estatuto', file || undefined, {
                          shouldValidate: true,
                        })
                      }}
                      fileUrl={socialOrganization?.estatutoFileLocation}
                    />
                    <div className="mb-2 mt-[12px] flex items-center">
                      <CustomCheckbox
                        checked={semEstatuto}
                        setChecked={(value) => setSemEstatuto(value)}
                        labelText="Não possui Estatuto ou Contrato Social"
                      />
                    </div>
                    <Button
                      text="Continuar"
                      disabled={isButtonDisabled || isLoading}
                      onClick={() => setCurrentStep(2)}
                    />
                  </div>
                )}
                {currentStep === 2 && (
                  <section className="w-full">
                    <div className="flex w-full flex-col gap-3">
                      <TextAreaField
                        label="Escreva brevemente a história da instituição?"
                        name="history"
                        placeholder="Digite aqui"
                        value={history}
                        register={register}
                        error={errors.history?.message}
                      />
                      <TextAreaField
                        label="Qual a atuação e o impacto da organização?"
                        name="impact"
                        placeholder="Digite aqui"
                        value={impact}
                        register={register}
                        error={errors.impact?.message}
                      />
                      <TextAreaField
                        label="Quais são as principais necessidades e desafios que a sua organização enfrenta no momento?"
                        name="challenges"
                        value={challenges}
                        placeholder="Digite aqui"
                        register={register}
                        error={errors.challenges?.message}
                      />

                      <div className="max-w-[240px]">
                        <Button
                          text="Continuar"
                          disabled={isButtonDisabled}
                          type="submit"
                        />
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}
          </form>
        </main>
      </section>
    </section>
  )
}
