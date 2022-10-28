import { Eye, EyeClosed } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { ForgetPass, Input, LoginContainer } from "./style";
import { ToastContainer, toast } from 'react-toastify';
import ILoginData from "../../types/login";
import  AccessService  from "../../services/AccessService";
import Link from "next/link";

export function UserLoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Attemps, setAttempt] = useState(1);

  // const navigate = useNavigate();

  const initialState = {
    account: email,
    password: senha,
    token: "",
    action: ""
  };
  const [initLogin, setTutorial] = useState<ILoginData>(initialState);

  const SubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if(senha == "" || email == ""){
      toast.error("Por favor, preencha os campos de email e senha corretamente.");
    }
    else
    {
      setAttempt(Attemps+1);
      if(Attemps <= 5){

      AccessService.Login(initialState).then((response:any) =>{
        if(response.data.type.includes('success'))
        {
          //  localStorage.setItem('token', JSON.stringify(response.data));
          //  localStorage.setItem('currentUser', JSON.stringify(response.data));

          // navigate('/usuario/iniciar');
        }
        else{
          toast.error(response.data.text);
        }
       
      }).catch((e: Error) => {
        toast.error("Ops...não foi processar sua requisição, tente novamente mais tarde.");
      });
    }
    else{
      // navigate('/usuario/recuperar');
    }
  }
  }

  return (
    <LoginContainer>
      <h2>Faça o seu login</h2>
      <form onSubmit={SubmitForm}>
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
          <ForgetPass>
            <Link href="/usuario/recuperar">Esqueci a minha senha</Link>
          </ForgetPass>
        </Input>

        <button type="submit" onClick={SubmitForm} className="cBtn">
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
        <ToastContainer></ToastContainer>
      </div>
    </LoginContainer>
  );
}
