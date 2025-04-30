import { useEffect, useState } from 'react'
import { Button } from '../../../components/Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputField from '../../../components/Input/InputField'
import MaskedInputField from '../../../components/Input/MaskedInputField'
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
  phoneSchema,
  emailSchema,
} from '../../../utils/ValidationSchemas'
// import { getFormData, saveFormData } from '../../../utils/localStroge'
import { z } from 'zod'
import MaskedDateField from '../../../components/Input/MaskedDateField'
import { CustomCheckbox } from '../../../components/Button/CustomCheckbox'
import SingleSelectComboBox from '../../../components/combobox/SingleSelectComboBox'
import FileUpload from '../../../components/file/FileUpload'
import MultiSelectComboBox from '../../../components/combobox/MultiSelectComboBox'
import { MultiValue } from 'react-select'
import { Descritives } from './Descritives'

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
  semEstatuto: z.boolean().optional(),
  foraDoBrasil: z.boolean().optional(),
  nomeResponsavel: nameSchema.optional(),
  emailResponsavel: emailSchema.optional(),
  celularResponsavel: phoneSchema.optional(),
  cargoResponsavel: nameSchema.optional(),
})

interface Option {
  value: string
  label: string
}

type formProps = z.infer<typeof schema>

interface AboutInstitutionModalProps {
  currentStep: number
  continueBtn: () => void
  backBtn: () => void
}

export const AboutInstitutionModal = ({
  currentStep,
  // backBtn,
  continueBtn,
}: AboutInstitutionModalProps) => {
  const [semCnpj, setSemCnpj] = useState(false)
  const [semEstatuto, setSemEstatuto] = useState(false)
  const [foraDoBrasil, setForaDoBrasil] = useState(false)
  const [selectedEstado, setSelectedEstado] = useState<Option | null>(null)
  const [selectedCidade, setSelectedCidade] = useState<Option | null>(null)
  const [cidades, setCidades] = useState<Option[]>([])
  // const [selectedFile] = useState<File | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(
    [] as MultiValue<Option>
  )
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  // const [isLoading, setIsLoading] = useState(false)

  const estados: Option[] = [
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'ba', label: 'Bahia' },
  ]

  const cidadesPorEstado: Record<string, Option[]> = {
    sp: [
      { value: 'sao_paulo', label: 'São Paulo' },
      { value: 'campinas', label: 'Campinas' },
    ],
    rj: [
      { value: 'rio', label: 'Rio de Janeiro' },
      { value: 'niteroi', label: 'Niterói' },
    ],
    mg: [
      { value: 'bh', label: 'Belo Horizonte' },
      { value: 'uberlandia', label: 'Uberlândia' },
    ],
    ba: [
      { value: 'salvador', label: 'Salvador' },
      { value: 'feira', label: 'Feira de Santana' },
    ],
  }

  const handleEstadoChange = (selected: Option | null) => {
    setSelectedEstado(selected)
    setSelectedCidade(null)
    setValue('estado', selected?.value || '', { shouldValidate: true })

    if (selected) {
      setForaDoBrasil(false)
      setValue('foraDoBrasil', false)
    }

    setCidades(
      selected
        ? cidadesPorEstado[selected.value as keyof typeof cidadesPorEstado] ||
            []
        : []
    )
  }

  const handleCidadeChange = (selected: Option | null) => {
    setSelectedCidade(selected)
    setValue('cidade', selected?.value || '', { shouldValidate: true })

    if (selected) {
      setForaDoBrasil(false)
      setValue('foraDoBrasil', false)
    }
  }

  const handleSemCnpjChange = (value: boolean) => {
    setSemCnpj(value)
    setValue('semCnpj', value, { shouldValidate: true })

    if (value) {
      setValue('cnpj', '')
    }
  }

  const handleForaDoBrasilChange = (value: boolean) => {
    setForaDoBrasil(value)
    setValue('foraDoBrasil', value, { shouldValidate: true })

    if (value) {
      setSelectedEstado(null)
      setSelectedCidade(null)
      setValue('estado', 'Selecione')
      setValue('cidade', 'Selecione')
      setCidades([])
    }
  }
  // const handleSemEstatutoChange = (value: boolean) => {
  //   setForaDoBrasil(value)
  //   setValue('foraDoBrasil', value, { shouldValidate: true })

  //   if (value) {
  //     setSelectedEstado(null)
  //     setSelectedCidade(null)
  //     setValue('estado', 'Selecione')
  //     setValue('cidade', 'Selecione')
  //     setCidades([])
  //   }
  // }

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected)
    setValue(
      'cause',
      { selectedOptions: [...selected] },
      { shouldValidate: true }
    )

    if (selected.length === 0) {
      setError('cause', {
        type: 'manual',
        message: 'Você precisa selecionar pelo menos 1 opção.',
      })
    } else {
      clearErrors('cause')
    }
  }

  //   const [previousTermsAccepted, setPreviousTermsAccepted] = useState(false)
  //   const [acceptTerms, setAcceptTerms] = useState(false)

  // MINITORAMENTOS INPUTS E SELECTS
  const instituitionNameW = watch('nomeInstituicao')
  const causesW = watch('cause')
  const cnpjW = watch('cnpj')
  const receitaW = watch('receitaAnual')
  const dateW = watch('dataFundacao')
  const estadoW = watch('estado')
  const cidadeW = watch('cidade')
  const checkNoCnpf = watch('semCnpj')
  const numeroFuncW = watch('nFuncionarios')
  const numeroBeneW = watch('nBeneficiarios')
  const checkForaBrasil = watch('foraDoBrasil')
  const estatutoW = watch('estatuto')
  const checkEstatuto = watch('semEstatuto')

  useEffect(() => {
    console.log(
      `Nome da instituição: ${instituitionNameW} | Causas: ${causesW?.selectedOptions.map(
        (v) => v.value
      )} | CNPJ: ${cnpjW} | Receita Anual: ${receitaW} | Data de fundação: ${dateW} | Estado: ${estadoW} | Cidade: ${cidadeW} | Contém Cnpj: ${checkNoCnpf} | Qtd. de Funcionários: ${numeroFuncW} | Qtd. de Beneficiários: ${numeroBeneW} | Fora do Brasil: ${checkForaBrasil} | Estatuto: ${estatutoW} | Contém Estatuto: ${checkEstatuto}`
    )

    const checkButton = () => {
      if (
        instituitionNameW &&
        causesW?.selectedOptions.length > 0 &&
        (cnpjW || checkNoCnpf) &&
        receitaW &&
        dateW &&
        (estadoW || checkForaBrasil) &&
        (cidadeW || checkForaBrasil) &&
        numeroFuncW &&
        numeroBeneW &&
        (estatutoW || semEstatuto)
      ) {
        setIsButtonDisabled(false)
      } else {
        setIsButtonDisabled(true)
      }
    }

    checkButton()
  }, [
    instituitionNameW,
    semEstatuto,
    causesW,
    cnpjW,
    receitaW,
    dateW,
    estadoW,
    cidadeW,
    checkForaBrasil,
    numeroBeneW,
    numeroFuncW,
    checkNoCnpf,
    estatutoW,
    checkEstatuto,
  ])

  async function handleForm(data: formProps) {
    console.log(data)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="mt-[32px] flex w-full flex-col items-center px-4">
        {currentStep === 1 && (
          <div className="w-[450px] p-6">
            <form
              onSubmit={handleSubmit(handleForm)}
              className="flex flex-col gap-4"
            >
              <InputField
                label="Nome da organização"
                name="nomeInstituicao"
                placeholder="Ex: Amigos da Cosmos"
                register={register}
                error={errors.nomeInstituicao?.message}
              />

              <MultiSelectComboBox
                options={options}
                maxSelections={3}
                onChange={handleChange}
                label="Causa(s) em que atua (até 3)"
              />

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

                <InputField
                  label="Receita Anual"
                  name="receitaAnual"
                  placeholder="R$ 0,00"
                  register={register}
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
                  if (file) {
                    setValue('estatuto', file, { shouldValidate: true })
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
                onClick={continueBtn}
              />
            </form>
          </div>
        )}

        {currentStep === 2 && <Descritives />}
      </main>
    </div>
  )
}
