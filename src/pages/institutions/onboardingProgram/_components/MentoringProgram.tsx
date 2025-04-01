"use client";

import Image from 'next/image';
import Layout from '../../../../components/Layout';
import { useEffect, useState } from 'react';

interface ProgramData {
    name: string
    startDate: string
    endDate: string
    hoursPerWeek: string
    description: string
    companyLogo: string
}

export default function MentoringProgramPage() {
    const [data, setData] = useState<ProgramData | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('🔄 Buscando dados...')

                const res = await fetch('/api/getProgramData');

                if (!res.ok) {
                    throw new Error(`Erro ao buscar dados: ${res.status} ${res.statusText}`);
                }

                const result: ProgramData = await res.json()
                console.log('✅ Dados recebidos:', result)

                setData(result)
            } catch (error) {
                console.error('❌ Erro ao buscar os dados:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <Layout>
            {data === null ? (
                <p>Carregando...</p>
            ) : (
                <div className="w-[980px] mb-4">
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-2xl font-semibold text-gray-900">{data?.name}</h1>


                        {/* Logo dinâmica */}
                        {data.companyLogo && (
                            <div className="w-[100px] h-[32px] relative">
                                <Image src={data?.companyLogo} alt="Logo da empresa" width={100} height={32} />
                            </div>
                        )}
                    </div>


                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-4">
                        <Image src="/images/Calendar.png" alt="Ícone de Calendário" width={20} height={20} />
                        <span>De {data?.startDate} até {data?.endDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                        <Image src="/images/Clock.png" alt="Ícone de Relógio" width={20} height={20} />
                        <span>{data?.hoursPerWeek}</span>
                    </div>

                    <div className="mt-4 border border-gray-300 pt-4 rounded-md text-gray-700">
                        {data.description.split("\n").map((paragraph, index) => (
                            <p key={index} className="mb-2">{paragraph}</p>
                        ))}
                    </div>

                    <div className="pt-[12px] w-[248px]">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
                            Embarcar nesta jornada
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
}
