import { Eye, EyeClosed } from "phosphor-react";
import { FormEvent, useEffect, useState, useRef } from "react";
import { Input, EditPasswordContainer } from "./style";
import { ToastContainer, toast } from 'react-toastify';
import  AccessService from "../../services/AccessService";
import styled from "styled-components";
import Link from "next/link";

export function UserRenewPasswordForm() {

  const [ID, setID] = useState(1);
  const [Attemps, setAttempt] = useState(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [user, setUser] = useState([]);
  // const navigate = useNavigate();

  // const location = useLocation();
  const params = new URLSearchParams(location.search);
  let token = params.get("token");
  
  const isInitialMount = useRef(true);

  const initialState = {
    username: nome,
    account: email,
    password: senha,
    password2: confirmaSenha,
    token: token,
    action: ""
  };
  
  useEffect(() => {
    if (isInitialMount.current) {
       isInitialMount.current = false;
        toast.success("Olá, encontramos sua requisição, que tal criar uma nova senha?");
  }});

  const SubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (senha === confirmaSenha) {
      setAttempt(Attemps+1);

      if(Attemps <= 3){
        AccessService.EditPassword(initialState).then((response:any) =>{
        if(response.data.type.includes('success'))
        {
          // navigate('/usuario/alteracao-email');
        }
        else
        {
          toast.warning(response.data.text);
        }
        }).catch((e: Error) => {
          toast.error("Ops...não foi processar sua requisição, tente novamente mais tarde.");
        });
      }
      else{
        // navigate('/usuario/recuperar');
      }
    }
    else
    {
      const data = {type: 'error', text: 'Senhas não coincidem'};
      toast.error(data.text);
    }
  }

  return (
    <EditPasswordContainer>
      <h2>Redefina sua senha</h2>
      <form onSubmit={SubmitForm}>
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
            Redefinir
          </button>
      </form>

      <div>
        <h3>
          Já tem conta?{" "}
          <strong>
            <Link href="/usuario/entrar">Fazer login</Link>
          </strong>
        </h3>
        <ToastContainer></ToastContainer>
      </div>
    </EditPasswordContainer>
  );
}
