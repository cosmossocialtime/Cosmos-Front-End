import { useEffect, useState } from 'react'
import { Button } from '../../../../components/Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import {
  emailSchema,
  nameSchema,
  phoneSchema,
} from '../../../../utils/ValidationSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Router from 'next/router'
import InputField from '../../../../components/Input/InputField'
import { getFormData, saveFormData } from '../../../../utils/localStroge'
import MaskedInputField from '../../../../components/Input/MaskedInputField'
import { InputEmail } from '../../../../components/Input/InputEmail'
import { CustomCheckbox } from '../../../../components/Button/CustomCheckbox'

const schema = z.object({
  nome: nameSchema,
  celular: phoneSchema,
  cargo: nameSchema,
  email: emailSchema,
})

type formProps = z.infer<typeof schema>

interface FocalPointProps {
  nextPage: () => void
}

export function FocalPoint({ nextPage }: FocalPointProps) {
  const [acceptTerms, setAcceptTerms] = useState(false) // Checkbox da tela atual
  const [previousTermsAccepted, setPreviousTermsAccepted] = useState(false) // Checkbox da tela anterior
  const [isLoading, setIsLoading] = useState(false)

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
    const savedData = getFormData('focalPoint')

    if (
      savedData?.nameYou &&
      savedData?.phone &&
      savedData?.position &&
      savedData?.email
    ) {
      setValue('nome', savedData.nameYou)
      setValue('celular', savedData.phone)
      setValue('cargo', savedData.position)
      setValue('email', savedData.email)
    }

    const termsAccepted = getFormData('termsAccepted')
    if (termsAccepted !== null) {
      setPreviousTermsAccepted(termsAccepted === true)
    }

    if (savedData?.acceptTerms !== undefined) {
      setAcceptTerms(savedData.acceptTerms === true)
    }

    console.log('Aceite da tela anterior (termsAccepted):', termsAccepted)
    console.log('Aceite da tela atual (acceptTerms):', savedData?.acceptTerms)
  }, [setValue])

  async function handleForm(data: formProps) {
    setIsLoading(true)
    try {
      const fullData = {
        ...data,
        termsAccepted: previousTermsAccepted,
        focalPointAccepted: acceptTerms,
      }

      console.log(' Dados completos a serem salvos:', fullData)

      saveFormData('aboutYou', fullData)
      toast.success('Cadastro concluído!')
      Router.push('/institutions/onboardingProgram/aboutInstitution')
    } catch (error) {
      toast.error('Erro ao criar conta, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-[450px] p-6">
      <form onSubmit={handleSubmit(handleForm)} className="flex flex-col gap-4">
        <p className="font-inter mt-2 pt-4 text-[16px] font-normal leading-[20px] text-[#1B2031]">
          O Ponto focal da instituição é a pessoa responsável por participar de
          todo o programa.
        </p>

        <CustomCheckbox
          checked={acceptTerms}
          setChecked={setAcceptTerms}
          labelText="Usar meus dados cadastrados na plataforma"
        />

        <InputField
          label="Nome"
          name="nome"
          placeholder="Ex: Maria Gomes"
          register={register}
          error={errors.nome?.message}
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
          label="Celular"
          name="celular"
          placeholder="Ex:+55 (00) 00000-0000"
          register={register}
          setValue={setValue}
          error={errors.celular?.message}
        />
        <InputField
          label="Cargo na organização"
          name="cargo"
          placeholder="Ex.: Analista financeiro"
          register={register}
          error={errors.cargo?.message}
        />

        <Button
          onClick={nextPage}
          text={isLoading ? 'Carregando...' : 'Continuar'}
          disabled={
            !isValid || !acceptTerms || !previousTermsAccepted || isLoading
          }
          type="submit"
          isLoading={isLoading}
        />
      </form>
    </div>
  )
}
