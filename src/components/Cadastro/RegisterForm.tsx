import { Eye, EyeClosed } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Input, RegisterContainer } from "./style";
import { ToastContainer, toast } from 'react-toastify';
import AccessService  from "../../services/AccessService";
import styled from "styled-components";
import Link from "next/link";

export function UserRegisterForm(){

  const [ID, setID] = useState(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [user, setUser] = useState([]);
  // const navigate = useNavigate();

  const initialState = {
    username: nome,
    account: email,
    password: senha,
    password2: confirmaSenha,
    token: "",
    action:""
  };

  const SubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (senha === confirmaSenha) {
      AccessService.Create(initialState).then((response:any) =>{
      if(!response.data.type.includes('error'))
      {
        // navigate('/usuario/cadastro-email');
      }
      else{
        toast.error(response.data.text);
      }
      }).catch((e: Error) => {
        toast.error("Ops...não foi processar sua requisição, tente novamente mais tarde.");
      });
    }
    else{
      const data = {type: 'error', text: 'Senhas não coincidem"'};
      toast.error(data.text);
    }
  }

  return (
    <RegisterContainer>
      <h2>Cadastro para voluntariado</h2>
      <form onSubmit={SubmitForm}>
        <Input>
          <label htmlFor="Nome">Nome completo</label>
          <div>
            <input
              onChange={(e) => setNome(e.target.value)}
              id="Nome"
              placeholder="Nome e sobrenome"
            />
          </div>
        </Input>

        <Input>
          <label htmlFor="Email">Email</label>
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="Email"
              type="email"
              placeholder="nome@email.com.br"
            />
          </div>
        </Input>
        <Input>
          <label htmlFor="Senha">Senha</label>
          <div>
            <input
              onChange={(e) => setSenha(e.target.value)}
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
        </Input>
        <Input>
          <label htmlFor="ConfirmaSenha">Confirme a senha</label>

          <div>
            <input
              onChange={(e) => setConfirmaSenha(e.target.value)}
              id="ConfirmaSenha"
              type={showPassword1 ? "text" : "password"}
              placeholder="Digite sua senha aqui"
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? <EyeClosed /> : <Eye />}
            </button>
          </div>
        </Input>
        <button type="submit" onClick={SubmitForm} className="cBtn">
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
        <ToastContainer/>
      </div>
    </RegisterContainer>
  );
}
