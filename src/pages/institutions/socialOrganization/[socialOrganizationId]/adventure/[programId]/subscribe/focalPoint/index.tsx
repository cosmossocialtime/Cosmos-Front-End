import { useEffect, useState } from 'react'
import { Button } from '../../../../../../../../components/Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import {
  emailSchema,
  nameSchema,
  phoneSchema,
} from '../../../../../../../../utils/ValidationSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Router from 'next/router'
import InputField from '../../../../../../../../components/Input/InputField'
import MaskedInputField from '../../../../../../../../components/Input/MaskedInputField'
import { InputEmail } from '../../../../../../../../components/Input/InputEmail'
import { CustomCheckbox } from '../../../../../../../../components/Button/CustomCheckbox'
import Layout from '../../../../../../../../components/Layout'
import ProgressBar from '../../../../../../../../components/menu/ProgressBar'
import { useOnboardingInstitution } from '../../../../../../../../context/OnboardingInstituionProvider'

const steps = [
  { id: 1, label: 'Termos' },
  { id: 2, label: 'Ponto focal' },
  { id: 3, label: 'Sobre a instituição' },
  { id: 4, label: 'Dados Descritivos' },
  { id: 5, label: 'Finalização' },
]

const schema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  professionalRole: nameSchema,
  email: emailSchema,
})

type formProps = z.infer<typeof schema>

export default function FocalPoint() {
  const [useUserPlataformData, setUseUserPlataformData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(2)
  const { program, user, socialOrganization, focalPoint, changeFocalPoint } =
    useOnboardingInstitution()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (useUserPlataformData) {
      if (user !== null) {
        setValue('name', user.fullName || '', { shouldValidate: true })
        setValue('phone', user.phone || '', { shouldValidate: true })
        setValue(
          'professionalRole',
          (user.socialOrganizations &&
            user.socialOrganizations[0].professionalRole) ||
            '',
          {
            shouldValidate: true,
          }
        )
        setValue('email', user.email || '', { shouldValidate: true })
      }
    } else {
      setValue('name', '')
      setValue('phone', '')
      setValue('professionalRole', '')
      setValue('email', '')
    }
  }, [useUserPlataformData])

  useEffect(() => {
    if (focalPoint !== null) {
      if (focalPoint.usePlatformData) {
        setUseUserPlataformData(true)
      } else {
        setValue('name', focalPoint.name || '', { shouldValidate: true })
        setValue('phone', focalPoint.phone || '', { shouldValidate: true })
        setValue('professionalRole', focalPoint.professionalRole || '', {
          shouldValidate: true,
        })
        setValue('email', focalPoint.email || '', { shouldValidate: true })
      }
    }
  }, [focalPoint])

  async function handleForm(data: formProps) {
    setIsLoading(true)
    try {
      changeFocalPoint({
        name: data.name,
        phone: data.phone,
        professionalRole: data.professionalRole,
        email: data.email,
        socialOrganizationId: socialOrganization?.id || 0,
        programId: program?.id || 0,
        usePlatformData: useUserPlataformData,
      })
      Router.push(
        `/institutions/socialOrganization/${
          socialOrganization?.id || 0
        }/adventure/${program?.id || 0}/subscribe/aboutInstitution`
      )
    } catch (error) {
      toast.error('Erro ao criar conta, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="mb-4 w-[1016px]">
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onBack={() =>
            Router.push(
              `/institutions/socialOrganization/${
                socialOrganization?.id || 0
              }/adventure/${program?.id || 0}/subscribe/terms`
            )
          }
        />
      </div>

      <div className="w-[450px] p-6">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col gap-4"
          noValidate
        >
          <p className="font-inter mt-2 pt-4 text-[16px] font-normal leading-[20px] text-[#1B2031]">
            O Ponto focal da instituição é a pessoa responsável por participar
            de todo o programa.
          </p>

          <CustomCheckbox
            checked={useUserPlataformData}
            setChecked={setUseUserPlataformData}
            labelText="Usar meus dados cadastrados na plataforma"
          />

          <InputField
            label="Nome"
            name="name"
            placeholder="Ex: Maria Gomes"
            register={register}
            error={errors.name?.message}
          />

          <InputEmail
            id="email"
            label="E-mail"
            register={register}
            error={errors.email?.message}
            autoFocus
            placeholder="nome@email.com.br"
          />

          <MaskedInputField
            className={`${errors.phone ? 'border-red-500' : ''}`}
            label="Celular"
            name="phone"
            placeholder="Ex:+55 (00) 00000-0000"
            register={register}
            setValue={setValue}
            error={errors.phone?.message}
          />

          <InputField
            label="Cargo na organização"
            name="professionalRole"
            placeholder="Ex.: Analista financeiro"
            register={register}
            error={errors.professionalRole?.message}
          />

          <Button
            text={isLoading ? 'Carregando...' : 'Continuar'}
            disabled={!isValid || isLoading}
            type="submit"
            isLoading={isLoading}
          />
        </form>
      </div>
    </Layout>
  )
}
