import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Main from '../../../components/Main'
import { InputEmail } from '../../../components/Input/InputEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../../services/api'
import { setCookie } from 'nookies'
import Router, { useRouter } from 'next/router'
import { InputPassword } from '../../../components/Input/InputPassword'
import { emailSchema, passwordSchema } from '../../../utils/validationSchemas'
import { PageTitle } from '../../../components/TitlesAndLinks/PageTitles'
import { LoginLink } from '../../../components/TitlesAndLinks/LinkLogin'
import { Button } from '../../../components/Button/ButtonSubmit'
import Link from 'next/link'
import { useState } from 'react'

const schema = z.object({
    email: emailSchema,
    password: passwordSchema
});

type formProps = z.infer<typeof schema>

export default function RegisterInstituition() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<formProps>({ resolver: zodResolver(schema) })

    const [isLoading, setIsLoading] = useState(false)

    const email = watch('email', '');
    const password = watch('password', '');

    const isDisabled = !email || !password || isLoading

    async function handleForm(data: formProps) {
        setIsLoading(true);
        // try {
        //     await api
        //         .post('/auth/signup', {
        //             email: data.email,
        //             password: data.password,
        //         })
        //         .then((res) => {
        //             if (res.status === 201) {
        //                 setCookie(undefined, 'cosmos.user', data.email, {
        //                     maxAge: 60 * 60 * 12,
        //                 })
        toast.success('Criado com sucesso!')
        Router.push({
            pathname: '/institutions/onboarding/verifyEmail',
            query: { email: data.email, password: data.password }
        })
        //         })
        // } catch (error: any) {
        //     if (error.response.status === 400) {
        //         return toast.error(
        //             'Não foi possivel criar sua conta, pois este email já existe',
        //         )
        //     }
        //     if (error.response.status === 404 || error.response.status === 500) {
        //         return toast.error(
        //             'Não foi possivel criar sua conta, por favor tente novamente',
        //         )
        //     } 
        // } finally {
        setIsLoading(false);
    }
    //}

    return (
        <div>
            <div className="flex h-screen">
                <Main />
                <main className="flex w-full flex-col items-center justify-center gap-2">
                    <PageTitle text='Crie sua conta gratuito'></PageTitle>
                    <form
                        onSubmit={handleSubmit(handleForm)}
                        className="mt-4 flex w-1/2 flex-col gap-2"
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
                            <InputPassword id="password" label="Senha"
                                register={register}
                                error={errors.password?.message}
                                placeholder="Digite sua senha aqui"
                                helperText='A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula e 1 número' />
                        </div>
                        <Button text='Criar Conta'
                            disabled={isDisabled}
                            type="submit" isLoading={true}>
                        </Button>

                        <p className="text-xs text-gray-800 text-center mt-[20px]" >
                            Ao clicar em "Criar conta", você aceita os <Link href="#" className="font-semibold" style={{ color: "#0890F7" }}>Termos e Condições</Link> e a <Link href="#" className="font-semibold" style={{ color: "#0890F7" }}>Política de Privacidade</Link> da Cosmos.
                        </p>
                    </form>
                    <LoginLink></LoginLink>
                </main>
            </div>
        </div>
    )
}
