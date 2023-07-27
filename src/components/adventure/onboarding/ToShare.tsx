import { FacebookLogo, LinkedinLogo, WhatsappLogo } from 'phosphor-react'
import { Button } from '../../Button'

export function ToShare() {
  return (
    <div>
      <Button.Primary className="py-4 px-7">Compartilhar</Button.Primary>
      <div className="flex justify-center gap-3 rounded-full bg-white p-5">
        <FacebookLogo size={32} weight="fill" className="text-blue-400" />
        <LinkedinLogo size={32} weight="fill" className="text-blue-600" />
        <WhatsappLogo size={32} weight="fill" className="text-green-500" />
      </div>
    </div>
  )
}
