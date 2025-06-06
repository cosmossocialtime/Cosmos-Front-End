import { z } from 'zod'

// 🔹 Validação para Nome (transforma em Title Case)
export const nameSchema = z
  .string()
  .nonempty('O campo nome é obrigatório.')
  .min(2, 'O nome deve ter pelo menos 2 letras.')
  .transform((name) =>
    name
      .trim()
      .split(' ')
      .map((word) =>
        word.length > 1 ? word[0].toLocaleUpperCase() + word.substring(1) : word
      )
      .join(' ')
  )

// 🔹 Validação para Alias
export const aliasSchema = z.string().nonempty('O campo acima é obrigatório.')

// 🔹 Validação para TextArea
export const textAreaSchema = z
  .string()
  .min(1, { message: 'O campo é obrigatório' })
  .min(100, {
    message: 'O campo é obrigatório, limite mínimo de 100 caracteres',
  })
  .max(300, { message: 'O limite de caracteres já foi atingido' })
  .transform((name) =>
    name
      .trim()
      .split(' ')
      .map((word) =>
        word.length > 1 ? word[0].toLocaleUpperCase() + word.substring(1) : word
      )
      .join(' ')
  )

// 🔹 Validação para TextArea
export const textAreaFeedbackSchema = z
  .string()
  .min(1, { message: 'O campo é obrigatório' })
  .max(2500, { message: 'O limite de caracteres já foi atingido' })
  .transform((name) =>
    name
      .trim()
      .split(' ')
      .map((word) =>
        word.length > 1 ? word[0].toLocaleUpperCase() + word.substring(1) : word
      )
      .join(' ')
  )

// 🔹 Validação para E-mail
export const emailSchema = z
  .string()
  .nonempty('O campo e-mail é obrigatório.')
  .email('O formato do e-mail está incorreto.')

// 🔹 Validação para Senha
export const passwordSchema = z
  .string()
  .nonempty('O campo senha é obrigatório.')
  .min(
    8,
    'A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula e 1 número.'
  )
  .regex(/[A-Z]/, 'A senha deve ter pelo menos uma letra maiúscula.')
  .regex(/[a-z]/, 'A senha deve ter pelo menos uma letra minúscula.')
  .regex(/\d/, 'A senha deve ter pelo menos um número.')

// 🔹 Validação para Senha e Confirmação de Senha
export const confirmPasswordSchema = z
  .string()
  .nonempty('O campo de confirmação de senha é obrigatório.')

// 🔹 Validação para Formulário de Cadastro
export const registerSchema = z
  .object({
    name: nameSchema,
    alias: aliasSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: 'As senhas não são iguais',
    path: ['confirmPassword'],
  })

// 🔹 Validação para Multiselect
export const createMultiSelectSchema = (min = 0, max: number | null = null) =>
  z.object({
    selectedOptions: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .min(min, `Você precisa selecionar pelo menos ${min} opção(ões).`)
      .refine((options) => max === null || options.length <= max, {
        message: `Você só pode selecionar até ${max} opção(ões).`,
      }),
  })

// 🔹 Validação para telefone
export const phoneSchema = z
  .string()
  .transform((value) => value.replace(/\D/g, ''))
  .refine((value) => value.length === 13, {
    message: 'O número deve ter exatamente 13 dígitos numéricos.',
  })

// 🔹 Validação para CNPJ (Formato XX.XXX.XXX/XXXX-XX)
export const cnpjSchema = z
  .string()
  .optional()
  .refine(
    (cnpj) => {
      if (!cnpj) return true // Se estiver vazio, é opcional
      return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj)
    },
    {
      message: 'Formato de CNPJ inválido. Use XX.XXX.XXX/XXXX-XX',
    }
  )

// 🔹 Validação para Receita Anual (Número positivo)
export const receitaSchema = z
  .string()
  .optional()
  .transform((val) => {
    if (!val) return undefined

    // Remove "R$", espaços, e converte vírgula para ponto
    const cleaned = val
      .replace(/\s/g, '') // remove espaços
      .replace('R$', '') // remove símbolo de moeda
      .replace(/\./g, '') // remove pontos de milhar
      .replace(',', '.') // troca vírgula decimal por ponto

    return cleaned
  })
  .refine(
    (val) => val === undefined || (!isNaN(Number(val)) && Number(val) >= 0),
    {
      message: 'A receita deve ser um número positivo.',
    }
  )

// 🔹 Validação para Data de Fundação (Não pode ser no futuro)
export const dataFundacaoSchema = z.string().superRefine((data, ctx) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  const match = data.match(regex)

  if (!match) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A data deve estar no formato dd/mm/aaaa.',
    })
    return
  }

  const [_, dia, mes, ano] = match
  const day = parseInt(dia, 10)
  const month = parseInt(mes, 10)
  const year = parseInt(ano, 10)

  if (year < 1800) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'O ano deve ser igual ou maior que 1800.',
    })
    return
  }

  const tempDate = new Date(year, month - 1, day)
  if (
    tempDate.getFullYear() !== year ||
    tempDate.getMonth() + 1 !== month ||
    tempDate.getDate() !== day
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A data informada é inválida.',
    })
    return
  }

  const inputDate = new Date(Date.UTC(year, month - 1, day))
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (inputDate > today) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A data de fundação não pode estar no futuro.',
    })
  }
})

// 🔹 Validação para Estado e Cidade (Devem ser preenchidos se organização for do Brasil)
export const estadoSchema = z.string().optional()
export const cidadeSchema = z.string().optional()

// 🔹 Validação para Número de Funcionários e Número de Beneficiários
export const numeroSchema = z
  .string()
  .optional()
  .refine((value) => !value || (!isNaN(Number(value)) && Number(value) >= 0), {
    message: 'O valor deve ser um número positivo.',
  })

// 🔹 Validação para Upload de Arquivo (Apenas PDF, DOC, etc.)
export const fileSchema = z.preprocess(
  (file) => {
    // No servidor, retorna undefined para evitar erros
    if (typeof window === 'undefined') return undefined
    return file instanceof File ? file : undefined
  },
  z
    .any()
    .refine(
      (file) => {
        // Validação só ocorre no client-side
        if (typeof window === 'undefined') return true
        return file instanceof File && file.size > 0
      },
      {
        message: 'Arquivo vazio. Selecione um arquivo válido.',
      }
    )
    .refine(
      (file) => {
        if (typeof window === 'undefined') return true
        return file instanceof File && file.size <= 10 * 1024 * 1024
      },
      {
        message: 'O arquivo deve ser menor que 10MB',
      }
    )
    .refine(
      (file) => {
        if (typeof window === 'undefined') return true
        const validTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpeg',
          'image/jpg',
          'image/png',
        ]
        return file instanceof File && validTypes.includes(file.type)
      },
      {
        message:
          'Formato inválido. Apenas PDF, DOC, DOCX, PNG ou JPG são permitidos.',
      }
    )
    .optional()
)
