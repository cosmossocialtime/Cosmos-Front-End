import { Input } from '../../../../../components/Input'
import { BackButton } from '../../../../../components/adventure/BackButton'
import { NextButton } from '../../../../../components/adventure/NextButton'

export default function AboutYou1() {
  return (
    <div>
      <div className="flex flex-col gap-12 py-14 px-32">
        <Input.Root ariaLabel="Quais as suas principais experiências profissionais até agora?">
          <Input.TextArea className="h-32" placeholder="Descreva aqui" />
        </Input.Root>

        <Input.Root ariaLabel="Quais competências você considera que são os seus pontos fortes?">
          <Input.TextArea className="h-32" placeholder="Descreva aqui" />
        </Input.Root>
      </div>

      <BackButton href="./" />
      <NextButton href="aboutYou" />
    </div>
  )
}
