import { transform } from "html2canvas/dist/types/css/property-descriptors/transform";
import { z } from "zod";

// 🔹 Validação para Nome (transforma em Title Case)
export const nameSchema = z
  .string()
  .nonempty("O campo nome é obrigatório.")
  .min(2, "O nome deve ter pelo menos 2 letras.")
  .transform((name) =>
    name
      .trim()
      .split(" ")
      .map((word) =>
        word.length > 1
          ? word[0].toLocaleUpperCase() + word.substring(1)
          : word
      )
      .join(" ")
  );

// 🔹 Validação para Alias
export const aliasSchema = z.string().nonempty("O campo acima é obrigatório.");

// 🔹 Validação para TextArea
export const textAreaSchema = z
  .string()
  .min(1, { message: "O campo é obrigatório" })
  .min(100, { message: "O campo é obrigatório, limite mínimo de 100 caracteres" })
  .max(300, { message: "O limite de caracteres já foi atingido" })
  .transform((name) =>
    name
      .trim()
      .split(" ")
      .map((word) =>
        word.length > 1
          ? word[0].toLocaleUpperCase() + word.substring(1)
          : word
      )
      .join(" ")
  );

// 🔹 Validação para E-mail
export const emailSchema = z
  .string()
  .nonempty("O campo e-mail é obrigatório.")
  .email("O formato do e-mail está incorreto.");

// 🔹 Validação para Senha
export const passwordSchema = z
  .string()
  .nonempty("O campo senha é obrigatório.")
  .min(8, "A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula e 1 número.")
  .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula.")
  .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula.")
  .regex(/\d/, "A senha deve ter pelo menos um número.");

// 🔹 Validação para Senha e Confirmação de Senha
export const confirmPasswordSchema = z
  .string()
  .nonempty("O campo de confirmação de senha é obrigatório.");

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
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

// 🔹 Validação para Multiselect
  export const createMultiSelectSchema = (min: number = 0, max: number | null = null) =>
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
  .transform((value) => value.replace(/\D/g, "")) 
  .refine((value) => value.length === 13, {
    message: "O número deve ter exatamente 13 dígitos numéricos.",
  });

  // 🔹 Validação para CNPJ (Formato XX.XXX.XXX/XXXX-XX)
export const cnpjSchema = z
.string()
.optional()
.refine((cnpj) => {
  if (!cnpj) return true; // Se estiver vazio, é opcional
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
}, {
  message: "Formato de CNPJ inválido. Use XX.XXX.XXX/XXXX-XX",
});

// 🔹 Validação para Receita Anual (Número positivo)
export const receitaSchema = z
  .string()
  .optional()
  .refine((value) => !value || !isNaN(Number(value)) && Number(value) >= 0, {
    message: "A receita deve ser um número positivo.",
  });

  // 🔹 Validação para Data de Fundação (Não pode ser no futuro)
  export const dataFundacaoSchema = z
  .string()
  .optional()
  .refine((data) => {
    if (!data) return true;
    const inputDate = new Date(new Date(data).toLocaleString('pt-BR', { timeZone: 'UTC' }));
    const today = new Date();
    console.log(data);
    console.log(inputDate);
    console.log(today);
    return inputDate <= today;
  }, {
    message: "A data de fundação não pode estar no futuro.",
  });

// 🔹 Validação para Estado e Cidade (Devem ser preenchidos se organização for do Brasil)
export const estadoSchema = z.string().optional();
export const cidadeSchema = z.string().optional();
 
// 🔹 Validação para Número de Funcionários e Número de Beneficiários
export const numeroSchema = z
  .string()
  .optional()
  .refine((value) => !value || (!isNaN(Number(value)) && Number(value) >= 0), {
    message: "O valor deve ser um número positivo.",
  });
 
// 🔹 Validação para Upload de Arquivo (Apenas PDF, DOC, etc.)
export const fileSchema = z
  .instanceof(File)
  .refine((file) => {
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg"];
    return validTypes.includes(file.type);
  }, {
    message: "Formato inválido. Apenas PDF, DOC, DOCX ou JPG são permitidos.",
  });