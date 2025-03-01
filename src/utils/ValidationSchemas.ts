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
export const multiSelectSchema = z.object({
  selectedOptions: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "Você precisa selecionar pelo menos 1 opção.")
    .max(3, "Você só pode selecionar até 3 opções."),
});


export const phoneSchema = z
  .string()
  //.regex(/^\+\d{2} \(\d{2}\) \d{5}-\d{4}$/, "Formato inválido. Use +12 (12) 12121-2121") // 🔹 Valida a máscara
  .transform((value) => value.replace(/\D/g, "")) // 🔹 Remove tudo que não for número
  .refine((value) => value.length === 13, {
    message: "O número deve ter exatamente 13 dígitos numéricos.",
  });