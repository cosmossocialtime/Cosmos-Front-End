import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import Close from '../../../../public/images/tripulacao/Close.svg'
import BackgroundModal from '../../../../public/images/tripulacao/backgroundModal.png'
import Image from 'next/image'
import ProfilePhoto from '../../../../public/images/tripulacao/ProfileIcon.jpg'
import Astro from '../../../../public/images/tripulacao/Astro.png'
import Retangulo from '../../../../public/images/tripulacao/Retangulo.svg'

type DatasProfile = {
  title: string
  name: string
  charge: string
  sector: string
  description: string
}

export default function Modal(ModalProps: DatasProfile) {
  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="flex">
        <div className="w-full">
          <Image
            src={BackgroundModal}
            alt="background modal"
            quality={100}
            className="cover w-full "
          />
        </div>
        <Dialog.Close className="absolute top-10 right-8">
          <Image src={Close} alt="Button Close" className="rounded-md" />
        </Dialog.Close>
      </div>
      <div className="relative flex items-center justify-center gap-24 px-2">
        <div className="relative flex gap-12">
          <div className="relative -top-8 h-36 w-36 overflow-hidden rounded-full border-4 border-gray-50 shadow-lg shadow-black/20 drop-shadow-sm">
            <Image
              src={ProfilePhoto}
              alt="Profile photo"
              quality={100}
              className="w-full"
            />
          </div>
          <div className="absolute bottom-2 left-0 z-10 flex items-center">
            <div>
              <Image src={Astro} alt="Asto" quality={100} />
            </div>

            <div className="relative">
              <Image src={Retangulo} alt="Retangulo" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gray-50 text-xs shadow-lg shadow-black/20 drop-shadow-sm">
                {ModalProps.charge}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg font-medium text-indigo-500">
              {ModalProps.name}
            </span>
            <span className="text-sm text-indigo-500">
              Cargo: {ModalProps.charge}
            </span>
            <span className="text-sm text-indigo-500">
              Setor: {ModalProps.sector}
            </span>
          </div>
        </div>
        <div className="flex h-8 items-center gap-2">
          <span className="rounded-lg bg-blue-300 px-6 py-2 text-center text-xs font-semibold">
            Marketing
          </span>
          <span className="rounded-lg bg-cian-300 px-6 py-2 text-center text-xs font-semibold">
            Gestão de projetos
          </span>
          <span className="rounded-lg bg-violet-700 px-6 py-2 text-center text-xs font-semibold">
            Analise de dados
          </span>
        </div>
      </div>
      <Tabs.Root
        defaultValue="tab1"
        className="flex flex-col items-center justify-center gap-2"
      >
        <Tabs.List className="flex justify-between gap-2 rounded-md bg-gray-200 px-2 py-2 font-medium text-indigo-200 lg:gap-28">
          <Tabs.Trigger
            className="rounded px-5 py-2 data-[state=active]:bg-gray-50 data-[state=active]:font-semibold"
            value="tab1"
          >
            Experiências
          </Tabs.Trigger>
          <Tabs.Trigger
            className="rounded  px-5 py-2 data-[state=active]:bg-gray-50 data-[state=active]:font-semibold"
            value="tab2"
          >
            Competências
          </Tabs.Trigger>
          <Tabs.Trigger
            className="rounded px-5 py-2 data-[state=active]:bg-gray-50 data-[state=active]:font-semibold"
            value="tab3"
          >
            Motivação
          </Tabs.Trigger>
          <Tabs.Trigger
            className="rounded px-5 py-2 data-[state=active]:bg-gray-50 data-[state=active]:font-semibold"
            value="tab4"
          >
            Voluntariado
          </Tabs.Trigger>
        </Tabs.List>
        <div className="mb-10 flex w-3/4 items-center justify-center rounded border border-gray-300 px-2 text-black lg:w-full lg:max-w-4xl ">
          <div className="w-full px-3 py-3">
            <Tabs.Content value="tab1">
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                vero nesciunt a libero dicta quo omnis debitis. Modi qui facilis
                sapiente itaque ex nam, accusamus officia quod. Sed, numquam
                similique?
              </span>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <span>Competências</span>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <span>Motivação</span>
            </Tabs.Content>
            <Tabs.Content value="tab4">
              <span>Voluntariado</span>
            </Tabs.Content>
          </div>
        </div>
      </Tabs.Root>
    </div>
  )
}
