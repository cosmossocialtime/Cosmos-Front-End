import UserRegisterMessage from "../../components/Cadastro/RegisterMessages";
import Main from "../../components/Main";

export default function ConfirmarCadastro() {
  return (
    <div className="md:flex h-screen">
      <Main />
      <UserRegisterMessage.Validate />
    </div>
  );
}
