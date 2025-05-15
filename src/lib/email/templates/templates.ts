export function signupConfirmationTemplate(name: string, code: string) {
  const subject = 'Confirmação de conta Cosmos',
    html = `<h1>Olá, ${name}!</h1>
        <p style="font-size: 15px">
          Obrigado por se inscrever na cosmos.
          Para confirmar sua conta é só <a href=${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}>clicar aqui</a>
        </p>`
  return { subject, html }
}

export function signupInstitutionConfirmationTemplate(code: string) {
  const subject = 'Confirmação de conta Cosmos',
    html = `<h1>Olá!</h1>
        <p style="font-size: 15px">
          Obrigado por se inscrever na cosmos.
          Para confirmar sua conta é só <a href=${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}>clicar aqui</a>
        </p>`
  return { subject, html }
}

export function resendConfirmationTemplate(code: string) {
  const subject = 'Confirmação de conta Cosmos',
    html = `<h1>Olá!</h1>
        <p style="font-size: 15px">
          Obrigado por se inscrever na Cosmos.
          Para confirmar sua conta é só <a href=${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}>clicar aqui</a>
        </p>`
  return { subject, html }
}

export function forgotPasswordTemplate(name: string, code: string) {
  const subject = 'Redefinição de Senha',
    html = `
    <h1>Olá, ${name}!</h1>
    <p style="font-size: 15px">
      Fiquei sabendo que você esqueceu sua senha.
      Não tem problema, pra recuperar sua senha é só
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset/${code}">
        clicar aqui
      </a>.
    </p>
  `
  return { subject, html }
}

export function inviteMemberTemplate(
  socialOrganizationName: string,
  socialOrganizationId: number
) {
  const subject = 'Convite Cosmos',
    html = `
    <h1>Olá!</h1>
        <p style="font-size: 15px">
          Você foi convidado a se juntar ao time da ${socialOrganizationName} na Cosmos.
          Para criar sua conta é só <a href=${process.env.NEXT_PUBLIC_APP_URL}/institutions/onboarding/register/${socialOrganizationId}>clicar aqui</a>
        </p>
  `
  return { subject, html }
}
