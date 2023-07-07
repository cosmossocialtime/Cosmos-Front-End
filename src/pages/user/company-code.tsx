import { ChangeEvent, useState } from 'react'
import { BackButton } from '../../components/BackButton'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../services/api'
import { ToastContainer, toast } from 'react-toastify'
import Image from 'next/image'
import debounce from 'lodash.debounce'

const shemaCompanyCode = z.object({
  code: z.string().nonempty('O código da empresa é obrigatorio'),
})
type TypeCompanyCode = z.infer<typeof shemaCompanyCode>

export default function CompanyCode() {
  const [code, setCode] = useState('')
  const [imageCompany, setImageCompany] = useState('')
  const [imageIsLoad, setImageIsLoad] = useState(false)
  const { handleSubmit } = useForm<TypeCompanyCode>()
  const router = useRouter()

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setCode(newValue)
    debounceRequest(newValue)
  }

  const debounceRequest = debounce((value: string) => {
    if (value.length === 6) {
      api
        .get(`company/code/${value}`)
        .then((response) => {
          setImageCompany(response.data.logo)
        })
        .catch((error) => {
          if (error.response.status === 404) {
            return toast.error('Tente novamente')
          }
        })
    }
    if (value.length !== 6) {
      setImageCompany('')
    }
  }, 300)

  function submitForm() {
    if (!code) {
      return toast.error('Por gentileza digite um código válido')
    }
    api
      .patch('/user/onboarding', {
        companyCode: code,
      })
      .then((response) => {
        if (response.status === 200) {
          router.push('/user/birth')
        }
      })
      .catch((error) => {
        if (error.response.status)
          return toast.error('Por gentileza digite um código válido')
      })
  }
  return (
    <div className="relative">
      <BackButton link="/user/gender" />
      <main className="flex h-screen items-center justify-around bg-bgCadastro bg-cover bg-bottom bg-no-repeat ">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex max-w-md flex-col items-center justify-center gap-12 rounded-2xl bg-black/10 py-10 px-8 backdrop-blur-md"
        >
          <h2 className="text-center text-2xl font-semibold text-zinc-50">
            Qual o código da empresa em que você trabalha?
          </h2>
          <span className="text-center text-xl text-zinc-50">
            Esse código foi enviado para você no mesmo e-mail em que a sua
            empresa divulgou o programa de voluntariado.
          </span>
          <label className="text-zinc-50">
            Digite o código da empresa
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border border-solid border-gray-400 bg-zinc-50 p-4 py-3 text-zinc-800 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </label>
          <button
            disabled={!imageIsLoad}
            className={`${
              imageCompany
                ? ' bg-violet-500'
                : 'cursor-not-allowed bg-violet-700'
            } w-full cursor-pointer rounded-lg py-4 text-lg font-semibold text-zinc-50`}
          >
            Continuar
          </button>
        </form>
        <div className="absolute bottom-10 left-2/3">
          <div className="bottom-0 flex max-w-max">
            <div className="absolute mt-7 flex h-[28%] w-full  rotate-6 items-center justify-center p-2">
              {imageCompany && (
                <Image
                  loader={() => imageCompany}
                  onLoad={() => setImageIsLoad(true)}
                  width={200}
                  height={200}
                  src={imageCompany}
                  alt="Logo da companhia"
                  className="h-[80%] w-[80%] object-contain"
                />
              )}
            </div>
            <Image
              width={268}
              height={268}
              src="/images/bandeira.png"
              alt="Bandeira branca"
              className=""
            />
          </div>
        </div>
        <ToastContainer autoClose={2000} limit={3} />
      </main>
    </div>
  )
}
