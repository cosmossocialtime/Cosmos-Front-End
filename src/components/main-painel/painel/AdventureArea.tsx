import { Calendar, CaretRight, Check, Clock } from "phosphor-react";
import adventuresData from "../../../data/AdventuresData";
import Link from "next/link";
import { programsProps } from "../../../types/programs";
import dayjs from "dayjs";

interface AdventureAreaProps {
    programs: programsProps
}

export default function AdventureArea({ programs }: AdventureAreaProps) {
    return (
        <div className="flex-1 relative p-6 bg-[#1E2543] rounded-lg overflow-hidden">
            <span className="text-xl text-gray-500">
                inscreva-se em uma nova aventura
            </span>

            <div className="relative max-h-[16rem] pb-5 pr-4 overflow-y-auto scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">

                {programs.map((program, key) => (
                    <Link key={key} href="/usuario/adventure">

                        <div key={key} className="mt-4 bg-[#151B36] px-6 py-5 rounded-lg flex items-center">
                            <div className="flex-1">
                                <h2 className="font-semibold text-blue-300">{program.name}</h2>
                                <span className="text-sm text-gray-300">{program.description}</span>
                            </div>

                            {program.applied ? (
                                <div className="mr-4 py-2 px-3 bg-[#1E2543] flex gap-1 items-center rounded-full">
                                    <Check size={24} className="text-[#46CE9D]" />
                                    <span className="text-gray-400 text-xs">Você já se inscreveu nessa aventura!</span>
                                </div>
                            ) : (
                                <div className="mr-7 flex gap-6 text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Clock size={32} />
                                        <span className="text-xs">
                                            {5} horas <br />
                                            semanais
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar size={32} />
                                        <span className="text-xs">
                                            de {dayjs(program.startDate).format("DD/MM/YYYY")} <br />
                                            até {dayjs(program.endDate).format("DD/MM/YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <CaretRight size={24} className="text-blue-300 cursor-pointer" />
                        </div>
                    </Link>
                ))}
            </div>
            {adventuresData.length >= 3 &&
                <div className="absolute box-border left-0 right-4 bottom-0 m-6 h-12 bg-gradient-to-t from-[#1E2543]"></div>
            }
        </div>
    )
}