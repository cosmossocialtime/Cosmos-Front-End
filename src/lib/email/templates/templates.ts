export function signupConfirmationTemplate(name: string, code: string) {
  const subject = 'Confirme seu cadastro na Cosmos 🚀',
    html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Boas-vindas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
    />
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <style>
    body {
        font-family: 'Inter';
    }
</style>
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <tr>
        <td align="center">
          <img src="https://cosmos-social-ong-volunteer-bucket.s3.us-east-1.amazonaws.com/cosmos-images/mail_header.png"
     alt="Header Cosmos"
     width="600"
     style="display: block; width: 100%; max-width: 600px; height: auto;" />
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 40px 20px 40px; color: #1F103F;">
          <h2 style="margin-top: 0;">Olá ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Boas-vindas à Cosmos! Estamos muito felizes que você está a um passo de fazer parte desta jornada de impacto social.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Para garantir a segurança da sua conta, por favor, finalize o seu cadastro clicando no botão abaixo:
          </p>

          <!-- Botão -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
            <tr>
              <td align="center" bgcolor="#7C3AED" style="border-radius: 8px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}"
                   target="_blank"
                   style="display: inline-block;
                          padding: 14px 32px;
                          font-size: 16px;
                          font-weight: bold;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          background-color: #7C3AED;">
                  Finalizar cadastro
                </a>
              </td>
            </tr>
          </table>

          <p style="font-size: 16px; line-height: 1.6;">
            Caso o botão não funcione, copie e cole o link a seguir no seu navegador:<br />
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}" style="color: #7C3AED;">[Link de Confirmação]</a>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Com a sua ajuda, vamos ampliar o impacto social, apoiando a sustentabilidade de ONGs para que elas possam brilhar ainda mais.
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Qualquer dúvida, estamos aqui para ajudar!
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Saudações do Controle da Missão,<br />
			Equipe Cosmos 🌌
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding: 24px;">
          <a href="https://www.linkedin.com/company/cosmos-social" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-linkedin-logo"></i></a>
          <a href="https://instagram.com/social.cosmos" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://www.cosmossocial.com.br" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-globe-simple"></i></a>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#1F103F" style="padding: 24px;">
          <p style="margin-top: 16px; font-size: 10px; color: #ccc;">
            © 2025 Cosmos Social. Todos os direitos reservados.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
  return { subject, html }
}

export function signupInstitutionConfirmationTemplate(code: string) {
  const subject =
      'Confirme seu cadastro na Cosmos e comece sua jornada de impacto 🌟',
    html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Boas-vindas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
    />
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <style>
    body {
        font-family: 'Inter';
    }
</style>
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <tr>
        <td align="center">
          <img src="https://cosmos-social-ong-volunteer-bucket.s3.us-east-1.amazonaws.com/cosmos-images/mail_header.png"
     alt="Header Cosmos"
     width="600"
     style="display: block; width: 100%; max-width: 600px; height: auto;" />
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 40px 20px 40px; color: #1F103F;">
          <h2 style="margin-top: 0;">Olá!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Boas-vindas à Cosmos! Estamos empolgados em ter sua organização conosco, unindo forças para fortalecer o impacto social.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Para garantir a segurança da sua conta, por favor, finalize o seu cadastro clicando no botão abaixo:
          </p>

          <!-- Botão -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
            <tr>
              <td align="center" bgcolor="#7C3AED" style="border-radius: 8px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}"
                   target="_blank"
                   style="display: inline-block;
                          padding: 14px 32px;
                          font-size: 16px;
                          font-weight: bold;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          background-color: #7C3AED;">
                  Finalizar cadastro
                </a>
              </td>
            </tr>
          </table>

          <p style="font-size: 16px; line-height: 1.6;">
            Caso o botão não funcione, copie e cole o link a seguir no seu navegador:<br />
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}" style="color: #7C3AED;">[Link de Confirmação]</a>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Estamos aqui para apoiar a sustentabilidade de organizações como a sua, criando um ambiente onde ONGs possam brilhar e transformar ainda mais vidas.
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Saudações do Controle da Missão,<br />
			Equipe Cosmos 🌌
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding: 24px;">
          <a href="https://www.linkedin.com/company/cosmos-social" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-linkedin-logo"></i></a>
          <a href="https://instagram.com/social.cosmos" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://www.cosmossocial.com.br" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-globe-simple"></i></a>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#1F103F" style="padding: 24px;">
          <p style="margin-top: 16px; font-size: 10px; color: #ccc;">
            © 2025 Cosmos Social. Todos os direitos reservados.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
  return { subject, html }
}

export function resendConfirmationTemplate(code: string) {
  const subject = 'Confirme seu cadastro na Cosmos 🚀',
    html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Boas-vindas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
    />
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <style>
    body {
        font-family: 'Inter';
    }
</style>
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <tr>
        <td align="center">
          <img src="https://cosmos-social-ong-volunteer-bucket.s3.us-east-1.amazonaws.com/cosmos-images/mail_header.png"
     alt="Header Cosmos"
     width="600"
     style="display: block; width: 100%; max-width: 600px; height: auto;" />
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 40px 20px 40px; color: #1F103F;">
          <h2 style="margin-top: 0;">Olá!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Boas-vindas à Cosmos! Estamos muito felizes que você está a um passo de fazer parte desta jornada de impacto social.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Para garantir a segurança da sua conta, por favor, finalize o seu cadastro clicando no botão abaixo:
          </p>

          <!-- Botão -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
            <tr>
              <td align="center" bgcolor="#7C3AED" style="border-radius: 8px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}"
                   target="_blank"
                   style="display: inline-block;
                          padding: 14px 32px;
                          font-size: 16px;
                          font-weight: bold;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          background-color: #7C3AED;">
                  Finalizar cadastro
                </a>
              </td>
            </tr>
          </table>

          <p style="font-size: 16px; line-height: 1.6;">
            Caso o botão não funcione, copie e cole o link a seguir no seu navegador:<br />
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}" style="color: #7C3AED;">[Link de Confirmação]</a>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Com a sua ajuda, vamos ampliar o impacto social, apoiando a sustentabilidade de ONGs para que elas possam brilhar ainda mais.
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Qualquer dúvida, estamos aqui para ajudar!
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Saudações do Controle da Missão,<br />
			Equipe Cosmos 🌌
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding: 24px;">
          <a href="https://www.linkedin.com/company/cosmos-social" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-linkedin-logo"></i></a>
          <a href="https://instagram.com/social.cosmos" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://www.cosmossocial.com.br" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-globe-simple"></i></a>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#1F103F" style="padding: 24px;">
          <p style="margin-top: 16px; font-size: 10px; color: #ccc;">
            © 2025 Cosmos Social. Todos os direitos reservados.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
  return { subject, html }
}

export function resendInstitutionConfirmationTemplate(code: string) {
  const subject =
      'Confirme seu cadastro na Cosmos e comece sua jornada de impacto 🌟',
    html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Boas-vindas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
    />
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <style>
    body {
        font-family: 'Inter';
    }
</style>
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <tr>
        <td align="center">
          <img src="https://cosmos-social-ong-volunteer-bucket.s3.us-east-1.amazonaws.com/cosmos-images/mail_header.png"
     alt="Header Cosmos"
     width="600"
     style="display: block; width: 100%; max-width: 600px; height: auto;" />
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 40px 20px 40px; color: #1F103F;">
          <h2 style="margin-top: 0;">Olá!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Boas-vindas à Cosmos! Estamos empolgados em ter sua organização conosco, unindo forças para fortalecer o impacto social.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Para garantir a segurança da sua conta, por favor, finalize o seu cadastro clicando no botão abaixo:
          </p>

          <!-- Botão -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
            <tr>
              <td align="center" bgcolor="#7C3AED" style="border-radius: 8px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}"
                   target="_blank"
                   style="display: inline-block;
                          padding: 14px 32px;
                          font-size: 16px;
                          font-weight: bold;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          background-color: #7C3AED;">
                  Finalizar cadastro
                </a>
              </td>
            </tr>
          </table>

          <p style="font-size: 16px; line-height: 1.6;">
            Caso o botão não funcione, copie e cole o link a seguir no seu navegador:<br />
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${code}" style="color: #7C3AED;">[Link de Confirmação]</a>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Estamos aqui para apoiar a sustentabilidade de organizações como a sua, criando um ambiente onde ONGs possam brilhar e transformar ainda mais vidas.
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Saudações do Controle da Missão,<br />
			Equipe Cosmos 🌌
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding: 24px;">
          <a href="https://www.linkedin.com/company/cosmos-social" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-linkedin-logo"></i></a>
          <a href="https://instagram.com/social.cosmos" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://www.cosmossocial.com.br" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-globe-simple"></i></a>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#1F103F" style="padding: 24px;">
          <p style="margin-top: 16px; font-size: 10px; color: #ccc;">
            © 2025 Cosmos Social. Todos os direitos reservados.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
  return { subject, html }
}

export function forgotPasswordTemplate(
  name: string,
  code: string,
  role: string
) {
  const subject = 'Redefinição de senha na Cosmos 🌌'
  if (role === 'volunteer') {
    const html = `
    <!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Boas-vindas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
    />
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <style>
    body {
        font-family: 'Inter';
    }
</style>
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <tr>
        <td align="center">
          <img src="https://cosmos-social-ong-volunteer-bucket.s3.us-east-1.amazonaws.com/cosmos-images/mail_header.png"
     alt="Header Cosmos"
     width="600"
     style="display: block; width: 100%; max-width: 600px; height: auto;" />
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 40px 20px 40px; color: #1F103F;">
          <h2 style="margin-top: 0;">Olá ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Recebemos uma solicitação para redefinir a senha da sua conta na Cosmos. Caso tenha sido você, basta clicar no botão abaixo para criar uma nova senha:
          </p>

          <!-- Botão -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
            <tr>
              <td align="center" bgcolor="#7C3AED" style="border-radius: 8px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset/${code}"
                   target="_blank"
                   style="display: inline-block;
                          padding: 14px 32px;
                          font-size: 16px;
                          font-weight: bold;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          background-color: #7C3AED;">
                  Redefinir Senha
                </a>
              </td>
            </tr>
          </table>

          <p style="font-size: 16px; line-height: 1.6;">
            Se o botão não funcionar, copie e cole o link a seguir no seu navegador:<br />
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset/${code}" style="color: #7C3AED;">[Link de Confirmação]</a>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Caso você não tenha solicitado a alteração, não se preocupe. Sua conta está segura, e nenhuma mudança foi feita.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
          	Se precisar de qualquer ajuda, estamos aqui por você!
		</p>

          <p style="font-size: 16px; line-height: 1.6;">
            Saudações do Controle da Missão,<br />
			Equipe Cosmos 🌌
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding: 24px;">
          <a href="https://www.linkedin.com/company/cosmos-social" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-linkedin-logo"></i></a>
          <a href="https://instagram.com/social.cosmos" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://www.cosmossocial.com.br" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-globe-simple"></i></a>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#1F103F" style="padding: 24px;">
          <p style="margin-top: 16px; font-size: 10px; color: #ccc;">
            © 2025 Cosmos Social. Todos os direitos reservados.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
  `
    return { subject, html }
  } else {
    const html = `
    <!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Boas-vindas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
    />
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <style>
    body {
        font-family: 'Inter';
    }
</style>
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <tr>
        <td align="center">
          <img src="https://cosmos-social-ong-volunteer-bucket.s3.us-east-1.amazonaws.com/cosmos-images/mail_header.png"
     alt="Header Cosmos"
     width="600"
     style="display: block; width: 100%; max-width: 600px; height: auto;" />
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 40px 20px 40px; color: #1F103F;">
          <h2 style="margin-top: 0;">Olá ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Recebemos uma solicitação para redefinir a senha da sua conta na Cosmos. Se foi você quem fez o pedido, clique no botão abaixo para criar uma nova senha:
          </p>

          <!-- Botão -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
            <tr>
              <td align="center" bgcolor="#7C3AED" style="border-radius: 8px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset/${code}"
                   target="_blank"
                   style="display: inline-block;
                          padding: 14px 32px;
                          font-size: 16px;
                          font-weight: bold;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          background-color: #7C3AED;">
                  Redefinir Senha
                </a>
              </td>
            </tr>
          </table>

          <p style="font-size: 16px; line-height: 1.6;">
            Caso o botão não funcione, copie e cole o link a seguir no seu navegador:<br />
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset/${code}" style="color: #7C3AED;">[Link de Confirmação]</a>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Caso você não tenha solicitado a alteração, não se preocupe. Sua conta está segura, e nenhuma mudança foi feita.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
          	Se precisar de qualquer ajuda, estamos aqui por você!
		</p>

          <p style="font-size: 16px; line-height: 1.6;">
            Saudações do Controle da Missão,<br />
			Equipe Cosmos 🌌
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding: 24px;">
          <a href="https://www.linkedin.com/company/cosmos-social" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-linkedin-logo"></i></a>
          <a href="https://instagram.com/social.cosmos" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://www.cosmossocial.com.br" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-globe-simple"></i></a>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#1F103F" style="padding: 24px;">
          <p style="margin-top: 16px; font-size: 10px; color: #ccc;">
            © 2025 Cosmos Social. Todos os direitos reservados.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
  `
    return { subject, html }
  }
}

export function inviteMemberTemplate(
  socialOrganizationName: string,
  socialOrganizationId: number,
  requestMemberName: string
) {
  const subject = 'Convite Cosmos',
    html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Boas-vindas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
    />
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
  <style>
    body {
        font-family: 'Inter';
    }
</style>
    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <tr>
        <td align="center">
          <img src="https://cosmos-social-ong-volunteer-bucket.s3.us-east-1.amazonaws.com/cosmos-images/mail_header.png"
     alt="Header Cosmos"
     width="600"
     style="display: block; width: 100%; max-width: 600px; height: auto;" />
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 40px 20px 40px; color: #1F103F;">
          <h2 style="margin-top: 0;">Olá!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Você recebeu um convite de ${requestMemberName} para se juntar ao time da(o) ${socialOrganizationName} na Cosmos!

          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Para aceitar o convite, clique no botão abaixo:
          </p>

          <!-- Botão -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
            <tr>
              <td align="center" bgcolor="#7C3AED" style="border-radius: 8px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/institutions/socialOrganization/register/${socialOrganizationId}"
                   target="_blank"
                   style="display: inline-block;
                          padding: 14px 32px;
                          font-size: 16px;
                          font-weight: bold;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          background-color: #7C3AED;">
                  Finalizar cadastro
                </a>
              </td>
            </tr>
          </table>

          <p style="font-size: 16px; line-height: 1.6;">
            Se o botão não funcionar, copie e cole o link a seguir no seu navegador:<br />
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/institutions/socialOrganization/register/${socialOrganizationId}" style="color: #7C3AED;">[Link de Confirmação]</a>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Estamos empolgados em ter você conosco nesta jornada para fortalecer o impacto social. Se precisar de ajuda, estamos à disposição!
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Saudações do Controle da Missão,<br />
			Equipe Cosmos 🌌
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding: 24px;">
          <a href="https://www.linkedin.com/company/cosmos-social" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-linkedin-logo"></i></a>
          <a href="https://instagram.com/social.cosmos" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-instagram-logo"></i></a>
          <a href="https://www.cosmossocial.com.br" style="margin: 0 8px; text-decoration:none; font-size:24px; display: inline-block; color:#42A5F5;"><i class="ph ph-globe-simple"></i></a>
        </td>
      </tr>
      <tr>
        <td align="center" bgcolor="#1F103F" style="padding: 24px;">
          <p style="margin-top: 16px; font-size: 10px; color: #ccc;">
            © 2025 Cosmos Social. Todos os direitos reservados.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
  `
  return { subject, html }
}
