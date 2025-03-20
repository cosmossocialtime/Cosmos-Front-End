import React from 'react'
import DynamicHeader from '../../../components/main-painel/DynamicHeader'

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Header */}
      {/* <header className="flex items-center justify-between bg-white p-4 shadow">
        <h1 className="text-xl font-bold text-blue-600">COSMOS</h1>
        <span className="text-gray-600">[Nome da organização]</span>
      </header> */}
      <DynamicHeader organizationName={`Ranetium Organization`} />
      {/* Main Content */}
      <main className="flex flex-1 p-6">
        {/* Program List */}
        <div className="flex-1">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Inscreva-se em uma nova aventura
          </h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
              >
                <div>
                  <h3 className="font-semibold text-blue-600">
                    Nome do Programa
                  </h3>
                  <p className="text-sm text-gray-600">
                    A organização social atua na causa da educação
                  </p>
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="mr-2">📅 De dd/mm/aaaa</span>
                  <span>Até dd/mm/aaaa</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Sidebar */}
        <aside className="ml-6 w-64 rounded-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center rounded bg-green-100 p-2 text-green-700">
            ✅ Conta criada com sucesso!
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-gray-300"></div>
            <p className="text-gray-700">
              Complete as informações da Organização e conquiste uma medalha!
            </p>
            <button className="mt-2 rounded bg-blue-600 px-3 py-1 text-white">
              Completar
            </button>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 font-semibold text-gray-800">
              Minhas conquistas:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>🏆 Um pequeno passo - Cadastro realizado</li>
              <li className="opacity-50">
                🏆 Supernoval - Complete as informações
              </li>
              <li className="opacity-50">
                🏆 Mestre das galáxias - Complete os dados da organização
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}
