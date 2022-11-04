import { UploadSimple } from "phosphor-react";
import { useState } from "react";
import "../../mainTailwind.css";

const Upload = () => {
  const [userProfile, setUserProfile] = useState<string | ArrayBuffer | null>("");

  function UploadImage(img: File[]) {
    const reader = new FileReader();
    reader.readAsDataURL(img[0]);
    reader.onload = () => {
      const image = reader.result;
      setUserProfile(image)
      console.log(image);
    };
  }

  return (
    <>
      <main className={`bg-bgnave h-screen flex items-center justify-center`}>
        <div className="w-[328px] h-[471px] bg-blue-600/30 rounded-2xl backdrop-blur-md p-6">
          <form
            encType="multipart/form-data"
            className="w-full bg-white aspect-square rounded-md p-5"
          >
            <label className="cursor-pointer flex flex-col items-center justify-center w-full aspect-square bg-slate-200 border-dashed border-2 rounded-md border-slate-400">
              <UploadSimple className="text-[2rem]" />
              <p className="text-lg">Insira sua foto aqui</p>
              <input
                type="file"
                name="fotoUsuario"
                className="hidden"
                accept="image/*"
                onChange={(e) => UploadImage(e.target.files)}
              />
            </label>
          </form>
          <div className="text-white flex flex-col gap-4 mt-4">
            <h3 className="text-2xl">Nome da Pessoa</h3>
            <p>[Função] em uma jornada para mentorar a [Nome da Instituição]</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Upload;
