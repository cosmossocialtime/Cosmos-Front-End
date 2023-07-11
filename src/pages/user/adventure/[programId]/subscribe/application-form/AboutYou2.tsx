import { Input } from '../../../../../components/Input'
import { BackButton } from '../../../../../components/adventure/BackButton'
import { NextButton } from '../../../../../components/adventure/NextButton'

export default function AboutYou2() {
  return (
    <div>
      <div className="flex flex-col gap-12 py-14 px-32">
        <Input.Root ariaLabel="O que motiva você a querer participar desse programa?">
          <Input.TextArea className="h-32" placeholder="Descreva aqui" />
        </Input.Root>

        <Input.Root ariaLabel="Você já mentorou alguma pessoa ou organização antes? Se sim, como foi esta experiência? (Opcional) ">
          <Input.TextArea className="h-32" placeholder="Descreva aqui" />
        </Input.Root>
      </div>

      <BackButton href="./" />
      <NextButton href="aboutYou" />
    </div>
  )
}
