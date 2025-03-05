import React from "react";

export default function Home() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-4 flex items-center justify-between">
                <h1 className="text-blue-600 font-bold text-xl">COSMOS</h1>
                <span className="text-gray-600">[Nome da organização]</span>
            </header>
            {/* Main Content */}
            <main className="flex flex-1 p-6">
                {/* Program List */}
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Inscreva-se em uma nova aventura</h2>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <h3 className="text-blue-600 font-semibold">Nome do Programa</h3>
                                    <p className="text-gray-600 text-sm">A organização social atua na causa da educação</p>
                                </div>
                                <div className="text-gray-500 flex items-center">
                                    <span className="mr-2">📅 De dd/mm/aaaa</span>
                                    <span>Até dd/mm/aaaa</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Sidebar */}
                <aside className="w-64 ml-6 p-4 bg-white rounded-lg shadow">
                    <div className="bg-green-100 text-green-700 p-2 rounded flex items-center mb-4">
                        ✅ Conta criada com sucesso!
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-300 w-16 h-16 rounded-full mx-auto mb-2"></div>
                        <p className="text-gray-700">Complete as informações da Organização e conquiste uma medalha!</p>
                        <button className="mt-2 bg-blue-600 text-white py-1 px-3 rounded">Completar</button>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-gray-800 font-semibold mb-2">Minhas conquistas:</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>🏆 Um pequeno passo - Cadastro realizado</li>
                            <li className="opacity-50">🏆 Supernoval - Complete as informações</li>
                            <li className="opacity-50">🏆 Mestre das galáxias - Complete os dados da organização</li>
                        </ul>
                    </div>
                </aside>
            </main>
        </div>
    );
}