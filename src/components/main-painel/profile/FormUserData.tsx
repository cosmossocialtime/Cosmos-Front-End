import { CaretDown, Lock, Pencil } from 'phosphor-react'
import LabelItem from './LabelItem'
import Input from './Input'
import { useState } from 'react'
import { userProps } from '../../../types/user'
import dayjs from 'dayjs'
import { api } from '../../../services/api'
import { toast } from 'react-toastify'

interface FormUserDataProps {
  userData: userProps
  companyName: string
  updateUserData: (newUser: userProps) => void
}

export default function FormUserData({
  userData,
  companyName,
  updateUserData,
}: FormUserDataProps) {
  const [enableForm, setEnableForm] = useState(false)
  const [newUserData, setNewUserData] = useState(userData)
  const genders = ['Masculino', 'Feminino', 'Outro']

  function sendNewInfo() {
    api
      .patch('/user/onboarding', {
        companyCode: newUserData.company,
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
        if (error.response.status === 400) return toast.error('Error')
      })
  }

  return (
    <div className="mx-auto flex max-w-max flex-1 flex-col justify-between py-8">
      <form className="grid w-max grid-cols-2 items-center justify-center gap-x-16 gap-y-5">
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
          <Input
            type="date"
            value={dayjs(newUserData.birthdate).format('YYYY-MM-DD')}
            disabled={!enableForm}
            onChange={(e) => {
              setNewUserData((prevState) => ({
                ...prevState,
                birthdate: dayjs(e.target.value).toDate(),
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
                byname: e.target.value,
              }))
            }}
          />
        </LabelItem>
        <LabelItem
          title="Código da empresa em que trabalha"
          enableForm={enableForm}
        >
          <Input
            type="text"
            value={companyName}
            disabled={!enableForm}
            onChange={(e) => {
              setNewUserData((prevState) => ({
                ...prevState,
                companyName: e.target.value,
              }))
            }}
          />
        </LabelItem>

        <LabelItem
          title="Gênero"
          enableForm={enableForm}
          className="relative cursor-pointer"
        >
          <>
            {enableForm ? (
              <input
                className="w-0 flex-1 bg-transparent outline-none"
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
            ) : (
              <span className="flex-1">{newUserData.gender}</span>
            )}
            <CaretDown weight="fill" />
            <div className="absolute inset-x-0 top-full ">
              {genders.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 cursor-pointer hover:bg-violet-500"
                  onClick={() => {
                    setNewUserData((prevState) => ({
                      ...prevState,
                      gender: item,
                    }))
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        </LabelItem>
        <LabelItem title="Senha" enableForm={enableForm}>
          <>
            <Lock size={24} />
            <Input type="text" value="*****" />
          </>
        </LabelItem>
      </form>
      {enableForm && (
        <div className="flex gap-16 self-end">
          <button
            className="rounded-lg py-3 font-semibold text-red-400 transition-colors hover:text-red-500"
            onClick={() => setEnableForm(false)}
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
      {!enableForm && (
        <button
          className="absolute right-16 top-0 my-9 flex max-w-max items-center gap-2 rounded-lg border-2 border-solid border-violet-600 py-4 px-8 text-lg font-semibold text-violet-600 transition-colors hover:bg-violet-600 hover:text-white"
          onClick={() => setEnableForm(true)}
        >
          <Pencil size={22} />
          Editar perfil
        </button>
      )}
    </div>
  )
}
