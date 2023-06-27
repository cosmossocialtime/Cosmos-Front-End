import dayjs from 'dayjs'
import { Calendar, Check } from 'phosphor-react'
import SideBar from '../sideBar'
import { stagesData, stage } from '../../../data/StagesData'

export default function painelDaMissão() {
  const stagesLength = stagesData.length
  const stageWidth = 100 / stagesLength
  const barGrayWidth = 100 - stageWidth

  const marginBar = stageWidth / 2

  const completedStages = stagesData.filter((stage) => stage.completed === true)
  const completedStagesLength = completedStages.length

  const barCompletedWidth = completedStagesLength * stageWidth

  const currentStage = stagesData.find((stage) => stage.completed === false)

  function setMessage(stage: stage) {
    const now = dayjs()
    const { completed, availabilityDate } = stage

    if (completed) {
      return 'Ver instruções'
    }
    if (stage === currentStage && availabilityDate.isBefore(now)) {
      return 'Etapa atual'
    }
    if (availabilityDate == null) {
      return 'Data de disponibilidade não definida'
    }
    if (availabilityDate.isBefore(now)) {
      return 'Já disponível'
    }
    if (availabilityDate.isAfter(now)) {
      return `Disponível em ${stage.availabilityDate.format('DD/MM/YYYY')}`
    }

    throw new Error('Não foi possível definir uma mensagem para esta etapa.')
  }

  return (
    <div className="max-w-screen flex bg-gray-100">
      <SideBar />

      <div className="scroll max-h-screen flex-1 overflow-y-auto text-gray-600">
        <header className="w-full py-5 px-20 shadow-lg shadow-[#2B124A]/5">
          <h1 className="text-4xl font-semibold">Nome do Programa</h1>
        </header>

        <div className="flex flex-col items-center px-20">
          <div className="my-2 flex items-center gap-2 self-start">
            <Calendar size={40} weight="light" />
            <div>
              <span className="block">De dd/mm/aaaa</span>
              <span className="block">Até dd/mm/aaaa</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-8 overflow-auto rounded-md p-5 pr-[20%] text-lg shadow-[0_0_24px] shadow-black/10">
            <p>
              No Programa Mentoria 1, você atuará como mentor(a) voluntário(a)
              de uma organização social que atua na causa da educação ou da
              saúde.
            </p>
            <p>
              Você trabalhará em equipe com outros voluntários da Empresa X para
              apoiar o desenvolvimento da instituição e contribuir para aumentar
              o seu impacto social.
            </p>
            <p>
              Serão realizados encontros semanais de mentoria, em que a equipe
              de mentores aconselhará os
            </p>
          </div>

          <div className="mt-12">
            <div
              className="grid items-center justify-center"
              style={{
                gridTemplateColumns: `repeat(${stagesLength}, minmax(0, 1fr))`,
              }}
            >
              {stagesData.map((stage, index) => (
                <span key={index} className="text-center">
                  {stage.title}
                </span>
              ))}
            </div>

            <div
              className="relative mt-2 grid justify-center"
              style={{
                gridTemplateColumns: `repeat(${stagesLength}, minmax(0, 1fr))`,
              }}
            >
              <div
                className="absolute top-1/2 box-border h-[2px] -translate-x-1 bg-[#D1D5DB]"
                style={{
                  width: `${barGrayWidth}%`,
                  marginLeft: `${marginBar}%`,
                }}
              />
              <div
                className="absolute top-1/2 h-[2px] w-64 -translate-x-1 bg-violet-400"
                style={{
                  width: `${barCompletedWidth}%`,
                  marginLeft: `${marginBar}%`,
                }}
              />

              {stagesData.map((stage) =>
                stage.completed ? (
                  <div
                    className={`z-10 flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-white text-white`}
                  >
                    <Check
                      size={32}
                      className="rounded-full bg-violet-400 p-1"
                    />
                  </div>
                ) : (
                  <div
                    className={`${
                      currentStage === stage
                        ? 'border-violet-400'
                        : 'border-[#9CA3AF]'
                    } z-10 flex h-8 w-8 items-center justify-center justify-self-center rounded-full border-2 border-solid bg-white text-white`}
                  >
                    <div
                      className={`${
                        currentStage === stage
                          ? 'bg-violet-400'
                          : 'bg-[#D1D5DB]'
                      } h-[10px] w-[10px] rounded-full `}
                    />
                  </div>
                ),
              )}
            </div>

            <div
              className="mt-2 grid justify-center"
              style={{
                gridTemplateColumns: `repeat(${stagesLength}, minmax(0, 1fr))`,
              }}
            >
              {stagesData.map((stage, index) => (
                <span key={index} className="text-center text-sm text-gray-400">
                  {setMessage(stage)}
                </span>
              ))}
            </div>
          </div>

          <button className="my-10 mx-auto rounded-lg bg-violet-500 px-20 py-4 text-lg font-semibold text-white transition-colors hover:bg-violet-600">
            Instruções da etapa atual
          </button>
        </div>
      </div>
    </div>
  )
}
