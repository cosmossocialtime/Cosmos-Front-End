import { FormEvent, useEffect, useState, useRef } from "react";
import { Input, RecoveryContainer } from "./style";
import { ToastContainer, toast } from 'react-toastify';
import ILoginData from "../../types/login";
import AccessService from "../../services/AccessService";
import Link from "next/link";
import { useRouter } from "next/router";

export function UserRecoveryForm() {

  const [email, setEmail] = useState("");

  const router = useRouter();
  const isInitialMount = useRef(true);

  const initialState = {
    account: email,
    password: "",
    token: "",
    action: ""
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      toast.success("Olá, identificamos seu problema, que tal recuperar sua conta?");
    }
  });

  const [initLogin, setTutorial] = useState<ILoginData>(initialState);

  const SubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (email == "") {
      toast.error("Por favor, preencha o campo de email corretamente.");
    }

    else {
      AccessService.Recovery(initialState).then((response: any) => {
        if (!response.data.type.includes('error')) {
          router.push('/usuario/recuperacao-senha');
        }
        else {
          toast.error(response.data.text);
        }

      }).catch((e: Error) => {
        toast.error("Ops...não foi processar sua requisição, tente novamente mais tarde.");
      });
    }
  }

  return (
    <RecoveryContainer>
      <h2>Informe seu email</h2>
      <form onSubmit={SubmitForm}>
        <Input>
          <label htmlFor="Email">Para recuperar sua senha, informe o email com o qual se cadastrou</label>
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="Email"
              type="email"
              placeholder="Escreva seu email aqui@email.com.br"
            />
          </div>
        </Input>

        <button type="submit" onClick={SubmitForm} className="cBtn">
          Recuperar
        </button>
      </form>
      <div>
        <h3>
          Lembrou de sua senha?{" "}
          <strong>
            <Link href="/usuario/entrar">Fazer Login</Link>
          </strong>
        </h3>
      </div>
      <div>
        <ToastContainer></ToastContainer>
      </div>
    </RecoveryContainer>
  );
}
