import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'

export function FeedBack() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content className='fixed w-full h-full bg-gray-500/25'>
                <Dialog.Close>
                    <X size={24} />
                </Dialog.Close>
                <h1>Ajude a Cosmos a alcançar novos horizontes</h1>
                <span>Conte-nos a sua sugestão para a plataforma</span>
                <textarea>

                </textarea>
                <button>Enviar</button>
            </Dialog.Content>
        </Dialog.Portal>

    )
}