import { z } from 'zod';

export function validatePassword(password : string) {
  return z.string()
    .nonempty('O campo senha é obrigatório')
    .min(
      8,
      'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.',
    )
    .regex(
      /[A-Z]/,
      'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.',
    )
    .regex(
      /\d/,
      'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.',
    )
    .parse(password);
};
