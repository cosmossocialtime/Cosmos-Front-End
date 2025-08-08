import { Calendar, CaretRight, Check, Clock } from 'phosphor-react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { ProgramProps } from '../../../types/program'
import { UserProps } from '../../../types/user'
import { SocialOrganizationProps } from '../../../types/socialOrganization'
import { useOnboardingInstitution } from '../../../context/OnboardingInstituionProvider'
import StarFour from '../../../assets/star-four.svg'
import Image from 'next/image'
import { MentorshipProps } from '../../../types/mentorship'

interface AdventureAreaInstitutionProps {
  programs: ProgramProps[]
  user: UserProps
  socialOrganization: SocialOrganizationProps
  mentorships: MentorshipProps[]
}

export default function AdventureAreaInstitution({
  programs,
  user,
  socialOrganization,
  mentorships,
}: AdventureAreaInstitutionProps) {
  const {
    changeUser,
    changeProgram,
    changeSocialOrganization,
    setNewMentorshipApplicant,
    setNewFocalPoint,
  } = useOnboardingInstitution()
  const programsSubscribed = programs.filter((p) => p.completed)
  const programsUnsubscribed = programs.filter((p) => !p.completed)

  function selectProgram(program: ProgramProps) {
    if (!program.completed) {
      setNewFocalPoint()
      setNewMentorshipApplicant()
    }
    changeUser(user)
    changeProgram(program)
    changeSocialOrganization(socialOrganization)
  }

  return (
    <div className={`overflow-y-auto pb-5 pr-4`}>
      {programs.length === 0 && mentorships.length === 0 ? (
        <div className="mt-20 flex flex-col items-center space-y-4">
          <div>
            {/* Ícone estrela */}
            <Image
              src={StarFour}
              alt="Estrela de quatro pontas"
              className="h-20"
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-500">
            Boas-vindas à Cosmos
          </h1>
          <p className="max-w-xl text-center text-gray-500">
            Aqui irão aparecer as missões em que sua organização poderá se
            inscrever.
          </p>
          <p className="max-w-xl text-center text-gray-500">
            Por enquanto não há aventuras em aberto, mas você pode ir acumulando
            conquistas ao preencher as informações da organização! Vamos lá?
          </p>
        </div>
      ) : (
        <>
          {programsSubscribed.length > 0 && (
            <h2 className="text-lg text-gray-600">Inscrições</h2>
          )}
          {programsSubscribed.length > 0 &&
            programsSubscribed.map((program, key) => (
              <>
                <Link
                  key={'link_' + key}
                  href={`/institutions/socialOrganization/${
                    socialOrganization.id || 0
                  }/adventure/${program.id}/subscribe`}
                  onClick={() => selectProgram(program)}
                >
                  <div
                    key={'div_' + key}
                    className="mb-4 mt-4 flex items-center justify-between rounded-lg bg-white p-4 shadow"
                  >
                    <div>
                      <h3 className="font-semibold text-blue-400">
                        {program.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {program.description.length > 100
                          ? program.description.substring(0, 100) + '...'
                          : program.description}
                      </p>
                    </div>

                    <div className="mr-4 flex min-w-[15vw] items-center gap-1 rounded-full bg-gray-200 px-3 py-2">
                      <Check size={24} className="text-[#46CE9D]" />
                      <span className="text-xs text-gray-500">
                        Você já se inscreveu nessa aventura!
                      </span>
                    </div>
                    <CaretRight
                      size={24}
                      className="cursor-pointer text-blue-400"
                    />
                  </div>
                </Link>
              </>
            ))}
          {programsUnsubscribed.length > 0 && (
            <h2 className="mb-4 mt-12 text-lg text-gray-600">
              Inscreva-se em uma nova aventura
            </h2>
          )}
          {programsUnsubscribed.length > 0 &&
            programsUnsubscribed.map((program, key) => (
              <>
                <Link
                  key={'link_unsub_' + key}
                  href={`/institutions/socialOrganization/${
                    socialOrganization.id || 0
                  }/adventure/${program.id}/subscribe`}
                  onClick={() => selectProgram(program)}
                >
                  <div
                    key={'div_unsub_' + key}
                    className="mb-4 mt-4 flex items-center justify-between rounded-lg bg-white p-4 shadow"
                  >
                    <div>
                      <h3 className="font-semibold text-blue-400">
                        {program.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {program.description.length > 100
                          ? program.description.substring(0, 100) + '...'
                          : program.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock size={32} />
                        <span className="text-xs">
                          {program.weeklyHours} horas <br />
                          semanais
                        </span>
                      </div>

                      <div className="flex min-w-[15vw] items-center gap-2">
                        <Calendar size={32} />
                        <span className="text-xs">
                          de {dayjs(program.startDate).format('DD/MM/YYYY')}{' '}
                          <br />
                          até {dayjs(program.endDate).format('DD/MM/YYYY')}
                        </span>
                      </div>
                    </div>
                    <CaretRight
                      size={24}
                      className="cursor-pointer text-blue-400"
                    />
                  </div>
                </Link>
              </>
            ))}
        </>
      )}
    </div>
  )
}
