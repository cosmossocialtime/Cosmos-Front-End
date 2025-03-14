import { FieldValues, UseFormRegister, UseFormTrigger } from "react-hook-form";
import { useState } from "react";

interface TextAreaFieldProps {
  dynamicLabel?: string;
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  error?: string;
  minLength?: number;
  maxLength?: number;
}

export default function TextAreaField({
  label,
  name,
  placeholder,
  dynamicLabel = "",
  register,
  trigger,
  minLength = 100,
  maxLength = 300,
}: TextAreaFieldProps) {
  const [charCount, setCharCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valueLength = e.target.value.length;
    setCharCount(valueLength);
    setHasInteracted(true);
  };

  const handleBlur = async () => {
    setHasInteracted(true); 
    await trigger(name); 
  };

  const isMaxReached = charCount >= maxLength;
  const isMinNotReached = hasInteracted && charCount < minLength; 

  return (
    <div className="w-full border border-gray-300 rounded-lg p-4 hover:border-purple-500 focus-within:border-purple-500 transition-all duration-200">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label.replace("[Nome do programa]", dynamicLabel)}
      </label>
      <div className="relative">
        <textarea
          {...register(name, {
            onChange: (e) => setCharCount(e.target.value.length),
            onBlur: async () => {
              await trigger(name); // Garante que a validação acontece ao sair do campo
            }

          })}
          id={name}
          placeholder={placeholder}
          rows={4}
          maxLength={maxLength}
          onChange={handleChange}
          className={`w-full rounded-md border border-solid p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${isMaxReached ? "border-red-500" : "border-gray-400"
            }`}
        />
        <span className={`absolute bottom-4 right-3 text-xs ${isMaxReached ? "text-red-500" : "text-gray-500"}`}>
          {charCount} caracteres (De {minLength} a {maxLength})
        </span>
      </div>
      {isMinNotReached && (
        <p className="text-red-500 text-sm mt-1">
          O campo é obrigatório, limite mínimo de {minLength} caracteres
        </p>
      )}
      {isMaxReached && <p className="text-red-500 text-sm mt-1">O limite de caracteres já foi atingido</p>}
    </div>
  );
}
