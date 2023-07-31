import { Pencil } from 'phosphor-react'
import { useState } from 'react'
import { UserProps } from '../../../types/user'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { api } from '../../../services/api'
import { LocationInput } from './LocationInput'
import { PasswordInput } from './PasswordInput'
import { toast } from 'react-toastify'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { useForm } from 'react-hook-form'

interface FormUserDataProps {
  userData: UserProps
  updateUserData: (newUser: UserProps) => void
}
dayjs.extend(utc)

export default function FormUserData({
  userData,
  updateUserData,
}: FormUserDataProps) {
  const { register } = useForm()
  const gendersOpt = ['Masculino', 'Feminino', 'Outro']
  const [otherGender, setOtherGender] = useState('')
  const [enableForm, setEnableForm] = useState(false)
  const [newUserData, setNewUserData] = useState(userData)

  function cancelChanges() {
    setNewUserData(userData)
    setEnableForm(false)
  }

  function handleLocation(country: boolean, state: string, city: string) {
    setNewUserData({ ...newUserData, country, state, city })
  }

  function sendNewInfo() {
    const gender =
      newUserData.gender === 'Outro' ? otherGender : newUserData.gender

    if (
      !newUserData.fullName ||
      !newUserData.byname ||
      !newUserData.birthdate ||
      !gender ||
      newUserData.country === null ||
      (newUserData.country && (!newUserData.state || !newUserData.city)) ||
      (!newUserData.country && (newUserData.state || newUserData.city))
    ) {
      toast.error('Por favor, preencha todos os campos!')
      return
    }

    api
      .put('/user', {
        fullName: newUserData.fullName,
        byname: newUserData.byname,
        birthdate: newUserData.birthdate,
        gender,
        country: newUserData.country,
        state: newUserData.state,
        city: newUserData.city,
      })
      .then((response) => {
        if (response.status === 200) {
          updateUserData(newUserData)
          setEnableForm(false)
          setNewUserData({ ...newUserData, gender })
          toast.success('Dados atualizados com sucesso!')
        }
      })
      .catch((error: any) => {
        if (error.response.status === 400) return toast.error('Sem Autorização')
      })
  }

  return (
    <div className="mx-auto flex max-w-max flex-1 flex-col justify-between py-8">
      <form className="relative grid w-max grid-cols-2 items-center justify-center gap-x-16 gap-y-5 ">
        <Input.Root ariaLabel="Nome Completo">
          <Input.Content
            type="text"
            value={newUserData.fullName}
            disabled={!enableForm}
            onChange={(e) => {
              setNewUserData((prevState) => ({
                ...prevState,
                fullName: e.target.value,
              }))
            }}
          />
        </Input.Root>

        <Input.Root ariaLabel="Data de nascimento">
          <Input.Date
            disabled={!enableForm}
            selected={dayjs(newUserData.birthdate).toDate()}
            {...register('birthdate')}
            onChange={(date) => {
              date &&
                setNewUserData((prevState) => ({
                  ...prevState,
                  birthdate: date,
                }))
            }}
          />
        </Input.Root>

        <Input.Root ariaLabel="Nome pelo qual gostaria de ser chamando(a)">
          <Input.Content
            type="text"
            value={newUserData.byname}
            disabled={!enableForm}
            onChange={(e) => {
              setNewUserData((prevState) => ({
                ...prevState,
                byname: e.target.value,
              }))
            }}
          />
        </Input.Root>

        <LocationInput
          cityData={newUserData.city}
          stateData={newUserData.state}
          livesInBrasil={newUserData.country}
          handleLocation={handleLocation}
          enableForm={enableForm}
        />

        <Input.Root ariaLabel="Gênero">
          <Input.Select
            disabled={!enableForm}
            items={gendersOpt}
            option={newUserData.gender}
            changeOption={(option) =>
              setNewUserData({ ...newUserData, gender: option })
            }
            placeholder="Selecione..."
          />
        </Input.Root>

        <Input.Root ariaLabel="Senha">
          <PasswordInput enableForm={enableForm} />
        </Input.Root>

        {newUserData.gender === 'Outro' && (
          <Input.Root ariaLabel="Digite seu gênero">
            <Input.Content
              disabled={!enableForm}
              type="text"
              value={otherGender}
              onChange={(e) => setOtherGender(e.target.value)}
            />
          </Input.Root>
        )}

        {!enableForm && (
          <Button.Secondary
            className="absolute -right-11 top-0 flex max-w-max translate-x-full items-center gap-2 py-3 px-8"
            onClick={() => setEnableForm(true)}
          >
            <Pencil size={22} />
            Editar perfil
          </Button.Secondary>
        )}
      </form>
      {enableForm && (
        <div className="mt-16 flex gap-16 self-end">
          <button
            className="rounded-lg py-3 font-semibold text-red-400 transition-colors hover:text-red-500"
            onClick={cancelChanges}
          >
            Cancelar
          </button>
          <Button.Primary className="py-4 px-8" onClick={sendNewInfo}>
            Salvar edição
          </Button.Primary>
        </div>
      )}
    </div>
  )
}
