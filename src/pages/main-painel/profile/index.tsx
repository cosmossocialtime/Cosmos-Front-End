import * as Dialog from '@radix-ui/react-dialog';
import Image from "next/image";
import { useEffect, useState } from "react";
import defaultBannerPerfil from '../../../assets/default-banner-perfil.png'

import { api } from '../../../services/api';
import { userProps } from '../../../types/user';
import { Camera } from 'phosphor-react';

import Header from "../../../components/main-painel/Header";
import UploadImage from "../../../components/main-painel/profile/UploadImage";
import FormUserData from "../../../components/main-painel/profile/FormUserData";
import SettingCropArea from '../../../components/main-painel/profile/SettingCropArea';
import { companyProps } from '../../../types/company';

export default function Perfil() {
    const [user, setUser] = useState<userProps | null>(null)
    const [company, setCompany] = useState<companyProps | null>(null)
    const [selectedImgSrc, setSelectedImgSrc] = useState("");
    const [cropType, setCroptType] = useState<"profile" | "banner">("profile")
    const [onDialog, setOnDialog] = useState(false);
    const [enableForm, setEnableForm] = useState(false);

    useEffect(() => {
        api.get("/dashboard")
            .then(response => {
                setUser(response.data.user)
                setCompany(response.data.company)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    if (!user || !company) {
        return;
    }

    async function updateImgServer(base64Image: string, route: string) {
        const blob = await fetch(base64Image).then((response) => response.blob())

        const formData = new FormData();
        formData.append('file', blob, 'image.jpg')

        api.patch(route, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    function updateProfileSrc(source: string) {
        setSelectedImgSrc(source);
        setCroptType("profile");
        setOnDialog(true)
    }
    function updateBannerSrc(source: string) {
        setSelectedImgSrc(source);
        setCroptType("banner");
        setOnDialog(true)
    }

    function handleProfileImg(image: string) {
        if (user) {
            setUser({ ...user, profilePicture: image });
        }

        updateImgServer(image, "/user/picture/profile")

        setOnDialog(false)
    }
    function handleBannerImg(image: string) {
        if (user) {
            setUser({ ...user, banner: image });
        }

        updateImgServer(image, "/user/picture/banner")

        setOnDialog(false)
    }

    return (
        <div >
            <Header />

            <div className='relative pl-40 h-28 flex items-center gap-9'>
                <Image
                    className="absolute w-full left-0 h-28 object-cover"
                    src={user.banner ? user.banner : defaultBannerPerfil}
                    width={2000}
                    height={112}
                    quality={100}
                    alt=""
                />
                <div className='absolute right-5 -bottom-4'>
                    <UploadImage
                        updateImgSrc={updateBannerSrc}
                    />
                </div>

                <div className='relative top-10 w-32 h-32 bg-slate-400 rounded-full border-4 border-solid border-white'>
                    {user.profilePicture ? (
                        <Image
                            className='rounded-full'
                            src={user.profilePicture}
                            alt="foto do usuario"
                            width={128}
                            height={128}
                            quality={100}
                        />
                    ) : (
                        <Camera size={64} className="text-gray-200" />
                    )}

                    <div className='absolute right-0 -bottom-2 '>
                        <UploadImage
                            updateImgSrc={updateProfileSrc}
                        />
                    </div>

                    <Dialog.Root open={onDialog}>
                        <Dialog.Portal>
                            <Dialog.Overlay className='z-10 top-0 left-0 fixed h-screen w-screen bg-black/40' />
                            <Dialog.Content className='z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                {cropType === "profile" &&(
                                    < SettingCropArea
                                        selectedImgSrc={selectedImgSrc}
                                        handleImg={handleProfileImg}
                                        aspectRatio={1/1}
                                        cropShape={"round"}
                                    />

                                )}
                                {cropType === "banner" && (
                                    < SettingCropArea
                                        selectedImgSrc={selectedImgSrc}
                                        handleImg={handleBannerImg}
                                        aspectRatio={10/1}
                                        cropShape={"rect"}
                                    />
                                )}
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                <span className='z-[1] font-semibold text-3xl text-white'>{user.byname}</span>
            </div>

            <div className='flex flex-col items-center'>
                <FormUserData
                    userData={user}
                    companyName={company.name}
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