import { ChangeEvent, useState } from 'react'
import { BackButton } from '../../components/BackButton'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../services/api'
import { ToastContainer, toast } from 'react-toastify'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
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
      <main className="bg-bgCadastro h-screen bg-cover bg-no-repeat bg-bottom flex items-center justify-around ">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col items-center justify-center gap-12 py-10 px-8 backdrop-blur-md bg-black/10 rounded-2xl max-w-md"
        >
          <h2 className="text-2xl text-zinc-50 text-center font-semibold">
            Qual o código da empresa em que você trabalha?
          </h2>
          <span className="text-xl text-zinc-50 text-center">
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
              className="w-full bg-zinc-50 border-solid border border-gray-400 rounded-md py-3 p-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 transition-all duration-200 mt-1 text-zinc-800"
            />
          </label>
          <button
            disabled={!imageIsLoad}
            className={`${
              imageCompany
                ? ' bg-violet-500'
                : 'bg-violet-700 cursor-not-allowed'
            } py-4 w-full text-lg font-semibold text-zinc-50 rounded-lg cursor-pointer`}
          >
            Continuar
          </button>
        </form>
        <div className="absolute bottom-10 left-2/3">
          <div className="flex max-w-max bottom-0">
            <div className="mt-7 p-2 h-[28%] absolute w-full  flex justify-center items-center rotate-6">
              {imageCompany && (
                <Image
                  loader={() => imageCompany}
                  onLoad={() => setImageIsLoad(true)}
                  width={200}
                  height={200}
                  src={imageCompany}
                  alt="Logo da companhia"
                  className="w-[80%] h-[80%] object-contain"
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'cosmos.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
