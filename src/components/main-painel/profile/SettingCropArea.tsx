import { StaticImageData } from "next/image";
import { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import CropImage from "../../../utils/CropImage";
import { api } from "../../../services/api";
import html2canvas from 'html2canvas';

interface SettingCropAreaProps {
    selectedFileUrl: StaticImageData;
    setOnDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setImgCropped: React.Dispatch<React.SetStateAction<string>>;
}

export default function SettingCropArea({
    selectedFileUrl, setOnDialog, setImgCropped }: SettingCropAreaProps
) {
    const imgFile = new Image();
    imgFile.src = selectedFileUrl.src;

    const cropSize = 300;
    const cropArea = 360;
    const proportionOfSizeToArea = Number((cropSize / cropArea).toFixed(2));

    const aspectImg = (imgFile.height / imgFile.width);

    const zoomDefault = aspectImg > 1
        ? aspectImg * proportionOfSizeToArea
        : (1 / aspectImg) * proportionOfSizeToArea;

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState<Area>()

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedArea(croppedAreaPixels)
    }, []
    );

    async function updateImgProfile(base64Image: string) {
        const blob = await fetch(base64Image).then((response) => response.blob())

        const formData = new FormData();
        formData.append('file', blob, 'image.jpg')
        const canvas = document.createElement('canvas');
        const imgJPEG = canvas.toDataURL('image/jpeg')
        api.patch("/user/picture/profile", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    function cropImg() {
        const imageSrc = CropImage(croppedArea!, selectedFileUrl.src)
        if (imageSrc){
            setImgCropped(imageSrc)
            updateImgProfile(imageSrc)   
        }
    
        setOnDialog(false)
    }

    return (
        <div className="bg-gray-800 py-8 px-4 rounded-lg flex flex-col gap-6 items-center justify-center">
            <div className="relative w-96 h-96">
                <Cropper
                    image={selectedFileUrl.src}
                    crop={crop}
                    zoom={zoom}
                    minZoom={zoomDefault}
                    zoomSpeed={0.1}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape="round"
                    cropSize={{ width: cropSize, height: cropSize }}
                    showGrid={false}
                    objectFit="contain"
                />
            </div>

            <button
                className="p-4 bg-blue-400 rounded text-white"
                onClick={() => cropImg()}
            >
                Cortar imagem
            </button>
        </div>
    )
}