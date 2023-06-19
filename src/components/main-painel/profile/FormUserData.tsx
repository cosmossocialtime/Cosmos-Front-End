import { Eye, EyeSlash, Lock } from 'phosphor-react'
import LabelItem from './LabelItem'
import Input from './Input'
import { Dispatch, SetStateAction, useState } from 'react'
import { userProps } from '../../../types/user'
import dayjs from 'dayjs'

interface FormUserDataProps {
  userData: userProps
  companyName: string
  setEnableForm: Dispatch<SetStateAction<boolean>>
  enableForm: boolean
}

export default function FormUserData({
  userData,
  companyName,
  setEnableForm,
  enableForm,
}: FormUserDataProps) {
  const [typeInputPassword, setTypeInputPassword] = useState('password')
  //   const [confirmTypeInputPassword, setConfirmTypeInputPassword] =
  //     useState('password')

  //   function changeTypeInput(inputType: string) {
  //     inputType === 'password' ? (inputType = 'text') : (inputType = 'password')
  //     return inputType
  //   }

  const [newUserData, setNewUserData] = useState(userData)

  return (
    <form className="mx-auto mt-6 grid w-max grid-cols-2 items-center justify-center gap-x-16 gap-y-5">
      <LabelItem title="Nome Completo" enableForm={enableForm}>
        <Input
          type="text"
          value={newUserData.fullName}
          disabled={!enableForm}
          onChange={(e) => {
            setNewUserData((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }}
        />
      </LabelItem>
      <LabelItem title="Data de nascimento" enableForm={enableForm}>
        <Input
          type="date"
          value={dayjs(newUserData.birthdate).format('YYYY-MM-DD')}
          disabled={!enableForm}
          onChange={(e) => {
            setNewUserData((prevState) => ({
              ...prevState,
              birthDate: e.target.value,
            }))
          }}
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
              name: e.target.value,
            }))
          }}
        />
      </LabelItem>
      <LabelItem
        title="Código da empresa em que trabalha"
        enableForm={enableForm}
      >
        <Input type="text" value={companyName} disabled={!enableForm} />
      </LabelItem>

      <LabelItem title="Gênero" enableForm={enableForm}>
        <Input
          type="text"
          value={newUserData.gender}
          disabled={!enableForm}
          onChange={(e) => {
            setNewUserData((prevState) => ({
              ...prevState,
              genre: e.target.value,
            }))
          }}
        />
      </LabelItem>

      <LabelItem title="Senha" enableForm={enableForm}>
        <>
          <Lock size={24} />
          <Input
            type={typeInputPassword}
            value={!enableForm ? '*****' : ''}
            disabled={!enableForm}
          />
          {typeInputPassword === 'password' ? (
            <EyeSlash
              size={24}
              className="cursor-pointer"
              onClick={() => enableForm && setTypeInputPassword('text')}
            />
          ) : (
            <Eye
              size={24}
              className="cursor-pointer"
              onClick={() => enableForm && setTypeInputPassword('password')}
            />
          )}
        </>
      </LabelItem>

      {enableForm && (
        <>
          <button
            className="mt-4 mb-9 rounded-lg bg-violet-500 py-4 text-sm font-semibold text-white transition-colors hover:bg-violet-600"
            type="submit"
          >
            Salvar
          </button>
          <button
            className="mt-4 mb-9 rounded-lg border-2 border-violet-500 py-3 text-violet-500 transition-all hover:border-blue-400 hover:bg-blue-400 hover:text-white"
            onClick={() => setEnableForm(false)}
          >
            Cancelar
          </button>
        </>
      )}
    </form>
  )
}
