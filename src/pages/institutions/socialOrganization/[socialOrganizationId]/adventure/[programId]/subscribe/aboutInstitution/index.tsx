import { useEffect, useState } from 'react'
import { Button } from '../../../../../../../../components/Button/ButtonSubmit'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from '../../../../../../../../components/Input/InputField'
import MaskedInputField from '../../../../../../../../components/Input/MaskedInputField'
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
} from '../../../../../../../../utils/ValidationSchemas'
import { z } from 'zod'
import MaskedDateField from '../../../../../../../../components/Input/MaskedDateField'
import { CustomCheckbox } from '../../../../../../../../components/Input/CustomCheckbox'
import SingleSelectComboBox from '../../../../../../../../components/combobox/SingleSelectComboBox'
import MultiSelectComboBox from '../../../../../../../../components/combobox/MultiSelectComboBox'
import { Option } from '../../../../../../../../types/MultiselectCombobox'
import { MultiValue } from 'react-select'
import { useQuery } from '@tanstack/react-query'
import useFetch from '../../../../../../../../hooks/useFetch'
import axios from 'axios'
import DynamicHeader from '../../../../../../../../components/header/DynamicHeader'
import ProgressBar from '../../../../../../../../components/menu/ProgressBar'
import Router from 'next/router'
import { useOnboardingInstitution } from '../../../../../../../../context/OnboardingInstituionProvider'
import dayjs from 'dayjs'
import formatCurrency from '../../../../../../../../utils/formatCurrency'
import { toast } from 'react-toastify'
import FileUpload from '../../../../../../../../components/file/FileUpload'
import { api } from '../../../../../../../../services/api'

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
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [currentStep, setCurrentStep] = useState(3)
  const { program, socialOrganization, changeSocialOrganization } =
    useOnboardingInstitution()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { errors, isSubmitting },
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
    try {
      const response = await api.get('cause-select')
      return JSON.parse(response.data.body)
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
    setSelectedCidade(null)
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

  const handleEstatutoChange = (value: boolean) => {
    setSemEstatuto(value)

    if (!value) {
      setValue('estatuto', undefined, {
        shouldValidate: true,
      })
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
    const nomeInstituicao = watch('nomeInstituicao')?.trim() !== ''
    const cause = selectedOptions.length > 0
    const cnpjValido = watch('cnpj')?.trim() !== '' || semCnpj
    const receitaValida = watch('receitaAnual')?.trim() !== ''
    const dataFundacaoValida = watch('dataFundacao')?.trim() !== ''
    const estadoValido = selectedEstado !== null || foraDoBrasil
    const cidadeValida = selectedCidade !== null || foraDoBrasil
    const nFuncionariosValido = watch('nFuncionarios')?.trim() !== ''
    const nBeneficiariosValido = watch('nBeneficiarios')?.trim() !== ''
    const estatutoValido =
      semEstatuto ||
      watch('estatuto') !== undefined ||
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
      if (!socialOrganization.foraDoBrasil) {
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
      }
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

      const response = await api.post('storage-create', payload)

      if (response.data.statusCode === 201) {
        const { storageId } = JSON.parse(response.data.body)
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

    changeSocialOrganization({
      name: data.nomeInstituicao,
      causes: data.causes.selectedOptions,
      cnpj: data.cnpj ?? null,
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
    })
    Router.push(
      `/institutions/socialOrganization/${
        socialOrganization?.id || 0
      }/adventure/${program?.id}/subscribe/descriptiveData`
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
                `/institutions/socialOrganization/${
                  socialOrganization?.id || 0
                }/adventure/${program?.id}/subscribe/focalPoint`
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
                id="semCnpj"
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
                id="foraDoBrasil"
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
            <Controller
              control={control}
              name="estatuto"
              rules={{
                validate: (file) => {
                  if (!semEstatuto && !file) return 'Arquivo obrigatório'
                  return true
                },
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <FileUpload
                  label="Estatuto ou Contrato Social"
                  file={value}
                  onFileChange={onChange}
                  disabled={semEstatuto}
                  error={fieldState.error}
                  fileUrl={socialOrganization?.estatutoFileLocation}
                />
              )}
            />
            <div className="mb-2 mt-[12px] flex items-center">
              <CustomCheckbox
                id="semEstatuto"
                checked={semEstatuto}
                setChecked={(value) => handleEstatutoChange(value)}
                labelText="Não possui Estatuto ou Contrato Social"
              />
            </div>
            <Button
              text="Continuar"
              disabled={isButtonDisabled || isLoading || isSubmitting}
              type="submit"
            />
          </form>
        </div>
      </main>
    </div>
  )
}
