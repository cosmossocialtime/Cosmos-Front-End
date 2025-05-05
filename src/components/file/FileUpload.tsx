import { useState, useRef } from 'react'
import { Trash, Upload } from 'phosphor-react'
import { FieldError } from 'react-hook-form'

interface FileUploadProps {
  label: string
  onFileChange: (file: File | null) => void
  disabled?: boolean
  error?: string | FieldError
  fileUrl?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onFileChange,
  disabled = false,
  error,
  fileUrl,
}) => {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    if (selectedFile) {
      setFile(selectedFile)
      onFileChange(selectedFile)
    }
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFile(null)
    onFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (disabled) return

    const droppedFile = event.dataTransfer.files?.[0] || null
    if (droppedFile) {
      setFile(droppedFile)
      onFileChange(droppedFile)
    }
  }

  // Renderização condicional para SSR
  if (typeof window === 'undefined') {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="h-[72px] rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {fileUrl && (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-sm text-blue-600 underline"
        >
          Visualizar arquivo enviado
        </a>
      )}
      <div
        className={`flex items-center justify-center rounded-lg border-2 p-4 transition ${
          file ? 'border-blue-300 bg-blue-50' : 'border-dashed border-gray-300'
        } ${
          disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:border-gray-500'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        role="button"
        aria-label="Upload de arquivo"
        tabIndex={0}
      >
        {!file ? (
          <div className="flex flex-col items-center">
            <Upload size={24} className="text-gray-400" />
            <span className="text-sm text-gray-500">
              Arraste um arquivo ou clique para selecionar
            </span>

            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={disabled}
              accept=".pdf,.doc,.docx,.jpg,.jpeg"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">{file.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
              aria-label="Remover arquivo"
            >
              <Trash size={16} />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </div>
  )
}

export default FileUpload
