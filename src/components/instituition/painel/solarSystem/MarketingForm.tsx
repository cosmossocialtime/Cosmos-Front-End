import Image from 'next/image'
import { X } from 'phosphor-react'
import SingleSelectComboBox from '../../../combobox/SingleSelectComboBox'
import { InputTextArea } from '../../../Input/InputTextArea'
import { Button } from '../../../../components/Button/ButtonSubmit'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

// Depois ajustar options de acordo.
const options = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'rs', label: 'Rio Grande do Sul' },
  { value: 'ba', label: 'Bahia' },
]

const schema = z.object({
  howMuch: z.string().min(1, 'Selecione um estado.'),
  howDoIt: z.string().min(100, 'Mínimo de 100 caracteres').max(300),
  whatCanImprove: z.string().min(100, 'Mínimo de 100 caracteres').max(300),
})

type FormProps = z.infer<typeof schema>

interface MarketingFormProps {
  closeModal: () => void
}

export const MarketingForm = ({ closeModal }: MarketingFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [selectedEstado, setSelectedEstado] = useState<{
    value: string
    label: string
  } | null>(null)

  const howMuch = watch('howMuch')
  const howDoIt = watch('howDoIt')
  const whatCanImprove = watch('whatCanImprove')

  useEffect(() => {
    setIsDisabled(!(howMuch && howDoIt && whatCanImprove))
  }, [howMuch, howDoIt, whatCanImprove])

  const handleChange = (selected: { value: string; label: string } | null) => {
    setSelectedEstado(selected)

    if (selected) {
      setValue('howMuch', selected.value, { shouldValidate: true })
      clearErrors('howMuch')
    } else {
      setError('howMuch', { type: 'manual', message: 'Selecione um estado.' })
    }
  }

  async function onSubmit(data: FormProps) {
    console.log('Form Data:', data)
  }

  return (
    <section className="absolute left-0 top-0 z-[50] flex h-screen w-full items-center justify-center bg-black/50">
      <section className="h-[600px] w-[700px] rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              width={50}
              height={50}
              src="/images/satelites/marketing.png"
              alt="Ícone de marketing"
            />
            <h1 className="text-xl font-semibold">Marketing</h1>
          </div>

          <button onClick={closeModal}>
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[500px] overflow-y-scroll p-1"
        >
          <div>
            <h5 className="font-medium">
              O quanto a instituição considera que a área de marketing precisa
              ser trabalhada?
            </h5>
            <SingleSelectComboBox
              instanceId="howMuch"
              options={options}
              onChange={handleChange}
              value={selectedEstado}
            />
            {errors.howMuch && (
              <p className="text-sm text-red-500">{errors.howMuch.message}</p>
            )}
          </div>

          <div>
            <h5 className="mt-5 font-medium">
              Como é feito o marketing na instituição hoje?
            </h5>
            <InputTextArea
              register={register}
              name="howDoIt"
              className="min-h-[150px]"
              minChar={100}
              maxChar={300}
            />
            {errors.howDoIt && (
              <p className="text-sm text-red-500">{errors.howDoIt.message}</p>
            )}
          </div>

          <div>
            <h5 className="mt-5 font-medium">
              O que pode melhorar na área de marketing da organização?
            </h5>
            <InputTextArea
              register={register}
              name="whatCanImprove"
              className="min-h-[150px]"
              minChar={100}
              maxChar={300}
            />
            {errors.whatCanImprove && (
              <p className="text-sm text-red-500">
                {errors.whatCanImprove.message}
              </p>
            )}
          </div>

          <div className="w-[250px]">
            <Button
              text="Salvar Informações"
              disabled={isDisabled}
              type="submit"
            />
          </div>
        </form>
      </section>
    </section>
  )
}
