import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox'
import { BackButton } from "../../components/BackButton";
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import useFetch from '../../hooks/useFetch';
import Image from 'next/image';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { api } from '../../services/api';
import Router from 'next/router';
import { toast } from 'react-toastify';
interface cityProps {
  id: number,
  nome: string,
}

interface stateProps extends cityProps {
  sigla: string
}

export default function EstadoCidade() {
  const [outOfBrazil, setOutOfBrazil] = useState(false)
  const [stateSubmit, setStateSubmit] = useState("")
  const [citySubmit, setCitySubmit] = useState("")
  const [city, setCity] = useState<cityProps[]>()
  const { handleSubmit } = useForm()
  const { data: statesOfBrazil } = useFetch<stateProps[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")

  useEffect(() => {
    async function fetchCidadesPorEstado() {
      try {
        const estadoEncontrado = statesOfBrazil?.find(e => e.sigla === stateSubmit);

        const cidadesResponse = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoEncontrado?.id}/municipios`);

        setCity(cidadesResponse.data);
      } catch (error) {
        console.error('Não foi possível obter a lista de cidades:')
        setCity([]);
      }
    }

    fetchCidadesPorEstado();
  }, [stateSubmit, statesOfBrazil]);

  function handleSubmitStateAndCity() {
    try {
      api.patch('/user/onboarding', {
        "state": stateSubmit,
        "city": citySubmit
      })

      Router.push('/usuario/decolar')
    } catch (error) {
      toast.error("Não foi possivel fazer sua requisição, tente novamente mais tarde")
    }
  }

  return (
    <div>
      <BackButton link="/usuario/nascimento" />
      <main className="w-full h-screen bg-little-nave bg-cover bg-no-repeat flex text-zinc-50 items-center">
        <form
          onSubmit={handleSubmit(handleSubmitStateAndCity)}
          className="flex flex-col items-center justify-center gap-7 lg:ml-72 p-16 backdrop-blur-md bg-black/10 rounded-2xl">
          <h2 className='text-2xl'>Onde a sua nave está estacionada?</h2>
          <span className='font-light text-xl'>O local onde você vive atualmente</span>
          <div className='flex flex-col w-full justify-between gap-6'>


            {!outOfBrazil ? (
              <>
                <div className='w-full flex flex-col gap-2'>
                  <label htmlFor="country">Estado</label>
                  <Select.Root onValueChange={setStateSubmit}>
                    <Select.Trigger
                      id="country"
                      className="bg-zinc-50 rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
                    >
                      <Select.Value placeholder="Selecione seu estado" />
                      <Select.Icon>
                        <Image src="/images/arrow-down.svg" alt="arrow down" width={12} height={12} />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content position='popper' className="bg-white text-center rounded mt-2 w-full">
                        <Select.Viewport className="text-violet-500 p-2 cursor-pointer max-h-60 w-full">

                          {statesOfBrazil?.map(states => {
                            return (
                              <Select.Item
                                key={states.id}
                                value={states.sigla}
                                className=" py-2 px-4 outline-none hover:bg-violet-500 hover:text-zinc-50 rounded-lg flex justify-between items-center"
                              >
                                <Select.ItemText>
                                  {states.nome}
                                </Select.ItemText>
                                <Select.ItemIndicator >
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
                <div className='w-full flex flex-col gap-2'>
                  <label htmlFor="City">Cidade</label>
                  <Select.Root onValueChange={setCitySubmit}>
                    <Select.Trigger
                      id="City"
                      className="bg-zinc-50 rounded text-sm text-zinc-500 w-full flex py-3 px-4 justify-between items-center"
                    >
                      <Select.Value placeholder="Selecione sua cidade" />
                      <Select.Icon>
                        <Image src="/images/arrow-down.svg" alt="arrow down" width={12} height={12} />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content position='popper' className="bg-white text-center rounded mt-2 w-full">
                        <Select.Viewport className="text-violet-500 p-2 cursor-pointer max-h-60 w-full">

                          {city?.map(city => {
                            return (
                              <Select.Item
                                key={city.id}
                                value={city.nome}
                                className=" py-2 px-4 outline-none hover:bg-violet-500 hover:text-zinc-50 rounded-lg flex justify-between items-center"
                              >
                                <Select.ItemText>
                                  {city.nome}
                                </Select.ItemText>
                                <Select.ItemIndicator >
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

            <div className='flex gap-2'>
              <Checkbox.Root
                className={`bg-transparent w-6 h-6 border-2 border-solid border-[#A2ABCC] rounded flex items-center justify-center ${outOfBrazil && "&& bg-gradient-to-r to-[#9D37F2] from-blue-300 border-none"}`}
                id='checkbox'
                checked={outOfBrazil}
                onCheckedChange={
                  (checked) => {
                    if (checked === true) {
                      setOutOfBrazil(true)
                    } else {
                      setOutOfBrazil(false)
                    }
                  }
                }
              >
                <Checkbox.Indicator >
                  <Check size={32} className="p-1 text-zinc-50 font-bold" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label>Não moro no Brasil</label>
            </div>

            <button className='bg-violet-600 p-3 rounded-lg hover:bg-violet-500 transition-colors'>Entrar na nave</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['cosmos.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/usuario/entrar',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}