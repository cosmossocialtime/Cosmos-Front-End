import * as Dialog from '@radix-ui/react-dialog';
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "../../../components/main-painel/Header";
import userData from "../../../data/userData";
import UploadImage from "../../../components/main-painel/profile/UploadImage";
import DialogPopUp from "../../../components/main-painel/profile/DialogPopUp";
import FormUserData from "../../../components/main-painel/profile/FormUserData";
import SettingCropArea from '../../../components/main-painel/profile/SettingCropArea';

export default function Perfil() {
    const [selectedFileUrl, setSelectedFileUrl] = useState(userData.profilePicture);
    const [imgCropped, setImgCropped] = useState("");
    const [onDialog, setOnDialog] = useState(false);
    const [enableForm, setEnableForm] = useState(false);

    function updateSrcFile(source: string) {
        setSelectedFileUrl(() => {
            return {
                ...selectedFileUrl,
                src: source
            }
        });
    }

    useEffect(() => {
        setImgCropped(userData.profilePicture.src)
    }, [])

    return (
        <div >
            <Header />

            <div className='relative pl-40 h-28 bg-perfil flex items-center gap-9'>
                <Image
                    className="absolute inset-x-0 h-28 object-cover"
                    src={userData.backgroundPicture}
                    alt=""
                />
                <div className='relative top-10'>
                    <Image
                        className='w-32 h-32 bg-slate-400 rounded-full border-4 border-solid border-white'
                        src={imgCropped}
                        alt="foto do usuario"
                        width={128}
                        height={128}
                        quality={100}
                    />

                    <UploadImage
                        updateSrcFile={updateSrcFile}
                        setOnDialog={setOnDialog}
                    />
                    <Dialog.Root open={onDialog}>
                        <Dialog.Portal>
                            <Dialog.Overlay className='z-10 top-0 left-0 fixed h-screen w-screen bg-black/40' />
                            <Dialog.Content className='z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <SettingCropArea
                                    selectedFileUrl={selectedFileUrl}
                                    setOnDialog={setOnDialog}
                                    setImgCropped={setImgCropped}
                                />
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>

                </div>

                <span className='z-[1] font-semibold text-3xl text-white'>{userData.name}</span>
            </div>

            <div className='flex flex-col items-center'>
                <FormUserData
                    userData={userData}
                    enableForm={enableForm}
                    setEnableForm={setEnableForm}
                />
                {!enableForm &&
                    <button
                        className='py-4 px-36 my-9 mx-auto bg-violet-500 hover:bg-violet-600 text-sm text-white font-semibold rounded-lg transition-colors'
                        onClick={() => setEnableForm(true)}
                    >
                        Editar
                    </button>
                }
            </div>

        </div>
    )
}