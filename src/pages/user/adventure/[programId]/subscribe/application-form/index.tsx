import { Header } from '../../../../../components/adventure/Header'
import { BackButton } from '../../../../../components/adventure/BackButton'
import { NextButton } from '../../../../../components/adventure/NextButton'
import { PersonalData } from './PersonalData'
import { ElementType, useEffect, useState } from 'react'
import { api } from '../../../../../services/api'
import AboutYou from './AboutYou2'
import { programProps } from '../../../../../types/program'

type stepProps = {
  id: number
  title?: string
  step?: string
  Element: ElementType
}

export default function ApplicationForm() {
  const [program, setProgram] = useState<programProps>()

  // useEffect(() => {
  //   api
  //     .get('/dashboard')
  //     .then((response) => {
  //       setProgram(response.data.programs[0])
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }, [])

  const formSteps: Array<stepProps> = [
    {
      id: 0,
      title: program?.name,
      Element: PersonalData,
    },
    {
      id: 1,
      title: program?.name,
      step: '1/5',
      Element: PersonalData,
    },
    {
      id: 2,
      title: 'Conte um pouco mais sobre você',
      step: '2/5',
      Element: AboutYou,
    },
  ]
  const [selectedStep, setselectedStep] = useState<stepProps>(formSteps[0])

  function nextStep() {
    setselectedStep((prevStep) =>
      formSteps[prevStep.id + 1] ? formSteps[prevStep.id + 1] : prevStep,
    )
  }
  function backStep() {
    setselectedStep((prevStep) =>
      formSteps[prevStep.id - 1] ? formSteps[prevStep.id - 1] : prevStep,
    )
  }

  // if (!program) {
  //   return (
  //     <div className="flex h-screen w-screen items-center justify-center bg-zinc-900 text-zinc-50">
  //       <h1 className="text-lg">Carregando...</h1>
  //     </div>
  //   )
  // }

  return (
    <div>
      <Header title={'program.name'}>
        <span className="mr-24 flex-1 text-end text-violet-600">
          {selectedStep.step}
        </span>
      </Header>
      {<selectedStep.Element />}
      <BackButton href="" onClick={backStep} />
      <NextButton href="" onClick={nextStep} />
    </div>
  )
}
