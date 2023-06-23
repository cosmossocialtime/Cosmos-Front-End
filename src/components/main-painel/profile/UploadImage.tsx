import { Pencil } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import Dropzone from "react-dropzone"

interface UploadImageProps {
    updateImgSrc: (source: string) => void;
}

export default function UploadImage({ updateImgSrc }: UploadImageProps) {
    function handleSelecteFile(acceptedFiles: File[]) {
        const file = acceptedFiles[0];
        updateImgSrc(URL.createObjectURL(file))
    }

    return (
        <Dropzone
            maxFiles={1}
            accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
            onDropAccepted={acceptedFiles => {
                handleSelecteFile(acceptedFiles)}}
        >
            {({ getInputProps }) => (
                <label>
                    <input {...getInputProps()} />
                    <Pencil size={24} className=' w-10 h-10 p-2 bg-[#5200AB] text-white cursor-pointer border-2 border-solid border-white rounded-full' />
                </label>
            )}
        </Dropzone>
    )
}