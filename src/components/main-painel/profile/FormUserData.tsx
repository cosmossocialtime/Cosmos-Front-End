import { CaretDown, Check, Pencil } from 'phosphor-react'
import * as Select from '@radix-ui/react-select'
import LabelItem from './LabelItem'
import Input from './Input'
import { useEffect, useState } from 'react'
import { userProps } from '../../../types/user'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { api } from '../../../services/api'
import { LocationInput } from './LocationInput'
import { PasswordInput } from './PasswordInput'
import { ToastContainer, toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface FormUserDataProps {
  userData: userProps
  updateUserData: (newUser: userProps) => void
}
dayjs.extend(utc)

export default function FormUserData({
  userData,
  updateUserData,
}: FormUserDataProps) {
  const gendersOpt = ['Masculino', 'Feminino', 'Outro']
  const [otherGenderEnable, setOtherGenderEnable] = useState(false)
  const [enableForm, setEnableForm] = useState(false)
  const [newUserData, setNewUserData] = useState(userData)

  useEffect(() => {
    if (!gendersOpt.includes(newUserData.gender)) {
      setOtherGenderEnable(true)
    }
  }, [])

  function cancelChanges() {
    setNewUserData(userData)
    setEnableForm(false)
  }

  function handleLocation(state: string, city: string) {
    setNewUserData({ ...newUserData, city, state })
  }

  function defGender(gender: string) {
    if (gender === 'Outro') {
      setNewUserData({ ...newUserData, gender: '' })
      setOtherGenderEnable(true)
      return
    }

    setOtherGenderEnable(false)
    setNewUserData({ ...newUserData, gender })
  }

  function sendNewInfo() {
    const noData = Object.values(newUserData).some((data) => data === '')
    if (noData) {
      toast.error('Por favor, preencha todos os campos')
      return
    }

    api
      .put('/user', {
        fullName: newUserData.fullName,
        byname: newUserData.byname,
        birthdate: newUserData.birthdate,
        gender: newUserData.gender,
        country: newUserData.country,
        state: newUserData.state,
        city: newUserData.city,
      })
      .then((response) => {
        if (response.status === 200) {
          updateUserData(newUserData)
          setEnableForm(false)
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
        <LabelItem title="Nome Completo" enableForm={enableForm}>
          <Input
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
        </LabelItem>
        <LabelItem title="Data de nascimento" enableForm={enableForm}>
          <DatePicker
            disabled={!enableForm}
            className="flex-1 py-4 px-6 outline-none"
            selected={dayjs(newUserData.birthdate).toDate()}
            onChange={(date) => {
              date &&
                setNewUserData((prevState) => ({
                  ...prevState,
                  birthdate: date,
                }))
            }}
            dateFormat={'dd/MM/yyyy'}
          />
        </LabelItem>

        <LabelItem
          title="Nome pelo qual gostaria de ser chamando(a)"
          enableForm={enableForm}
        >
          <Input
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
        </LabelItem>
        <LocationInput
          cityData={newUserData.city}
          stateData={newUserData.state}
          handleLocation={handleLocation}
          enableForm={enableForm}
        />

        <LabelItem title="Gênero" enableForm={enableForm}>
          <Select.Root
            defaultValue={
              gendersOpt.includes(newUserData.gender)
                ? newUserData.gender
                : 'Outro'
            }
            disabled={!enableForm}
            onValueChange={(value) => defGender(value)}
          >
            <Select.Trigger className="group flex w-full items-center justify-between px-6 py-4">
              <Select.Value placeholder="Selecione seu gênero" />
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
              <Select.Viewport>
                {gendersOpt.map((item, index) => (
                  <Select.Item
                    key={index}
                    value={item}
                    className="flex cursor-pointer justify-between gap-6 rounded-md p-3 text-violet-500 hover:bg-violet-500 hover:text-white"
                  >
                    <Select.ItemText>{item}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check size={18} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </LabelItem>

        <LabelItem title="Senha" enableForm={enableForm}>
          <PasswordInput enableForm={enableForm} />
        </LabelItem>

        {otherGenderEnable && (
          <LabelItem title="Digite seu gênero" enableForm={enableForm}>
            <Input
              disabled={!enableForm}
              type="text"
              value={newUserData.gender}
              onChange={(e) =>
                setNewUserData({ ...newUserData, gender: e.target.value })
              }
            />
          </LabelItem>
        )}

        {!enableForm && (
          <button
            className="absolute -right-11 top-0 flex max-w-max translate-x-full items-center gap-2 rounded-lg border border-solid border-violet-600 py-3 px-8 text-lg font-semibold text-violet-600 transition-colors hover:bg-violet-600 hover:text-white"
            onClick={() => setEnableForm(true)}
          >
            <Pencil size={22} />
            Editar perfil
          </button>
        )}
      </form>
      {enableForm && (
        <div className="flex gap-16 self-end">
          <button
            className="rounded-lg py-3 font-semibold text-red-400 transition-colors hover:text-red-500"
            onClick={cancelChanges}
          >
            Cancelar
          </button>
          <button
            className="rounded-lg bg-violet-500 py-4 px-8 font-semibold text-white transition-colors hover:bg-violet-600"
            type="submit"
            onClick={sendNewInfo}
          >
            Salvar edição
          </button>
        </div>
      )}
      <ToastContainer autoClose={2000} limit={3} />
    </div>
  )
}
