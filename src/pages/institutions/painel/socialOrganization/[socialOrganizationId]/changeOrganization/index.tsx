import { useState } from 'react'
import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import { Check } from 'phosphor-react'
import Link from 'next/link'

const instituition = [
  {
    id: 1,
    name: 'Cosmos Instituição',
    setor: 'Saúde',
    cargo: 'Administrador',
  },
  {
    id: 2,
    name: 'Cosmos Instituição',
    setor: 'Saúde',
    cargo: 'Administrador',
  },
]

export default function ChangeOrganizationPage() {
  const [currentOrg, setCurrentOrg] = useState<number | string>(1)

  return (
    <section>
      <DynamicHeader />

      <section className="min-h-screen w-full bg-gray-200 p-10">
        <div>
          <h4 className="font-bold text-gray-500">
            Organizações que faço parte
          </h4>
          <p className="text-gray-500">
            Selecione a organização que você quer acessar ou crie uma nova
          </p>
        </div>

        <section className="mt-10 flex w-full flex-wrap items-center justify-center gap-3 md:mt-0 md:min-h-[500px]">
          {instituition.map((v) => (
            <div
              key={v.id}
              className="h-[266px] w-[218px] rounded-md bg-white p-5 shadow-md"
            >
              <h1 className="font-bold">{v.name}</h1>
              <div className="mt-4">
                <h4>Área de trabalho</h4>
                <h3 className="font-bold">{v.setor}</h3>
              </div>
              <div className="mt-4">
                <h4>Cargo na organização</h4>
                <h3 className="font-bold">{v.cargo}</h3>
              </div>

              <div className="mt-7">
                {currentOrg === v.id ? (
                  <h1 className="flex items-center gap-2 text-blue-500">
                    Organização Atual <Check />
                  </h1>
                ) : (
                  <button
                    onClick={() => setCurrentOrg(v.id)}
                    className="text-violet-500"
                  >
                    Acessar
                  </button>
                )}
              </div>
            </div>
          ))}
          <Link
            href={'/institutions/painel/createOrganization'}
            className="flex h-[266px] w-[218px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-400 p-5 text-violet-400"
          >
            <h4>+</h4>
            <h4>Criar nova Instituição</h4>
          </Link>
        </section>
      </section>
    </section>
  )
}
