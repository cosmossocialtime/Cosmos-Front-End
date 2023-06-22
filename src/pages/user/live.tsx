import * as Select from '@radix-ui/react-select'
import * as Checkbox from '@radix-ui/react-checkbox'
import { BackButton } from '../../components/BackButton'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useFetch from '../../hooks/useFetch'
import Image from 'next/image'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { api } from '../../services/api'
import Router from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

interface cityProps {
  id: number
  nome: string
}

interface stateProps extends cityProps {
  sigla: string
}

export default function EstadoCidade() {
  const [outOfBrazil, setOutOfBrazil] = useState(false)
  const [stateSubmit, setStateSubmit] = useState('')
  const [citySubmit, setCitySubmit] = useState('')
  const [city, setCity] = useState<cityProps[]>()
  const { handleSubmit } = useForm()
  const { data: statesOfBrazil } = useFetch<stateProps[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  )

  useEffect(() => {
    async function fetchCidadesPorEstado() {
      try {
        const estadoEncontrado = statesOfBrazil?.find(
          (e) => e.sigla === stateSubmit,
        )
        const cidadesResponse = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoEncontrado?.id}/municipios`,
        )
        setCity(cidadesResponse.data)
      } catch (error) {
        console.error('Não foi possível obter a lista de cidades:')
        setCity([])
      }
    }
    fetchCidadesPorEstado()
  }, [stateSubmit, statesOfBrazil])

  function handleSubmitStateAndCity() {
    if (stateSubmit === '' || citySubmit === '') {
      return toast.error('Selecione o local onde você vive atualmente')
    }
    try {
      api
        .patch('/user/onboarding', {
          state: stateSubmit,
          city: citySubmit,
        })
        .then((response) => {
          if (response.status === 200) Router.push('/user/endpoint')
        })
    } catch (error: any) {
      if (error.response.status === 401) return toast.error('Sem autorização')
    }
  }
  return (
    <div>
      <BackButton link="/user/birth" />
      <main className="flex h-screen w-full items-center bg-little-nave bg-cover bg-no-repeat text-zinc-50">
        <form
          onSubmit={handleSubmit(handleSubmitStateAndCity)}
          className="flex flex-col items-center justify-center gap-7 rounded-2xl bg-black/10 p-16 backdrop-blur-md lg:ml-72"
        >
          <h2 className="text-2xl">Onde a sua nave está estacionada?</h2>
          <span className="text-xl font-light">
            O local onde você vive atualmente
          </span>
          <div className="flex w-full flex-col justify-between gap-6">
            {!outOfBrazil ? (
              <>
                <div className="flex w-full flex-col gap-2">
                  <label htmlFor="country">Estado</label>
                  <Select.Root onValueChange={setStateSubmit}>
                    <Select.Trigger
                      id="country"
                      className="flex w-full items-center justify-between rounded bg-zinc-50 py-3 px-4 text-sm text-zinc-500"
                    >
                      <Select.Value placeholder="Selecione seu estado" />
                      <Select.Icon>
                        <Image
                          src="/images/arrow-down.svg"
                          alt="arrow down"
                          width={12}
                          height={12}
                        />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content
                        position="popper"
                        className="mt-2 w-full rounded bg-white text-center"
                      >
                        <Select.Viewport className="max-h-60 w-full cursor-pointer p-2 text-violet-500">
                          {statesOfBrazil?.map((states) => {
                            return (
                              <Select.Item
                                key={states.id}
                                value={states.sigla}
                                className=" flex items-center justify-between rounded-lg py-2 px-4 outline-none hover:bg-violet-500 hover:text-zinc-50"
                              >
                                <Select.ItemText>{states.nome}</Select.ItemText>
                                <Select.ItemIndicator>
                                  <Check size={18} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            )
                          })}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label htmlFor="City">Cidade</label>
                  <Select.Root onValueChange={setCitySubmit}>
                    <Select.Trigger
                      id="City"
                      className="flex w-full items-center justify-between rounded bg-zinc-50 py-3 px-4 text-sm text-zinc-500"
                    >
                      <Select.Value placeholder="Selecione sua cidade" />
                      <Select.Icon>
                        <Image
                          src="/images/arrow-down.svg"
                          alt="arrow down"
                          width={12}
                          height={12}
                        />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content
                        position="popper"
                        className="mt-2 w-full rounded bg-white text-center"
                      >
                        <Select.Viewport className="max-h-60 w-full cursor-pointer p-2 text-violet-500">
                          {city?.map((city) => {
                            return (
                              <Select.Item
                                key={city.id}
                                value={city.nome}
                                className=" flex items-center justify-between rounded-lg py-2 px-4 outline-none hover:bg-violet-500 hover:text-zinc-50"
                              >
                                <Select.ItemText>{city.nome}</Select.ItemText>
                                <Select.ItemIndicator>
                                  <Check size={18} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            )
                          })}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </>
            ) : null}

            <div className="flex gap-2">
              <Checkbox.Root
                className={`flex h-6 w-6 items-center justify-center rounded border-2 border-solid border-[#A2ABCC] bg-transparent ${
                  outOfBrazil &&
                  '&& border-none bg-gradient-to-r from-blue-300 to-[#9D37F2]'
                }`}
                id="checkbox"
                checked={outOfBrazil}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setOutOfBrazil(true)
                  } else {
                    setOutOfBrazil(false)
                  }
                }}
              >
                <Checkbox.Indicator>
                  <Check size={32} className="p-1 font-bold text-zinc-50" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="checkbox">Não moro no Brasil</label>
            </div>

            <button className="rounded-lg bg-violet-600 p-4 transition-colors hover:bg-violet-500">
              Entrar na nave
            </button>
          </div>
        </form>
      </main>
      <ToastContainer autoClose={2000} limit={3} />
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
