import { CaretDown, Check, Lock, Pencil } from 'phosphor-react';
import * as Select from '@radix-ui/react-select';
import LabelItem from './LabelItem';
import Input from './Input';
import { useEffect, useState } from 'react';
import { userProps } from '../../../types/user';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { api } from '../../../services/api';
import { LocationInput } from './LocationInput';
import { PasswordInput } from './PasswordInput';
import { ToastContainer, toast } from 'react-toastify'

interface FormUserDataProps {
    userData: userProps
    updateUserData: (newUser: userProps) => void
}
dayjs.extend(utc)

export default function FormUserData({ userData, updateUserData }: FormUserDataProps) {
    const gendersOpt = ["Masculino", "Feminino", "Outro"]
    const [otherGenderEnable, setOtherGenderEnable] = useState(false)
    const [enableForm, setEnableForm] = useState(false);
    const [newUserData, setNewUserData] = useState(userData)

    useEffect(() => {
        if (!gendersOpt.includes(newUserData.gender)){
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
        if (gender === "Outro") {
            setNewUserData({...newUserData, gender: "" })
            setOtherGenderEnable(true)
            return;
        }

        setOtherGenderEnable(false)
        setNewUserData({ ...newUserData, gender })
    }

    function sendNewInfo() {
        const noData = Object.values(newUserData).some(data => data === "")
        if (noData) {
            toast.error("Por favor, preencha todos os campos")
            return;
        }

        api.put("/user", {
            fullName: newUserData.fullName,
            byname: newUserData.byname,
            birthdate: newUserData.birthdate,
            gender: newUserData.gender,
            country: newUserData.country,
            state: newUserData.state,
            city: newUserData.city
        }).then(response => {
            if (response.status === 200) {
                updateUserData(newUserData)
                setEnableForm(false)
                toast.success("Dados atualizados com sucesso!")
            }
        }).catch((error: any) => {
            if (error.response.status === 400) return toast.error("Sem Autorização")
        })
    }
    return (
        <div className='py-8 flex-1 mx-auto max-w-max flex flex-col justify-between'>
            <form className='relative w-max grid grid-cols-2 gap-x-16 gap-y-5 items-center justify-center'>
                <LabelItem title='Nome Completo' enableForm={enableForm}>
                    <Input
                        type="text"
                        value={newUserData.fullName}
                        disabled={!enableForm}
                        onChange={(e) => { setNewUserData(prevState => ({ ...prevState, fullName: e.target.value })) }} />
                </LabelItem>
                <LabelItem title='Data de nascimento' enableForm={enableForm}>
                    <Input
                        type="date"
                        value={dayjs(newUserData.birthdate).utc().format("YYYY-MM-DD")}
                        disabled={!enableForm}
                        onChange={(e) => { setNewUserData(prevState => ({ ...prevState, birthdate: e.target.value })) }} />
                </LabelItem>

                <LabelItem title='Nome pelo qual gostaria de ser chamando(a)' enableForm={enableForm}>
                    <Input
                        type="text"
                        value={newUserData.byname}
                        disabled={!enableForm}
                        onChange={(e) => { setNewUserData(prevState => ({ ...prevState, byname: e.target.value })) }}
                    />
                </LabelItem>
                <LocationInput
                    cityData={newUserData.city}
                    stateData={newUserData.state}
                    handleLocation={handleLocation}
                    enableForm={enableForm}

                />

                <LabelItem title='Gênero' enableForm={enableForm}>
                    <Select.Root
                        defaultValue={gendersOpt.includes(newUserData.gender) ? newUserData.gender : "Outro"}
                        disabled={!enableForm}
                        onValueChange={(value) => defGender(value)}
                    >
                        <Select.Trigger className='px-6 py-4 group w-full flex items-center justify-between'>
                            <Select.Value placeholder="Selecione seu gênero" />
                            <Select.Icon>
                                <CaretDown weight='fill' className='text-violet-500 group-data-[disabled]:opacity-20' />
                            </Select.Icon>
                        </Select.Trigger>

                        <Select.Content side='bottom' sideOffset={16} position='popper' className='w-full bg-white rounded p-2 shadow'>
                            <Select.Viewport>
                                {gendersOpt.map((item, index) => (
                                    <Select.Item
                                        key={index}
                                        value={item}
                                        className='p-3 cursor-pointer text-violet-500 hover:text-white hover:bg-violet-500 flex gap-6 justify-between rounded-md'
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

                <LabelItem title='Senha' enableForm={enableForm}>
                    <PasswordInput enableForm={enableForm}/>
                </LabelItem>

                {otherGenderEnable &&
                    <LabelItem title="Digite seu gênero" enableForm={enableForm}>
                        <Input
                            disabled={!enableForm}
                            type='text'
                            value={newUserData.gender}
                            onChange={(e) => setNewUserData({ ...newUserData, gender: e.target.value })}
                        />
                    </LabelItem>
                }

                {!enableForm &&
                    <button
                        className='absolute -right-11 translate-x-full top-0 py-3 px-8 max-w-max flex items-center gap-2 hover:bg-violet-600 hover:text-white text-lg text-violet-600 font-semibold border border-solid border-violet-600 rounded-lg transition-colors'
                        onClick={() => setEnableForm(true)}
                    >
                        <Pencil size={22} />
                        Editar perfil
                    </button>
                }

            </form>
            {enableForm &&
                <div className='self-end flex gap-16'>
                    <button
                        className='py-3 text-red-400 hover:text-red-500 font-semibold rounded-lg transition-colors'
                        onClick={cancelChanges}
                    >

                        Cancelar
                    </button>
                    <button
                        className='py-4 px-8 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg transition-colors'
                        type='submit'
                        onClick={sendNewInfo}
                    >
                        Salvar edição
                    </button>
                </div>
            }
            
        <ToastContainer autoClose={2000} limit={3} />
        </div>
    )
}