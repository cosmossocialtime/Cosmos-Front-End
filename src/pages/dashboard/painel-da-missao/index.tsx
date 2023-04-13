import dayjs from "dayjs";
import { Calendar, Check } from "phosphor-react";
import SideBar from "../sideBar";
import { stage, stagesData } from "./StagesData";

export default function painelDaMissão() {

    const stagesLength = stagesData.length;
    const stageWidth = 100 / stagesLength;
    const barGrayWidth = 100 - stageWidth;

    const marginBar = stageWidth / 2;

    const completedStages = stagesData.filter(stage => stage.completed === true);
    const completedStagesLength = completedStages.length;

    const barCompletedWidth = completedStagesLength * stageWidth;

    const currentStage = stagesData.find(stage => stage.completed === false)

    function setMessage(stage: stage) {
        const now = dayjs();
        const { completed, availabilityDate } = stage;

        switch (true) {
            case completed:
                return "Ver instruções";
            case stage === currentStage && availabilityDate.isBefore(now):
                return "Etapa atual";
            case availabilityDate == null:
                return "Data de disponibilidade não definida";
            case availabilityDate.isBefore(now):
                return "Já disponível";
            case availabilityDate.isAfter(now):
                return `Disponível em ${stage.availabilityDate.format("DD/MM/YYYY")}`;
            default:
                throw new Error("Não foi possível definir uma mensagem para esta etapa.")
        }

    }

    return (
        <div className="flex w-screen bg-gray-100">
            <SideBar />

            <div className="flex-1 text-gray-600 ">
                <header className="py-5 px-20 w-full shadow-lg shadow-[#2B124A]/5">
                    <h1 className="text-4xl font-semibold">
                        Nome do Programa
                    </h1>
                </header>

                <div className="px-20 flex flex-col items-center">
                    <div className="my-2 self-start flex gap-2 items-center">
                        <Calendar size={40} weight="light" />
                        <div>
                            <span className="block">De dd/mm/aaaa</span>
                            <span className="block">Até dd/mm/aaaa</span>
                        </div>
                    </div>

                    <div className="overflow-auto w-full p-5 pr-[20%] text-lg flex flex-col gap-8 rounded-md shadow-[0_0_24px] shadow-black/10">
                        <p>
                            No Programa Mentoria 1, você atuará como mentor(a) voluntário(a) de uma organização social que atua na causa da educação ou da saúde.
                        </p>
                        <p>
                            Você trabalhará em equipe com outros voluntários da Empresa X para apoiar o desenvolvimento da instituição e contribuir para aumentar o seu impacto social.
                        </p>
                        <p>
                            Serão realizados encontros semanais de mentoria, em que a equipe de mentores aconselhará os
                        </p>
                    </div>

                    <div className="mt-12">
                        <div
                            className="grid justify-center items-center"
                            style={{ gridTemplateColumns: `repeat(${stagesLength}, minmax(0, 1fr))` }}
                        >
                            {stagesData.map((stage, index) => (
                                <span key={index} className="text-center">{stage.title}</span>
                            ))}
                        </div>

                        <div
                            className="relative mt-2 grid justify-center"
                            style={{ gridTemplateColumns: `repeat(${stagesLength}, minmax(0, 1fr))` }}
                        >
                            <div
                                className="box-border absolute top-1/2 -translate-x-1 h-[2px] bg-[#D1D5DB]"
                                style={{ width: `${barGrayWidth}%`, marginLeft: `${marginBar}%` }}
                            />
                            <div
                                className="absolute top-1/2 -translate-x-1 h-[2px] w-64 bg-violet-400"
                                style={{ width: `${barCompletedWidth}%`, marginLeft: `${marginBar}%` }}
                            />

                            {stagesData.map((stage) => (
                                stage.completed ? (
                                    <div className={`z-10 justify-self-center w-8 h-8 bg-white text-white flex items-center justify-center rounded-full`}>
                                        <Check size={32} className="p-1 bg-violet-400 rounded-full" />
                                    </div>
                                ) : (
                                    <div className={`${currentStage === stage ? "border-violet-400" : "border-[#9CA3AF]"} z-10 justify-self-center w-8 h-8 bg-white text-white flex items-center justify-center rounded-full border-2 border-solid`}>
                                        <div className={`${currentStage === stage ? "bg-violet-400" : "bg-[#D1D5DB]"} w-[10px] h-[10px] rounded-full `} />
                                    </div>
                                )
                            ))}
                        </div>

                        <div
                            className="mt-2 grid justify-center"
                            style={{ gridTemplateColumns: `repeat(${stagesLength}, minmax(0, 1fr))` }}
                        >
                            {stagesData.map((stage, index) => (
                                <span key={index} className="text-gray-400 text-sm text-center">
                                    {setMessage(stage)}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button className="mt-10 mx-auto px-20 py-4 text-white text-lg font-semibold rounded-lg bg-violet-500 hover:bg-violet-600 transition-colors">
                        Instruções da etapa atual
                    </button>
                </div>
            </div>
        </div>
    )
}