import Link from "next/link";
import { ArrowLeft, ArrowRight, CaretDown, X } from "phosphor-react";
import TermsOfUse from "./TermsOfUse";

export default function ApplicationForm() {
    return (
        <div>
            <header className="relative px-20 py-7 flex gap-7 items-center shadow-lg after:w-full after:h-[6px] after:absolute after:left-0 after:bottom-0 after:bg-gradient-to-l after:from-violet-400 after:to-blue-300">
                <div className="flex-1">
                    <span className="text-gray-500 text-xl">formulário de inscrição</span>
                    <h1 className="text-gray-600 text-3xl font-semibold">[Nome do programa]</h1>
                </div>
                <X size={24} className="cursor-pointer" />
            </header>
            <TermsOfUse />

            {/* <form className="mt-14 w-[29rem] mx-auto text-gray-800 flex flex-col gap-10">
                <div className="">
                    <span className="block">Quanto tempo de experiência profissional você possui? </span>
                    <div className="px-3 h-12 w-full flex items-center justify-between border border-solid border-gray-400 rounded cursor-pointer">
                        <span className="opacity-25">
                            Opções
                        </span>
                        <CaretDown size={16} weight="fill" className="text-violet-500" />
                    </div>
                    <div className="flex flex-col p-4 border border-solid border-gray-400">
                        <span>Menos de 2 anos</span>
                        <span>Entre 2 e 5 anos</span>
                        <span>Entre 5 e 10 anos</span>
                        <span>Mais de 10 anos</span>
                    </div>
                </div>

                <div>
                    <span>Em que cargo e em que setor você atua?</span>
                    <div className="flex gap-4">
                        <input
                            className="px-3 h-12 w-1/2 border border-solid border-gray-400 placeholder:text-gray-800 placeholder:opacity-25 rounded cursor-pointer"
                            type="text"
                            placeholder="Cargo"
                        />
                        <input
                            className="px-3 h-12 w-1/2 border border-solid border-gray-400 placeholder:text-gray-800 placeholder:opacity-25 rounded cursor-pointer"
                            type="text"
                            placeholder="Setor"
                        />
                    </div>
                </div>

                <label htmlFor="">
                    Quanto tempo você tem disponível para o programada?
                    <div className="px-3 h-12 w-full flex items-center justify-between border border-solid border-gray-400 rounded cursor-pointer">
                        <span className="opacity-25">
                            Opções
                        </span>
                        <CaretDown size={16} weight="fill" className="text-violet-500" />
                    </div>
                </label>

                <label htmlFor="">
                    Link para o LinkedIn (opcional)
                    <input
                        className="px-3 h-12 w-full border border-solid border-gray-400 placeholder:text-gray-800 placeholder:opacity-25 rounded cursor-pointer"
                        type="text"
                        placeholder="https://linkedin.com/in/usuario"
                    />
                </label>
            </form> */}


            <Link href="/usuario/adventure">
                <ArrowLeft size={64} className="absolute left-36 bottom-16 p-4 text-blue-800 bg-gray-400/10 hover:bg-violet-600 hover:text-white transition-colors rounded-full cursor-pointer" />
            </Link>
            <ArrowRight size={64} className="absolute right-36 bottom-16 p-4 text-blue-800 bg-gray-400/10 hover:bg-violet-600 hover:text-white transition-colors rounded-full cursor-pointer" />
        </div>
    )
}