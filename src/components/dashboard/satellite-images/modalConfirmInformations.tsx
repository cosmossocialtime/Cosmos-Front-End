import { X, Warning } from 'phosphor-react'
import { useState } from 'react'
import { SocialOrganizationProps } from '../../../types/socialOrganization'
import { CustomCheckbox } from '../../Button/CustomCheckbox'
import { Button } from '../../Button/ButtonSubmit'
import { ButtonSecondary } from '../../Button/ButtonSubmitSecondary'

interface ConfirmInformationsModalProps {
  onConfirm: () => void
  onCancel: () => void
  socialOrganization: SocialOrganizationProps
}

export function ConfirmInformationsModal({
  onConfirm,
  onCancel,
  socialOrganization,
}: ConfirmInformationsModalProps) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50">
      <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        {/* Botão de fechar */}
        <button
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-800"
          onClick={onCancel}
        >
          <X size={20} />
        </button>

        {/* Alerta com ícone */}
        <div className="mb-4 flex items-center gap-2">
          <Warning size={32} className="text-red-500" />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">
            As informações enviadas agora serão usadas pelos voluntários até o
            fim do programa
          </h2>
        </div>

        {/* Texto descritivo */}
        <p className="mb-4 text-base text-gray-600">
          Edições futuras atualizarão apenas o sistema da{' '}
          {socialOrganization.name}, sem alterar o que os voluntários já
          receberam.
        </p>
        <p className="mb-4 text-base text-gray-600">
          Certifique-se de que todos os dados da organização estejam atualizados
          para aproveitar ao máximo o programa.
        </p>

        {/* Checkbox */}
        <div className="mb-6 flex items-start gap-2 text-sm text-gray-700">
          <CustomCheckbox
            checked={isChecked}
            setChecked={() => setIsChecked(!isChecked)}
            labelText="Confirmo que li o aviso e que as informações estão atualizadas"
          />
        </div>

        {/* Botões */}
        <div className="mt-12 flex items-center gap-[32px]">
          {/* Botão primário com largura fixa */}
          <button
            onClick={onConfirm}
            disabled={!isChecked}
            className="h-[48px] w-[240px] rounded-md bg-violet-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            Enviar informações
          </button>

          {/* Botão secundário alinhado */}
          <button
            onClick={onCancel}
            className="h-[48px] w-[163px] rounded-md border border-solid border-gray-300 bg-transparent px-6 py-3 font-semibold text-blue-400 transition-colors hover:bg-blue-50"
          >
            Não enviar
          </button>
        </div>
      </div>
    </div>
  )
}
