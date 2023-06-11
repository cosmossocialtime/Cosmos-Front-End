import { Envelope, Eye, EyeSlash, Lock } from 'phosphor-react';
import LabelItem from './LabelItem';
import Input from './Input';
import { useState } from 'react';
import { userProps } from '../../../types/user';
import dayjs from 'dayjs';

interface FormUserDataProps {
    userData: userProps
    setEnableForm: React.Dispatch<React.SetStateAction<boolean>>
    enableForm: boolean
}

export default function FormUserData({ userData, setEnableForm, enableForm }: FormUserDataProps) {
    const [typeInputPassword, setTypeInputPassword] = useState("password")
    const [confirmTypeInputPassword, setConfirmTypeInputPassword] = useState("password")

    function changeTypeInput(inputType: string) {
        inputType === "password" ? inputType = "text" : inputType = "password";
        return inputType
    }

    const [newUserData, setNewUserData] = useState(userData)

    return (
        <form className='mt-6 w-max mx-auto grid grid-cols-2 gap-x-16 gap-y-5 items-center justify-center'>
            <LabelItem title='Nome pelo qual gostaria de ser chamando(a)' enableForm={enableForm}>
                <Input type="text" value={newUserData.fullName} disabled={!enableForm} onChange={(e) => { setNewUserData(prevState => ({ ...prevState, name: e.target.value })) }} />
            </LabelItem>
            <LabelItem title='Data de nascimento' enableForm={enableForm}>
                <Input type="date" value={dayjs(newUserData.birthdate).format("AAAA-MM-DD")} disabled={!enableForm} onChange={(e) => { setNewUserData(prevState => ({ ...prevState, birthDate: e.target.value })) }} />
            </LabelItem>

            <LabelItem title='Gênero' enableForm={enableForm}>
                <Input type="text" value={newUserData.gender} disabled={!enableForm} onChange={(e) => { setNewUserData(prevState => ({ ...prevState, genre: e.target.value })) }} />
            </LabelItem>
            <LabelItem title='CEP' enableForm={enableForm}>
                <Input type="text" pattern="\d{5}-\d{3}" value={""} disabled={!enableForm} onChange={(e) => { setNewUserData(prevState => ({ ...prevState, cep: e.target.value })) }} />
            </LabelItem>

            <LabelItem title='Email' enableForm={enableForm}>
                <>
                    <Envelope size={23} />
                    <Input type="email" value={newUserData.email} disabled={!enableForm} onChange={(e) => { setNewUserData(prevState => ({ ...prevState, email: e.target.value })) }} />
                </>
            </LabelItem>
            <LabelItem title='Código da empresa em que trabalha' enableForm={enableForm}>
                <Input type="text" value={newUserData.company} disabled={!enableForm} />
            </LabelItem>

            <LabelItem title='Senha' enableForm={enableForm}>
                <>
                    <Lock size={24} />
                    <Input type={typeInputPassword} value={!enableForm ? "*****" : ""} disabled={!enableForm} />
                    {typeInputPassword === "password" ? (
                        <EyeSlash
                            size={24}
                            className="cursor-pointer"
                            onClick={() => enableForm && setTypeInputPassword("text")}
                        />
                    ) : (
                        <Eye
                            size={24}
                            className="cursor-pointer"
                            onClick={() => enableForm && setTypeInputPassword("password")}
                        />
                    )}
                </>
            </LabelItem>

            {enableForm &&
                <>
                    <button
                        className='py-4 mt-4 mb-9 bg-violet-500 hover:bg-violet-600 text-sm text-white font-semibold rounded-lg transition-colors'
                        type='submit'
                    >
                        Salvar
                    </button>
                    <button
                        className='py-3 mt-4 mb-9 text-violet-500 border-2 border-violet-500 rounded-lg hover:text-white hover:border-blue-400 hover:bg-blue-400 transition-all'
                        onClick={() => setEnableForm(false)}
                    >

                        Cancelar
                    </button>
                </>
            }
        </form>
    )
}