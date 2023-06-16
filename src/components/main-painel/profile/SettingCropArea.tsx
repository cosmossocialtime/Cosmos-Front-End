import { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import CropImage from "../../../utils/CropImage";

interface SettingCropAreaProps {
    selectedImgSrc: string;
    handleImg: (image : string) =>void
    aspectRatio: number;
    cropShape: "round" | "rect";
}

export default function SettingCropArea({
    selectedImgSrc, handleImg, aspectRatio, cropShape }: SettingCropAreaProps
) {
    const imgFile = new Image();
    imgFile.src = selectedImgSrc;

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState<Area>()

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedArea(croppedAreaPixels)
    }, []
    );



    function cropImg() {
        const imageSrc = CropImage(croppedArea!, selectedImgSrc)
        if (imageSrc){
            handleImg(imageSrc)
        }    
    }

    return (
        <div className="bg-gray-800 py-8 px-4 rounded-lg flex flex-col gap-6 items-center justify-center">
            <div className="relative w-96 h-96">
                <Cropper
                    image={selectedImgSrc}
                    crop={crop}
                    zoom={zoom}
                    zoomSpeed={0.1}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape={cropShape}
                    showGrid={false}
                    objectFit="contain"
                />
            </div>

            <button
                className="p-4 bg-violet-400 hover:bg-violet-600 transition-colors rounded text-white"
                onClick={() => cropImg()}
            >
                Cortar imagem
            </button>
        </div>
    )
}