import { Calendar, Check, Clock } from 'phosphor-react'
import FormatText from '../../../../../utils/FormatText'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Header } from '../../../../../components/adventure/Header'
import { api } from '../../../../../services/api'
import { useRouter } from 'next/router'
import { Loading } from '../../../../../components/Loading'
import dayjs from 'dayjs'
import { programProps } from '../../../../../types/program'
import { Button } from '../../../../../components/Button'

export default function Adventure() {
  const [program, setProgram] = useState<programProps | null>(null)
  const router = useRouter()
  const { programId } = router.query

  useEffect(() => {
    if (programId) {
      api
        .get(`/program/${programId}`)
        .then((response) => {
          setProgram(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [programId])

  if (!program) {
    return <Loading />
  }

  return (
    <div>
      <Header title={program.name}>
        <div className="flex items-center gap-2">
          <Calendar size={44} weight="thin" />
          <div className="flex flex-col">
            <span>de {dayjs(program.startDate).format('DD/MM/YYYY')}</span>
            <span>de {dayjs(program.endDate).format('DD/MM/YYYY')}</span>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Clock size={44} weight="thin" />
          <span className="w-48">
            {program.weeklyHours} horas de dedicação por semana
          </span>
        </div>
      </Header>

      <div className="my-16 ml-40 mr-16 flex max-h-[22rem] flex-col gap-4 overflow-y-auto pr-24 text-justify text-lg text-gray-800">
        <FormatText text={program.description} />
      </div>

      <div className="absolute bottom-14 mx-auto flex w-full justify-center">
        {program.applied ? (
          <div className="flex items-center gap-4 rounded border border-solid border-gray-300 p-4">
            <Check
              size={56}
              className="rounded-full bg-green-300 p-4 text-gray-100"
            />
            <div>
              <strong className="mb-2 font-semibold text-gray-600">
                Você ja se inscreveu nesta aventura!
              </strong>
              <p className="text-gray-500">
                O processo de seleção será feito pela empresa{' '}
                {program.companyName}.
                <br /> O resultado será divulgado por e-mail até o dia dd/mm/aa.
              </p>
            </div>
          </div>
        ) : (
          <Link
            href={{
              pathname: 'subscribe/terms-of-use',
              query: { programId },
            }}
          >
            <Button.Primary className="px-20 py-4">
              Embarcar nessa jornada
            </Button.Primary>
          </Link>
        )}
      </div>

      <Link href="/user/painel">
        <Button.ArrowLeft />
      </Link>
    </div>
  )
}
