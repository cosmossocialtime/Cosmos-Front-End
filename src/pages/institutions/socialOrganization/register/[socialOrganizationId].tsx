import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Main from '../../../../components/Main'
import { InputEmail } from '../../../../components/Input/InputEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import Router, { useRouter } from 'next/router'
import { InputPassword } from '../../../../components/Input/InputPassword'
import {
  emailSchema,
  passwordSchema,
} from '../../../../utils/ValidationSchemas'
import { PageTitle } from '../../../../components/TitlesAndLinks/PageTitles'
import { LoginLink } from '../../../../components/TitlesAndLinks/LinkLogin'
import { Button } from '../../../../components/Button/ButtonSubmit'
import Link from 'next/link'
import { useState } from 'react'
import { invokeLambda } from '../../../../lib/aws/invokeLambda'
import { saveFormData } from '../../../../utils/localStorage'
import { signupInstitutionConfirmationTemplate } from '../../../../lib/email/templates/templates'
import { sendEmail } from '../../../../lib/aws/sesSendMail'

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

type formProps = z.infer<typeof schema>

export default function RegisterInstituitionMember() {
  const router = useRouter()
  const organizationId = Number(router.query.socialOrganizationId ?? 0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formProps>({ resolver: zodResolver(schema) })

  const [isLoading, setIsLoading] = useState(false)

  const email = watch('email', '')
  const password = watch('password', '')

  const isDisabled = !email || !password || isLoading

  async function handleForm(data: formProps) {
    setIsLoading(true)
    try {
      const payload = {
        email: data.email,
        password: data.password,
        userType: 'social_organization_member',
        socialOrganizationId: organizationId,
      }

      const response = await invokeLambda<
        {
          email: string
          password: string
          userType: string
          socialOrganizationId: number
        },
        { statusCode: number; body: string }
      >('user-create-lambda', payload)

      if (response.statusCode === 201) {
        saveFormData('cosmos.user', data.email)
        const parsed = JSON.parse(response.body)
        const { subject, html } = signupInstitutionConfirmationTemplate(
          parsed.confirmationCode
        )
        sendEmail([email], subject, html)
          .then(() => {
            toast.success('Criado com sucesso!')
            Router.push({
              pathname: '/institutions/socialOrganization/register/verifyEmail',
            })
          })
          .catch(() => {
            toast.error('Não foi possivel enviar email de confirmação de conta')
          })
      }

      if (response.statusCode === 400) {
        return toast.error(
          'Não foi possivel criar sua conta, pois este email já existe'
        )
      }

      if (response.statusCode === 404 || response.statusCode === 500) {
        return toast.error(
          'Não foi possivel criar sua conta, por favor tente novamente'
        )
      }
    } catch (error: any) {
      return toast.error(
        'Não foi possivel criar sua conta, por favor tente novamente'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="flex h-screen">
        <Main />
        <main className="flex w-full flex-col items-center justify-center gap-2">
          <PageTitle text="Crie sua conta gratuita"></PageTitle>
          <form
            onSubmit={handleSubmit(handleForm)}
            className="mt-4 flex w-1/2 flex-col gap-2"
            noValidate
          >
            <InputEmail
              id="email"
              label="Email"
              register={register}
              error={errors.email?.message}
              autoFocus
              placeholder="nome@email.com.br"
            />

            <div className="mt-[20px]">
              <InputPassword
                id="password"
                label="Senha"
                register={register}
                error={errors.password?.message}
                placeholder="Digite sua senha aqui"
                helperText="A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula e 1 número"
              />
            </div>
            <Button
              text="Criar Conta"
              disabled={isDisabled}
              type="submit"
              isLoading={true}
            ></Button>

            <p className="mt-[20px] text-center text-xs text-gray-800">
              {`Ao clicar em "Criar conta", você aceita os `}
              <Link
                href="#"
                className="font-semibold"
                style={{ color: '#0890F7' }}
              >
                Termos e Condições
              </Link>{' '}
              e a{' '}
              <Link
                href="#"
                className="font-semibold"
                style={{ color: '#0890F7' }}
              >
                Política de Privacidade
              </Link>{' '}
              da Cosmos.
            </p>
          </form>
          <LoginLink></LoginLink>
        </main>
      </div>
    </div>
  )
}
