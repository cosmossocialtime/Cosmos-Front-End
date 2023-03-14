import Link from "next/link";
import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeClosed } from "phosphor-react";
import * as Popover from "@radix-ui/react-popover"

import { Input, InputContent, RegisterContainer } from "./style";

const schema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
})

type formProps = z.infer<typeof schema>

export function UserRegisterForm() {

  const [isSubmiting, setIsSubmiting] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<formProps>()


  function handleForm(data: formProps) {
    setIsSubmiting(true)

    if (data.password.length <= 8) {
      setIsSubmiting(false)
      return toast.error("A senha deve ser maior que 8 caracteres")
    }
    if (!/[A-Z]/.test(data.password)) {
      setIsSubmiting(false)
      return toast.error("A senha deve conter ao menos uma letra maiscula")
    }
    if (!/\d/.test(data.password)) {
      setIsSubmiting(false)
      return toast.error("A senha deve ao menos um número")
    }

    if (data.password !== data.confirmPassword) {
      setIsSubmiting(false)
      return toast.error("As senhas devem ser iguais")
    }
    return (
      toast.success("Criado com sucesso"),
      console.log(data));

  }

  return (
    <RegisterContainer>
      <h2>Cadastro para voluntariado</h2>
      <form onSubmit={handleSubmit(handleForm)}>
        <Input>
          <label htmlFor="Nome">Nome completo</label>
          <InputContent>
            <input
              {...register("name")}
              required
              id="Nome"
              placeholder="Nome e sobrenome"
            />
          </InputContent>
        </Input>

        <Input>
          <label htmlFor="Email">Email</label>
          <InputContent>
            <input
              {...register("email")}
              required
              id="Email"
              type="email"
              placeholder="nome@email.com.br"
            />
          </InputContent>
        </Input>
        <Input>
          <div>
            <label htmlFor="Senha">Senha</label>
            <Popover.Root>
              <Popover.Trigger className="flex text-center text-xs px-2 py-1 rounded-full border-solid border border-gray-700 text-gray-700">?</Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="max-w-sm bg-gray-100 border border-solid border-purple-800 p-2 rounded-lg shadow-2xl">
                  <span>
                    A senha deve ter no minimo 8 caracteres, com pelo menos uma letra maiscula e um número.
                  </span>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
          <InputContent>
            <input
              {...register("password")}
              required
              id="Senha"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha aqui"
            />
            <button
              className="button-show-password"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          </InputContent>

        </Input>
        <Input>
          <label htmlFor="ConfirmaSenha">Confirme a senha</label>

          <InputContent>
            <input
              {...register("confirmPassword")}
              required
              id="ConfirmaSenha"
              type={showPassword1 ? "text" : "password"}
              placeholder="Digite sua senha aqui"
            />
            <button
              className="button-show-password"
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? <EyeClosed /> : <Eye />}
            </button>
          </InputContent>

        </Input>
        <button type="submit" className="cBtn" disabled={isSubmiting}>
          Criar Conta
        </button>
      </form>

      <div>
        <h3>
          Já tem conta?{" "}
          <strong>
            <Link href="/usuario/entrar">Fazer login</Link>
          </strong>
        </h3>
        <ToastContainer autoClose={2000} limit={3} />
      </div>
    </RegisterContainer>
  );
}
