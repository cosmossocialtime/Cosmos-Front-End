import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { api } from "../../services/api";
import { useEffect } from "react";

export default function VerifyUser() {
  const { 'cosmos.user': user } = parseCookies()
  const router = useRouter()
  const { verifyUser } = router.query

  useEffect(() => {
    try {
      api.patch('auth/verify', {
        "email": user,
        "token": verifyUser
      })
      router.push('/user/login')
    } catch (error) {
      console.log(error);
    }

  }, [verifyUser, user])

  return (
    <div className="h-screen bg-zinc-900 text-zinc-50 flex flex-col items-center justify-center">
      <h2></h2>
      <p>Sua conta esta sendo ativada</p>
    </div>
  );
}