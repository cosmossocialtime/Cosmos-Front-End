import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import axios from 'axios'
import { Input } from '../../Input'

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
  livesInBrasil: boolean
  handleLocation: (country: boolean, state: string, city: string) => void
  enableForm: boolean
}

export function LocationInput({
  cityData,
  stateData,
  livesInBrasil,
  handleLocation,
  enableForm,
}: LocationInputProps) {
  const liveOutside = !livesInBrasil
  const [city, setCity] = useState<cityProps[]>()
  const { data: statesOfBrazil } = useFetch<stateProps[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  )
  useEffect(() => {
    async function fetchCidadesPorEstado() {
      const estadoEncontrado = statesOfBrazil?.find(
        (e) => e.sigla === stateData,
      )
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoEncontrado?.id}/municipios`,
        )
        .then(({ data: cidades }: { data: cityProps[] }) => {
          setCity(cidades)
        })
        .catch(() => {
          console.error('Não foi possível obter a lista de cidades:')
          setCity([])
        })
    }

    fetchCidadesPorEstado()
  }, [statesOfBrazil, stateData])

  return (
    <div className="">
      <Input.Root ariaLabel="Localização" className="w-full">
        {livesInBrasil && (
          <>
            <Input.Select
              className="flex-none rounded-r-none"
              disabled={!enableForm}
              placeholder="Estado"
              option={stateData}
              items={statesOfBrazil?.map((state) => state.sigla) || []}
              changeOption={(option) =>
                handleLocation(livesInBrasil, option, '')
              }
              maxHeightView="13rem"
            />
            <Input.Select
              className="rounded-l-none"
              disabled={!enableForm}
              placeholder="Cidade"
              option={cityData}
              items={city?.map((city) => city.nome) || []}
              changeOption={(option) =>
                handleLocation(livesInBrasil, stateData, option)
              }
              maxHeightView="13rem"
            />
          </>
        )}
      </Input.Root>

      <Input.CheckBox
        content="Não moro no Brasil"
        checked={liveOutside}
        disabled={!enableForm}
        onChangeChecked={(checked) => handleLocation(!checked, '', '')}
        className={`${!enableForm && !liveOutside ? 'hidden' : ''} mt-5`}
      />
    </div>
  )
}
