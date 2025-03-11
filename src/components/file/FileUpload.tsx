import { useState } from "react";
import { Trash, Upload } from "phosphor-react";
import { FieldError } from "react-hook-form";

interface FileUploadProps {
    label: string;
    onFileChange: (file: File | null) => void;
    disabled?: boolean;
    error?: string | FieldError;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileChange, disabled = false, error }) => {
    const [file, setFile] = useState<File | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg"];

        if (selectedFile) {
            if (!validTypes.includes(selectedFile.type)) {
                setLocalError("Formato inválido. Apenas PDF, DOC, DOCX ou JPG são permitidos.");
                setFile(null);
                onFileChange(null);
                return;
            }

            setLocalError(null); // Limpa a mensagem de erro se for um arquivo válido
            setFile(selectedFile);
            onFileChange(selectedFile);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setLocalError(null);
        onFileChange(null);
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div
                className={`border-2 rounded-lg p-4 flex items-center justify-center ${file ? "bg-blue-50 border-blue-300" : "border-dashed border-gray-300"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-500"}`}
            >
                {!file ? (
                    <label className="flex flex-col items-center cursor-pointer">
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-gray-500 text-sm">Insira o documento ou imagem aqui</span>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={disabled}
                            accept=".pdf,.doc,.docx,.jpg"
                        />
                    </label>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button type="button" onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
                            <Trash size={16} />
                        </button>
                    </div>
                )}
            </div>
            {localError && <p className="text-red-500 text-sm mt-1">{localError}</p>}
            {error && <p className="text-red-500 text-sm mt-1">{typeof error === "string" ? error : error.message}</p>}
        </div>
    );
};

export default FileUpload;