import Link from 'next/link'
import dayjs from 'dayjs'
import { ArrowLeft, Check } from 'phosphor-react'
import Image from 'next/image'
import Logo from '../../../../../../../../public/images/logotipoCosmos.svg'
import Router from 'next/router'
import { useOnboardingInstitution } from '../../../../../../../context/OnboardingInstituionProvider'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'
import { Button } from '../../../../../../../components/Button'
import { useHeader } from '../../../../../../../context/HeaderContext'
import { useEffect } from 'react'

export default function AdventureInstitution() {
  const { program, socialOrganization, user } = useOnboardingInstitution()
  const { setShowMenu, setShowOrganization } = useHeader()

  useEffect(() => {
    setShowMenu(true)
    setShowOrganization(true)
  }, [])

  return (
    <>
      {program && socialOrganization && user && (
        <section className="min-h-screen w-full bg-white">
          <DynamicHeader />
          <div className="mt-8 pl-10">
            <ArrowLeft
              className="cursor-pointer text-gray-800"
              onClick={() =>
                Router.push(
                  `/institutions/socialOrganization/${
                    socialOrganization.id || 0
                  }/home`
                )
              }
              size={24}
            />
          </div>
          <div className="mx-auto max-w-4xl px-4 ">
            <div className="flex flex-wrap items-center">
              <h1 className="pr-6 text-2xl font-semibold text-gray-900">
                {program.name}
              </h1>
              <div className="relative h-[60px] w-[120px]">
                <Image
                  src={Logo}
                  alt="Logo da empresa"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/Calendar.png"
                  alt="Calendário"
                  width={16}
                  height={16}
                />
                <span>
                  De {dayjs(program.startDate).format('DD/MM/YYYY')} até{' '}
                  {dayjs(program.endDate).format('DD/MM/YYYY')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/Clock.png"
                  alt="Relógio"
                  width={16}
                  height={16}
                />
                <span>{program.weeklyHours} horas de dedicação por semana</span>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-gray-700">
              {program.description.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div className="mt-12">
              {program.completed ? (
                <div className="flex items-center gap-4 rounded border border-solid border-gray-300 p-4">
                  <Check
                    size={56}
                    className="rounded-full bg-green-300 p-4 text-gray-100"
                  />
                  <div>
                    <strong className="mb-2 font-semibold text-gray-700">
                      Você ja se inscreveu nesta aventura!
                    </strong>
                    <p className="text-sm text-gray-500">
                      O processo de seleção será feito pela empresa{' '}
                      {program.companyName}.
                      <br /> O resultado será divulgado por e-mail até o dia{' '}
                      {dayjs(program.updatedAt).format('DD/MM/YYYY')}.
                    </p>
                  </div>
                </div>
              ) : (
                <Link
                  href={`/institutions/socialOrganization/${
                    socialOrganization.id || 0
                  }/adventure/${program.id}/subscribe/terms`}
                >
                  <Button.Primary className="px-20 py-2">
                    Embarcar nesta jornada
                  </Button.Primary>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
