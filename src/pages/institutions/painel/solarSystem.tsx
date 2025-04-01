import Image from 'next/image'
import DynamicHeader from '../../../components/main-painel/DynamicHeader'
import { useState } from 'react'
import { MarketingForm } from '../../../components/instituition/painel/solarSystem/MarketingForm'
import { FundraisingForm } from '../../../components/instituition/painel/solarSystem/FundraisingForm'

export default function SolarSystem() {
  const [isOpenMarketing, setIsOpenMarketing] = useState(false) // Referente ao Marketing form
  const [isOpenFundraising, setIsOpenFundraising] = useState(false) // Referente ao captação de recursos form

  const closeModalMarketing = () => {
    setIsOpenMarketing(false)
  }
  const closeModalFundraising = () => {
    setIsOpenFundraising(false)
  }

  return (
    <section className="min-h-screen bg-gray-400/20">
      {/* FORMS */}
      {isOpenMarketing && <MarketingForm closeModal={closeModalMarketing} />}
      {isOpenFundraising && (
        <FundraisingForm closeModal={closeModalFundraising} />
      )}

      <DynamicHeader />
      <div className="p-6">
        <h2 className="text-gray-500">Sistema Solar</h2>
        <p className="my-3 max-w-[640px] text-gray-500">
          O sistema estelar é um resumo de toda a organização Nome da
          Instituição. <b>Preencha</b> as informações solicitadas em cada área
          abaixo. Preenchidos: 0 de 11.
        </p>

        <div
          className="relative h-[500px] w-full rounded-3xl border border-violet-400 bg-black"
          style={{
            backgroundImage: "url('/images/Planetas/bgLogin.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-10 p-10">
            <div className="grid h-full w-[600px] grid-cols-3 grid-rows-3">
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/financas.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">
                  Capitação de <br /> recursos
                </h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/financas.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">Finanças</h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/marketing.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">Marketing</h4>
                <button
                  onClick={() => setIsOpenMarketing(true)}
                  className="text-[12px] text-blue-500"
                >
                  Preencher
                </button>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/projetos.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">
                  Gestão de <br />
                  projetos
                </h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/sustentabilidade.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">Sustentabilidade</h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
            </div>
            <div>
              <div className="text-center">
                <h2 className="text-white">Nome da organização</h2>
                <button
                  onClick={() => setIsOpenFundraising(true)}
                  className="text-[12px] text-blue-500"
                >
                  Preencher
                </button>
              </div>
            </div>
            <div className="grid h-full w-[600px] grid-cols-3 grid-rows-3">
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/pessoas.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">
                  Recursos <br />
                  Humanos
                </h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/juridico.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">Jurídicos</h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/impacto.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">
                  Avaliação de <br /> Impacto
                </h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/estrategia.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">Estratégia</h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
              <div className="flex items-center justify-center"></div>
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  className={`grayscale filter`}
                  width={40}
                  height={40}
                  src={'/images/satelites/lideranca.png'}
                  alt=""
                />
                <h4 className="text-sm text-white">Liderança</h4>
                <button className="text-[12px] text-blue-500">Preencher</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
