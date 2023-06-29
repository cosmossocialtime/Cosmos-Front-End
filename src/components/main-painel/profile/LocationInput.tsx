import * as Select from '@radix-ui/react-select'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import axios from 'axios'
import { CaretDown, Check } from 'phosphor-react'
import LabelItem from './LabelItem'

interface cityProps {
  id: number
  nome: string
}
interface stateProps extends cityProps {
  sigla: string
}

interface LocationInputProps {
  cityData: string
  stateData: string
  handleLocation: (state: string, city: string) => void
  enableForm: boolean
}

export function LocationInput({
  cityData,
  stateData,
  handleLocation,
  enableForm,
}: LocationInputProps) {
  const [liveOutside, setLiveOutside] = useState(false)
  const [stateSubmit, setStateSubmit] = useState(stateData)
  const [citySubmit, setCitySubmit] = useState(cityData)
  const [city, setCity] = useState<cityProps[]>()
  const { data: statesOfBrazil } = useFetch<stateProps[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  )

  useEffect(() => {
    handleLocation(stateSubmit, citySubmit)
  }, [stateSubmit, citySubmit])

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
  }, [statesOfBrazil, stateSubmit])

  return (
    <div className="">
      <LabelItem title="Localização" enableForm={enableForm} className="w-full">
        {liveOutside ? (
          <></>
        ) : (
          <div className="flex w-full px-6">
            <Select.Root
              defaultValue={stateSubmit}
              disabled={!enableForm}
              onValueChange={setStateSubmit}
            >
              <Select.Trigger className="group flex items-center justify-between gap-12 py-4 pr-4">
                <Select.Value />
                <Select.Icon>
                  <CaretDown
                    weight="fill"
                    className="text-violet-500 group-data-[disabled]:opacity-20"
                  />
                </Select.Icon>
              </Select.Trigger>
              <Select.Content
                side="bottom"
                sideOffset={16}
                position="popper"
                className="w-full rounded bg-white p-2 shadow"
              >
                <Select.Viewport className="max-h-32">
                  {statesOfBrazil?.map((state) => (
                    <Select.Item
                      className="flex cursor-pointer justify-between gap-4 rounded-md p-3 text-violet-500 hover:bg-violet-500 hover:text-white"
                      key={state.sigla}
                      value={state.sigla}
                      disabled={state.sigla === stateSubmit}
                    >
                      <Select.ItemText>{state.sigla}</Select.ItemText>
                      <Select.ItemIndicator>
                        <Check size={18} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>

            <Select.Root
              defaultValue={citySubmit}
              disabled={!enableForm}
              onValueChange={setCitySubmit}
            >
              <Select.Trigger className="group flex flex-1 items-center justify-between py-4 pl-4">
                <Select.Value />
                <Select.Icon>
                  <CaretDown
                    weight="fill"
                    className="text-violet-500 group-data-[disabled]:opacity-20"
                  />
                </Select.Icon>
              </Select.Trigger>
              <Select.Content
                side="bottom"
                sideOffset={16}
                position="popper"
                className="w-full rounded bg-white p-2 shadow"
              >
                <Select.Viewport className="max-h-32">
                  {city?.map((city) => (
                    <Select.Item
                      className="flex cursor-pointer justify-between gap-4 rounded-md p-3 text-violet-500 hover:bg-violet-500 hover:text-white"
                      key={city.nome}
                      value={city.nome}
                      disabled={city.nome === citySubmit}
                    >
                      <Select.ItemText>{city.nome}</Select.ItemText>
                      <Select.ItemIndicator>
                        <Check size={18} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>
        )}
      </LabelItem>

      <label htmlFor="checkbox" className="mt-5 flex gap-2">
        <Checkbox.Root
          className="flex h-6 w-6 items-center gap-2 rounded border border-solid border-gray-400 bg-gray-300/20 data-[state=checked]:border-none data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-300 data-[state=checked]:to-violet-400"
          disabled={!enableForm}
          checked={liveOutside}
          onCheckedChange={(check) => setLiveOutside(Boolean(check))}
          id="checkbox"
        >
          <Checkbox.Indicator className="">
            <Check size={24} weight="bold" className="p-[2px] text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Não moro no Brasil
      </label>
    </div>
  )
}
