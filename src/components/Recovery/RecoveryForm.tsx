import { FormEvent, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../services/api";

export function UserRecoveryForm() {

  const [email, setEmail] = useState("");
  const router = useRouter();

  const SubmitForm = (e: FormEvent) => {
    e.preventDefault()
    try {
      api.post('/auth/forgotPassword', {
        "email": email
      })
    } catch (error) {
      return toast.error("Não foi possivel recuperar sua senha, por favor tente novamente mais tarde")
    }
    return toast.success("Conta encontrada, Link de recuperação enviado por email")
  }

  console.log(email);

  return (
    <main className="flex flex-col w-full gap-2 justify-center items-center">
      <h2 className="text-3xl text-purple-600">Informe o seu email</h2>
      <form onSubmit={SubmitForm} className="p-10 flex flex-col gap-2 mt-4">
        <div className="flex flex-col w-full max-w-md gap-3 mb-9">
          <label htmlFor="email" className="text-lg">Para recuperar sua senha, informe o email com o qual se cadastrou</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            required
            placeholder="Escreva seu email aqui@email.com.br"
            className="border-solid border border-gray-400 rounded-md p-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 valid:border-green-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200"
          />
        </div>

        <button type="submit" onClick={SubmitForm} className="cBtn">
          Recuperar
        </button>
      </form>
      <span className="mt-2">
        Lembrou de sua senha?{" "}
        <strong className="text-purple-700 font-bold hover:text-purple-600 transition-all duration-200">
          <Link href="/usuario/entrar">Fazer Login</Link>
        </strong>
      </span>

      <div>
        <ToastContainer></ToastContainer>
      </div>
    </main>
  );
}
