import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import Close from "../../../../public/images/tripulacao/Close.svg";
import BackgroundModal from "../../../../public/images/tripulacao/backgroundModal.png";
import Image from "next/image";
import ProfilePhoto from "../../../../public/images/tripulacao/ProfileIcon.jpg";
import Astro from "../../../../public/images/tripulacao/Astro.png";
import Retangulo from "../../../../public/images/tripulacao/Retangulo.svg";

type DatasProfile = {
  title: string;
  name: string;
  charge: string;
  sector: string;
  description: string;
};

export function Modal(ModalProps: DatasProfile) {
  return (
    <div className="rounded-2xl overflow-hidden">
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
          <button>
            <Image src={Close} alt="Button Close" className="rounded-md" />
          </button>
        </Dialog.Close>
      </div>
      <div className="relative flex gap-24 px-2 justify-center items-center">
        <div className="flex gap-12 relative">
          <div className="rounded-full overflow-hidden w-36 h-36 relative -top-8 border-4 shadow-black/20 shadow-lg border-gray-50 drop-shadow-sm">
            <Image
              src={ProfilePhoto}
              alt="Profile photo"
              quality={100}
              className="w-full"
            />
          </div>
          <div className="flex z-10 absolute bottom-2 left-0 items-center">
            <div>
              <Image src={Astro} alt="Asto" quality={100} />
            </div>

            <div className="relative">
              <Image src={Retangulo} alt="Retangulo" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-black/20 shadow-lg border-gray-50 drop-shadow-sm text-xs">
                {ModalProps.charge}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg text-indigo-500 font-medium">
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
        <div className="flex gap-2 h-8 items-center">
          <span className="text-xs font-semibold text-center px-6 py-2 bg-blue-300 rounded-lg">
            Marketing
          </span>
          <span className="text-xs font-semibold text-center px-6 py-2 bg-cian-300 rounded-lg">
            Gestão de projetos
          </span>
          <span className="text-xs font-semibold text-center px-6 py-2 bg-violet-700 rounded-lg">
            Analise de dados
          </span>
        </div>
      </div>
      <Tabs.Root
        defaultValue="tab1"
        className="flex flex-col items-center justify-center gap-2"
      >
        <Tabs.List className="flex justify-between lg:gap-28 gap-2 text-indigo-200 font-medium bg-gray-200 px-2 py-2 rounded-md">
          <Tabs.Trigger
            className="data-[state=active]:bg-gray-50 data-[state=active]:font-semibold px-5 py-2 rounded"
            value="tab1"
          >
            Experiências
          </Tabs.Trigger>
          <Tabs.Trigger
            className="data-[state=active]:bg-gray-50  data-[state=active]:font-semibold px-5 py-2 rounded"
            value="tab2"
          >
            Competências
          </Tabs.Trigger>
          <Tabs.Trigger
            className="data-[state=active]:bg-gray-50 data-[state=active]:font-semibold px-5 py-2 rounded"
            value="tab3"
          >
            Motivação
          </Tabs.Trigger>
          <Tabs.Trigger
            className="data-[state=active]:bg-gray-50 data-[state=active]:font-semibold px-5 py-2 rounded"
            value="tab4"
          >
            Voluntariado
          </Tabs.Trigger>
        </Tabs.List>
        <div className="flex items-center justify-center text-black border border-gray-300 rounded lg:max-w-4xl lg:w-full w-3/4 px-2 mb-10 ">
          <div className="w-full px-3 py-3">
            <Tabs.Content value="tab1">
              <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut vero nesciunt a libero dicta quo omnis debitis. Modi qui facilis sapiente itaque ex nam, accusamus officia quod. Sed, numquam similique?</span>
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
  );
}
