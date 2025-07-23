import { X, MapPin, Star, UsersFour, CheckCircle } from 'phosphor-react'
import { SocialOrganizationProps } from '../../../types/socialOrganization'
import formatCurrency from '../../../utils/formatCurrency'
import { useEffect, useState } from 'react'
import { Option } from '../../../types/MultiselectCombobox'
import axios from 'axios'

interface OrganizationModalProps {
  socialOrganization?: SocialOrganizationProps
  onClose: () => void
}

interface cityProps {
  id: number
  nome: string
}
interface stateProps extends cityProps {
  sigla: string
}

export default function InstitutionInfoModal({
  socialOrganization,
  onClose,
}: OrganizationModalProps) {
  const [selectedCidade, setSelectedCidade] = useState<Option | null>(null)

  useEffect(() => {
    axios
      .get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      )
      .then(({ data: estados }: { data: stateProps[] }) => {
        const states = estados.map((c) => {
          return {
            id: c.id,
            value: c.sigla,
            label: c.nome,
          }
        })
        const estadoEncontrado = states.find(
          (e) => e.value === String(socialOrganization?.state)
        )
        if (
          estadoEncontrado !== undefined &&
          socialOrganization?.city !== null &&
          socialOrganization?.city !== undefined
        ) {
          axios
            .get(
              `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoEncontrado?.id}/municipios`
            )
            .then(({ data: cidades }: { data: cityProps[] }) => {
              const cidadeEncontrado = cidades.find(
                (c) => c.id === Number(socialOrganization.city || 0)
              )
              if (cidadeEncontrado !== undefined) {
                setSelectedCidade({
                  value: String(cidadeEncontrado.id),
                  label: cidadeEncontrado.nome,
                })
              }
            })
            .catch(() => {
              console.error('Não foi possível obter a lista de cidades:')
            })
        }
      })
  }, [])
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Cabeçalho */}
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          {socialOrganization?.name}
        </h2>

        {/* Informações rápidas */}
        <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-800">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-grey-800" />
            {selectedCidade?.label} - {socialOrganization?.state}
          </div>
          <div className="flex items-center gap-2">
            <UsersFour size={18} className="text-grey-800" />
            {socialOrganization?.collaborators} Colaboradores
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-grey-800" />
            {socialOrganization?.beneficiaries} Beneficiários
          </div>
          <div className="flex items-center gap-2">
            <Star size={18} className="text-grey-800" />
            {socialOrganization?.annualRevenue !== undefined
              ? formatCurrency(String(socialOrganization?.annualRevenue))
              : ''}{' '}
            Receita anual
          </div>
        </div>

        {/* Seções do conteúdo */}
        <div className="space-y-6">
          {/* Causas */}
          <div>
            <h3 className="mb-1 text-sm text-gray-500">Causa(s) em que atua</h3>
            <div className="flex flex-row gap-1">
              {socialOrganization?.causes.map((causa, index) => (
                <span
                  key={index}
                  className="w-fit rounded-full border border-solid border-blue-300 bg-blue-50 px-3 py-1 text-xs font-medium text-gray-800"
                >
                  {causa.label}
                </span>
              ))}
            </div>
          </div>

          {/* História da instituição */}
          <div>
            <h3 className="mb-1 text-sm text-gray-500">
              História da instituição
            </h3>
            <p className="break-words text-sm text-gray-800">
              {socialOrganization?.history}
            </p>
          </div>

          {/* Atuação */}
          <div>
            <h3 className="mb-1 text-sm text-gray-500">
              Atuação e o impacto da organização
            </h3>
            <p className="break-words text-sm text-gray-800">
              {socialOrganization?.socialImpact}
            </p>
          </div>

          {/* Necessidades */}
          <div>
            <h3 className="mb-1 text-sm text-gray-500">
              Principais necessidades e desafios que a organização enfrenta no
              momento
            </h3>
            <p className="break-words text-sm text-gray-800">
              {socialOrganization?.mainChallenges}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
