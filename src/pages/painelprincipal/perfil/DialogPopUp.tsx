import * as Dialog from '@radix-ui/react-dialog';
import { StaticImageData } from 'next/image';
import { SettingCropArea } from './SettingCropArea';

interface DialogPopUpProps {
    setImgCropped: React.Dispatch<React.SetStateAction<string>>;
    selectedFileUrl: StaticImageData;
    setOnDialog: React.Dispatch<React.SetStateAction<boolean>>;
    onDialog: boolean;
}

export function DialogPopUp({
    selectedFileUrl, setImgCropped, setOnDialog, onDialog }: DialogPopUpProps
) {
    return (
        <Dialog.Root open={onDialog}>
            <Dialog.Portal>
                <Dialog.Overlay className='z-10 top-0 left-0 fixed h-screen w-screen bg-black/40'/>
                <Dialog.Content className='z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <SettingCropArea
                        selectedFileUrl={selectedFileUrl}
                        setOnDialog={setOnDialog}
                        setImgCropped={setImgCropped}
                    />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}