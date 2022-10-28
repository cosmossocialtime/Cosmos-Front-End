import Main from "../../components/Main";
import UserRecoveryMessage from "../../components/Recovery/RecoveryMessages";

export default function RecuperadoEmail() {
  return (
    <div className="md:flex h-screen">
      <Main />
      <UserRecoveryMessage.EmailConfirmed />
    </div>
  );
}
