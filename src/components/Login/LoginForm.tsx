import { Eye, EyeClosed } from "phosphor-react";
import { useState } from "react";
import { ForgetPass, Input, LoginContainer } from "./style";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { z } from "zod"

import Link from "next/link";
import { InputArea } from "./style";

const schema = z.object({
  email: z.string(),
  password: z.string()
})
type formProps = z.infer<typeof schema>

const logInTest = {
  email: "teste@gmail.com",
  password: "123456"
}

export function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false)
  const { register, handleSubmit } = useForm<formProps>()

  const SubmitForm = ({ email, password }: formProps) => {
    setIsSubmiting(true)

    if (password === "" || email === "") {
      setIsSubmiting(false)
      return toast.error("Por favor, preencha os campos de email e senha corretamente.");
    }

    if (email !== logInTest.email || password !== logInTest.password) {
      setIsSubmiting(false)
      return toast.error("Credenciais incorretas")
    }
    if (email === logInTest.email && password === logInTest.password) {
      try {
        toast.success("Logado")
        console.log({ email, password });

      } catch (error) { console.log(error) }
    }
  }

  return (
    <LoginContainer>
      <h2>Faça o seu login</h2>
      <form onSubmit={handleSubmit(SubmitForm)}>
        <Input>
          <label htmlFor="Email">Email</label>
          <div>
            <InputArea
              {...register("email")}
              id="Email"
              type="email"
              placeholder="nome@email.com.br"
            />
          </div>
        </Input>
        <Input>
          <label htmlFor="Senha">Senha</label>
          <div>
            <InputArea
              {...register("password")}
              id="Senha"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha aqui"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          </div>
          <ForgetPass>
            <Link href="/usuario/recuperar">Esqueci a minha senha</Link>
          </ForgetPass>
        </Input>

        <button type="submit" className="cBtn" disabled={isSubmiting}>
          Entrar
        </button>
      </form>

      <div>
        <h3>
          Ainda não tem uma conta?{" "}
          <strong>
            <Link href="/usuario/cadastrar">Cadastre-se</Link>
          </strong>
        </h3>
        <ToastContainer autoClose={3000} />
      </div>
    </LoginContainer>
  );
}
