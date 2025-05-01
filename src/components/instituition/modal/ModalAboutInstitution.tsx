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
import { z } from 'zod'

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
  return <div className="flex min-h-screen w-full flex-col"></div>
}
