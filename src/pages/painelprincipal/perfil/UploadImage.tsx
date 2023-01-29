import { StaticImageData } from "next/image";
import { Pencil } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import Dropzone from "react-dropzone"

interface UploadImageProps {
    updateSrcFile: (source: string) => void;
    setOnDialog: Dispatch<SetStateAction<boolean>>;
}

export function UploadImage({ updateSrcFile, setOnDialog }: UploadImageProps) {
    function handleSelecteFile(acceptedFiles: File[]) {
        const file = acceptedFiles[0];
        updateSrcFile(URL.createObjectURL(file))
    }

    return (
        <Dropzone
            maxFiles={1}
            accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
            onDropAccepted={acceptedFiles => {
                handleSelecteFile(acceptedFiles)
                setOnDialog(true)
            }}
        >
            {({ getInputProps }) => (
                <label>
                    <input {...getInputProps()} />
                    <Pencil className='absolute right-0 -bottom-2 w-10 h-10 p-2 text-white bg-[#5200AB] rounded-full border-2 border-white cursor-pointer'/>
                </label>
            )}
        </Dropzone>
    )
}